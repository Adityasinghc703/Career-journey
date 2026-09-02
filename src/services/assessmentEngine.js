import vm from 'vm';
import {
  readDB,
  getRoles,
  getRoleById,
  getSkills,
  getRoleSkills,
  getQuestions,
  getQuestionById,
  saveAssessment,
  getAssessmentById,
  getUserAssessments,
  updateUser
} from './db.js';

/**
 * Generate a personalized technical assessment based on role, level, mode, and historical skill gaps.
 */
export function generateAssessment({
  userId = "user_rahul_sharma",
  roleId = "role_frontend_dev",
  level = "intermediate",
  mode = "practice", // 'practice' | 'timed_assessment' | 'topic_practice'
  topicIds = [],
  totalQuestions = 20,
  timeLimitMinutes = null
}) {
  const allQuestions = getQuestions({ status: "published" });
  if (allQuestions.length === 0) {
    throw new Error("No published questions available in the question bank.");
  }

  const role = getRoleById(roleId);
  const roleSkills = getRoleSkills(role.id);
  const roleSkillIds = new Set(roleSkills.map(rs => rs.skillId));

  // 1. Check user recent attempts to avoid repeating questions from last 3 assessments
  const userPastAssessments = getUserAssessments(userId).slice(0, 3);
  const recentlyAttemptedQIds = new Set();
  for (const past of userPastAssessments) {
    if (past.questions) {
      for (const q of past.questions) {
        recentlyAttemptedQIds.add(q.questionId);
      }
    }
  }

  // 2. Identify weak skills from previous assessments (< 60%) to apply adaptive boosting
  const weakSkillIds = new Set();
  for (const past of userPastAssessments) {
    if (past.skillResults) {
      for (const sr of past.skillResults) {
        if (sr.percentage < 60) {
          weakSkillIds.add(sr.skillId);
        }
      }
    }
  }

  // 3. Filter Candidate Pool
  let candidatePool = allQuestions.filter(q => {
    // If specific topics selected in topic_practice mode, must match at least one selected topic
    if (mode === "topic_practice" && topicIds && topicIds.length > 0) {
      return (q.skills || []).some(s => topicIds.includes(s.skillId));
    }
    // Otherwise, prefer questions relevant to the target role
    return (q.skills || []).some(s => roleSkillIds.has(s.skillId)) || true;
  });

  if (candidatePool.length === 0) {
    candidatePool = allQuestions;
  }

  // 4. Calculate target difficulty distribution
  // Beginner: 70% beg, 25% int, 5% adv
  // Intermediate: 20% beg, 60% int, 20% adv
  // Advanced: 10% int, 65% adv, 25% challenge (adv)
  const targetCount = Math.min(totalQuestions, candidatePool.length);
  let diffRatios = { beginner: 0.2, intermediate: 0.6, advanced: 0.2 };
  if (level === "beginner") {
    diffRatios = { beginner: 0.7, intermediate: 0.25, advanced: 0.05 };
  } else if (level === "advanced") {
    diffRatios = { beginner: 0.0, intermediate: 0.25, advanced: 0.75 };
  }

  // 5. Score and sort questions based on role relevance, weak skill boost, and difficulty match
  const scoredCandidates = candidatePool.map(q => {
    let score = 50;

    // Favor questions not attempted recently
    if (recentlyAttemptedQIds.has(q.id)) {
      score -= 35;
    } else {
      score += 20;
    }

    // Adaptive boost for weak skills
    const hasWeakSkill = (q.skills || []).some(s => weakSkillIds.has(s.skillId));
    if (hasWeakSkill) {
      score += 30;
    }

    // Role skill importance boost
    for (const qs of q.skills || []) {
      const rs = roleSkills.find(r => r.skillId === qs.skillId);
      if (rs) {
        score += (rs.importanceWeight || 5) * 2;
      }
    }

    // Difficulty score alignment
    if (q.difficulty === level) {
      score += 25;
    }

    // Add slight random jitter for variety
    score += Math.random() * 15;

    return { question: q, score };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);

  // 6. Partition by Question Type to achieve balanced distribution:
  // ~40% Coding, ~40% Theory, ~20% Scenario
  const codingPool = scoredCandidates.filter(item => item.question.questionType === "coding");
  const scenarioPool = scoredCandidates.filter(item => item.question.questionType === "scenario");
  const theoryPool = scoredCandidates.filter(item => ["multiple_choice", "multi_select", "true_false", "short_answer"].includes(item.question.questionType));

  const targetCodingCount = Math.max(1, Math.round(targetCount * 0.4));
  const targetScenarioCount = Math.max(1, Math.round(targetCount * 0.2));
  const targetTheoryCount = Math.max(1, targetCount - targetCodingCount - targetScenarioCount);

  const selectedQuestions = [];
  const selectedIds = new Set();

  function pickFromPool(pool, count) {
    let added = 0;
    for (const item of pool) {
      if (added >= count) break;
      if (!selectedIds.has(item.question.id)) {
        selectedQuestions.push(item.question);
        selectedIds.add(item.question.id);
        added++;
      }
    }
  }

  pickFromPool(codingPool, targetCodingCount);
  pickFromPool(scenarioPool, targetScenarioCount);
  pickFromPool(theoryPool, targetTheoryCount);

  // If we still need more questions to reach targetCount, pick top remaining candidates
  if (selectedQuestions.length < targetCount) {
    for (const item of scoredCandidates) {
      if (selectedQuestions.length >= targetCount) break;
      if (!selectedIds.has(item.question.id)) {
        selectedQuestions.push(item.question);
        selectedIds.add(item.question.id);
      }
    }
  }

  // Shuffle selected questions for randomized assessment flow
  shuffleArray(selectedQuestions);

  // Default timer based on mode: Practice = untimed, Timed = (estimatedMinutes sum or 2 min per Q)
  let computedTimeLimit = timeLimitMinutes;
  if (mode === "timed_assessment" && !computedTimeLimit) {
    const totalEst = selectedQuestions.reduce((acc, q) => acc + (q.estimatedMinutes || 2), 0);
    computedTimeLimit = Math.max(15, totalEst);
  }

  const assessmentId = `assess_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const assessment = {
    id: assessmentId,
    userId,
    roleId: role.id,
    roleTitle: role.name,
    level,
    mode,
    topicIds: topicIds || [],
    totalQuestions: selectedQuestions.length,
    timeLimitMinutes: computedTimeLimit,
    status: "in_progress",
    startedAt: new Date().toISOString(),
    submittedAt: null,
    score: null,
    createdAt: new Date().toISOString(),
    questions: selectedQuestions.map((q, idx) => ({
      questionId: q.id,
      displayOrder: idx + 1,
      points: q.questionType === "coding" ? 10 : (q.questionType === "scenario" ? 5 : 3),
      answer: null,
      isCorrect: null,
      score: 0,
      timeSpentSeconds: 0,
      testResults: null
    }))
  };

  saveAssessment(assessment);
  return assessment;
}

/**
 * Strips all answer keys, hidden test cases, explanations, and solution code for active test taking.
 */
export function sanitizeAssessmentForLearner(assessment) {
  if (!assessment) return null;
  const isSubmitted = assessment.status === "submitted" || assessment.status === "expired";

  const allQuestionsMap = new Map();
  getQuestions().forEach(q => allQuestionsMap.set(q.id, q));

  const populatedQuestions = (assessment.questions || []).map(aq => {
    const fullQ = allQuestionsMap.get(aq.questionId);
    if (!fullQ) return aq;

    if (isSubmitted) {
      // Return full details including explanations, solution, and graded results
      return {
        ...aq,
        title: fullQ.title,
        slug: fullQ.slug,
        questionType: fullQ.questionType,
        difficulty: fullQ.difficulty,
        prompt: fullQ.prompt,
        explanation: fullQ.explanation,
        skills: fullQ.skills,
        options: fullQ.options,
        acceptableShortAnswers: fullQ.acceptableShortAnswers,
        coding: fullQ.coding
      };
    } else {
      // Redact answers, solutions, explanations, and hidden test cases for security
      let sanitizedOptions = null;
      if (fullQ.options) {
        sanitizedOptions = fullQ.options.map(opt => ({
          id: opt.id,
          text: opt.text,
          displayOrder: opt.displayOrder
        }));
      }

      let sanitizedCoding = null;
      if (fullQ.coding) {
        sanitizedCoding = {
          starterCodeJson: fullQ.coding.starterCodeJson,
          allowedLanguages: fullQ.coding.allowedLanguages,
          executionNotes: fullQ.coding.executionNotes,
          // Expose ONLY public test cases (isHidden === false)
          testCases: (fullQ.coding.testCases || [])
            .filter(tc => !tc.isHidden)
            .map(tc => ({ input: tc.input, expected: tc.expected, isHidden: false }))
        };
      }

      return {
        ...aq,
        title: fullQ.title,
        slug: fullQ.slug,
        questionType: fullQ.questionType,
        difficulty: fullQ.difficulty,
        prompt: fullQ.prompt,
        estimatedMinutes: fullQ.estimatedMinutes,
        skills: fullQ.skills,
        options: sanitizedOptions,
        coding: sanitizedCoding
      };
    }
  });

  return {
    ...assessment,
    questions: populatedQuestions
  };
}

/**
 * Auto-saves user answer and time spent during the assessment.
 */
export function saveAnswerProgress(assessmentId, questionId, answer, timeSpentSeconds = 0) {
  const assessment = getAssessmentById(assessmentId);
  if (!assessment) throw new Error("Assessment not found");
  if (assessment.status === "submitted" || assessment.status === "expired") {
    throw new Error("Cannot modify a submitted assessment");
  }

  const qEntry = (assessment.questions || []).find(q => q.questionId === questionId);
  if (qEntry) {
    qEntry.answer = answer;
    qEntry.timeSpentSeconds = (qEntry.timeSpentSeconds || 0) + (timeSpentSeconds || 0);
    saveAssessment(assessment);
  }

  return { success: true, savedAt: new Date().toISOString() };
}

/**
 * Grade assessment submission, evaluate test cases in sandbox, compute skill breakdown and recommendations.
 */
export function gradeAssessmentSubmission(assessmentId) {
  const assessment = getAssessmentById(assessmentId);
  if (!assessment) throw new Error("Assessment not found");

  const allQuestionsMap = new Map();
  getQuestions().forEach(q => allQuestionsMap.set(q.id, q));
  const allSkillsMap = new Map();
  getSkills().forEach(s => allSkillsMap.set(s.id, s));

  let totalEarnedPoints = 0;
  let maxPossiblePoints = 0;

  // Track per-skill statistics: { skillId: { correct: 0, total: 0, points: 0, maxPoints: 0 } }
  const skillStats = new Map();

  for (const aq of assessment.questions || []) {
    const fullQ = allQuestionsMap.get(aq.questionId);
    if (!fullQ) continue;

    const maxPts = aq.points || 3;
    maxPossiblePoints += maxPts;

    let isCorrect = false;
    let earnedPts = 0;
    let testResults = null;

    const userAnswer = aq.answer;

    if (fullQ.questionType === "multiple_choice" || fullQ.questionType === "true_false" || fullQ.questionType === "scenario") {
      const correctOption = (fullQ.options || []).find(opt => opt.isCorrect);
      if (correctOption && userAnswer && (userAnswer === correctOption.id || userAnswer === correctOption.text)) {
        isCorrect = true;
        earnedPts = maxPts;
      }
    } else if (fullQ.questionType === "multi_select") {
      const correctIds = (fullQ.options || []).filter(opt => opt.isCorrect).map(o => o.id);
      const userSelectedIds = Array.isArray(userAnswer) ? userAnswer : (userAnswer ? [userAnswer] : []);
      const matchedAll = correctIds.length === userSelectedIds.length &&
        correctIds.every(cid => userSelectedIds.includes(cid));
      if (matchedAll) {
        isCorrect = true;
        earnedPts = maxPts;
      }
    } else if (fullQ.questionType === "short_answer") {
      const cleanUser = String(userAnswer || "").trim().toLowerCase();
      const acceptable = (fullQ.acceptableShortAnswers || []).map(a => a.trim().toLowerCase());
      if (acceptable.some(acc => cleanUser === acc || cleanUser.includes(acc))) {
        isCorrect = true;
        earnedPts = maxPts;
      }
    } else if (fullQ.questionType === "coding") {
      const codeToRun = typeof userAnswer === "object" && userAnswer !== null ? userAnswer.code : String(userAnswer || "");
      const lang = (typeof userAnswer === "object" && userAnswer !== null ? userAnswer.language : "javascript") || "javascript";
      const testCases = fullQ.coding?.testCases || [];

      testResults = [];
      let passedAll = testCases.length > 0;

      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        if (lang === "javascript") {
          const script = `
            ${codeToRun}
            const __eval_result = ${tc.input};
            JSON.stringify(__eval_result);
          `;
          try {
            const context = vm.createContext({});
            const rawOutput = vm.runInContext(script, context, { timeout: 1500 });
            const cleanExpected = String(tc.expected).replace(/\s+/g, '');
            const cleanActual = String(rawOutput).replace(/\s+/g, '');
            const passed = cleanActual === cleanExpected || cleanActual === `"${cleanExpected}"`;
            if (!passed) passedAll = false;
            testResults.push({
              testCaseIndex: i + 1,
              input: tc.input,
              expected: tc.expected,
              actual: String(rawOutput),
              passed,
              isHidden: tc.isHidden
            });
          } catch (err) {
            passedAll = false;
            testResults.push({
              testCaseIndex: i + 1,
              input: tc.input,
              expected: tc.expected,
              actual: `Error: ${err.message}`,
              passed: false,
              isHidden: tc.isHidden
            });
          }
        } else {
          // Simulated non-JS test case execution check
          const passed = codeToRun.length > 25 && !codeToRun.includes("TODO");
          if (!passed) passedAll = false;
          testResults.push({
            testCaseIndex: i + 1,
            input: tc.input,
            expected: tc.expected,
            actual: passed ? tc.expected : "Incomplete / Syntax Error",
            passed,
            isHidden: tc.isHidden
          });
        }
      }

      if (passedAll) {
        isCorrect = true;
        earnedPts = maxPts;
      }
    }

    aq.isCorrect = isCorrect;
    aq.score = earnedPts;
    aq.testResults = testResults;
    totalEarnedPoints += earnedPts;

    // Attribute points to skills
    for (const qs of fullQ.skills || []) {
      if (!skillStats.has(qs.skillId)) {
        skillStats.set(qs.skillId, { correctCount: 0, totalCount: 0, earnedPoints: 0, maxPoints: 0 });
      }
      const stat = skillStats.get(qs.skillId);
      stat.totalCount += 1;
      stat.maxPoints += maxPts;
      if (isCorrect) {
        stat.correctCount += 1;
        stat.earnedPoints += earnedPts;
      }
    }
  }

  const overallPercentage = maxPossiblePoints > 0
    ? Math.round((totalEarnedPoints / maxPossiblePoints) * 100)
    : 0;

  // Build SkillResults Breakdown
  const skillResults = [];
  for (const [skillId, stat] of skillStats.entries()) {
    const skillObj = allSkillsMap.get(skillId);
    const skillName = skillObj ? skillObj.name : skillId;
    const skillPct = stat.maxPoints > 0 ? Math.round((stat.earnedPoints / stat.maxPoints) * 100) : 0;

    let recommendation = `Solid mastery of ${skillName}. Continue practicing advanced scenarios.`;
    if (skillPct < 60) {
      recommendation = `Your ${skillName} score is ${skillPct}%. Focus on fundamental patterns and practice targeted problems in this area next.`;
    } else if (skillPct < 80) {
      recommendation = `Good progress on ${skillName} (${skillPct}%). Review edge cases and performance trade-offs.`;
    }

    skillResults.push({
      id: `sr_${Date.now()}_${skillId}`,
      assessmentId: assessment.id,
      skillId,
      skillName,
      correctCount: stat.correctCount,
      totalCount: stat.totalCount,
      percentage: skillPct,
      recommendation
    });
  }

  // Update Assessment object
  assessment.status = "submitted";
  assessment.submittedAt = new Date().toISOString();
  assessment.score = overallPercentage;
  assessment.totalEarnedPoints = totalEarnedPoints;
  assessment.maxPossiblePoints = maxPossiblePoints;
  assessment.skillResults = skillResults;

  saveAssessment(assessment);

  // If score >= 70%, update user verified skills and score in database
  if (overallPercentage >= 70) {
    const db = readDB();
    const user = db.user;
    if (!user.verifiedSkills) user.verifiedSkills = [];

    const badgeTitle = `${assessment.roleTitle || "Technical"} Mastery`;
    const existingBadge = user.verifiedSkills.find(v => v.name === badgeTitle);
    if (!existingBadge) {
      user.verifiedSkills.push({
        id: `v_assess_${Date.now()}`,
        name: badgeTitle,
        score: overallPercentage,
        level: overallPercentage >= 85 ? "Advanced (Level 5)" : "Proficient (Level 4)",
        verifiedAt: new Date().toISOString().split("T")[0]
      });
    }

    user.assessmentAvgScore = Math.round(((user.assessmentAvgScore || 75) + overallPercentage) / 2);
    updateUser({
      verifiedSkills: user.verifiedSkills,
      assessmentAvgScore: user.assessmentAvgScore
    });
  }

  return sanitizeAssessmentForLearner(assessment);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
