import express from 'express';
import multer from 'multer';
import {
  readDB,
  updateUser,
  loginUser,
  registerUser,
  googleSignIn,
  logoutUser,
  getRoles,
  getRoleById,
  getSkills,
  getRoleSkills,
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  bulkImportQuestions,
  getAssessmentById,
  getUserAssessments
} from '../services/db.js';
import { getAllCareers, getCareerById } from '../services/careerEngine.js';
import { parseResumeBuffer, extractProfileFromText } from '../services/resumeParser.js';
import { analyzeSkillGaps } from '../services/gapAnalysisEngine.js';
import { generatePersonalRoadmap } from '../services/roadmapEngine.js';
import {
  generateAssessment,
  sanitizeAssessmentForLearner,
  saveAnswerProgress,
  gradeAssessmentSubmission
} from '../services/assessmentEngine.js';
import {
  CODING_CHALLENGES_BANK,
  PROFESSION_ASSESSMENTS,
  gradeAssessment,
  runCodingChallenge,
  evaluateInterviewResponse,
  generateDynamicInterviewQuestion
} from '../services/verificationEngine.js';
import { calculateCareerReadinessScore, getSmartMatchedJobs, recordJobApplication } from '../services/matchingEngine.js';

const router = express.Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// 0. Authentication Endpoints
router.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  const result = registerUser(name, email, password);
  const analysis = analyzeSkillGaps(result.user, result.user.selectedCareerId);
  const roadmap = generatePersonalRoadmap(result.user, result.user.selectedCareerId);
  const readiness = calculateCareerReadinessScore(result.user, result.user.selectedCareerId);
  const jobMatches = getSmartMatchedJobs(result.user, result.user.selectedCareerId);

  res.json({
    success: true,
    message: result.message,
    user: result.user,
    analysis,
    roadmap,
    readiness,
    jobs: jobMatches.jobs
  });
});

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const result = loginUser(email, password);
  const analysis = analyzeSkillGaps(result.user, result.user.selectedCareerId);
  const roadmap = generatePersonalRoadmap(result.user, result.user.selectedCareerId);
  const readiness = calculateCareerReadinessScore(result.user, result.user.selectedCareerId);
  const jobMatches = getSmartMatchedJobs(result.user, result.user.selectedCareerId);

  res.json({
    success: true,
    message: result.message,
    user: result.user,
    analysis,
    roadmap,
    readiness,
    jobs: jobMatches.jobs
  });
});

router.post('/auth/google', (req, res) => {
  const profile = req.body.profile || {
    name: "Google Tech Student",
    email: "student.candidate@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  };

  const result = googleSignIn(profile);
  const analysis = analyzeSkillGaps(result.user, result.user.selectedCareerId);
  const roadmap = generatePersonalRoadmap(result.user, result.user.selectedCareerId);
  const readiness = calculateCareerReadinessScore(result.user, result.user.selectedCareerId);
  const jobMatches = getSmartMatchedJobs(result.user, result.user.selectedCareerId);

  res.json({
    success: true,
    message: result.message,
    user: result.user,
    analysis,
    roadmap,
    readiness,
    jobs: jobMatches.jobs
  });
});

router.post('/auth/logout', (req, res) => {
  logoutUser();
  res.json({ success: true, message: "Logged out successfully" });
});

// 1. User & Profile
router.get('/user', (req, res) => {
  const db = readDB();
  res.json({ success: true, user: db.user });
});

router.patch('/user', (req, res) => {
  const updatedUser = updateUser(req.body);
  res.json({ success: true, user: updatedUser });
});

// 2. Career Targets
router.get('/career-targets', (req, res) => {
  res.json({ success: true, careers: getAllCareers() });
});

router.post('/career-targets/select', (req, res) => {
  const { careerId } = req.body;
  if (!careerId) return res.status(400).json({ error: "careerId required" });

  const updatedUser = updateUser({ selectedCareerId: careerId });
  const analysis = analyzeSkillGaps(updatedUser, careerId);
  const roadmap = generatePersonalRoadmap(updatedUser, careerId);
  const readiness = calculateCareerReadinessScore(updatedUser, careerId);
  const jobMatches = getSmartMatchedJobs(updatedUser, careerId);

  res.json({
    success: true,
    user: updatedUser,
    analysis,
    roadmap,
    readiness,
    jobs: jobMatches.jobs
  });
});

// 3. Resume Upload & Deep Parsing
router.post('/resume/upload', upload.single('resume'), async (req, res) => {
  try {
    let parsedData;
    if (req.file) {
      parsedData = await parseResumeBuffer(req.file.buffer, req.file.originalname, req.file.mimetype);
    } else if (req.body.resumeText) {
      parsedData = extractProfileFromText(req.body.resumeText, "Pasted_Resume.txt");
    } else {
      return res.status(400).json({ error: "No resume file or text provided" });
    }

    const parsedSkills = parsedData.skills && parsedData.skills.length > 0
      ? parsedData.skills
      : ["Data Structures & Algorithms", "JavaScript", "HTML5", "CSS3", "Git & GitHub"];

    const updatedUser = updateUser({
      name: parsedData.candidateName && parsedData.candidateName !== "Student Candidate" ? parsedData.candidateName : undefined,
      extractedSkills: parsedSkills,
      resumeInfo: {
        fileName: parsedData.fileName,
        uploadDate: new Date().toISOString().split('T')[0],
        summary: parsedData.summary,
        education: parsedData.education
      }
    });

    const analysis = analyzeSkillGaps(updatedUser, updatedUser.selectedCareerId);
    const roadmap = generatePersonalRoadmap(updatedUser, updatedUser.selectedCareerId);
    const readiness = calculateCareerReadinessScore(updatedUser, updatedUser.selectedCareerId);
    const jobMatches = getSmartMatchedJobs(updatedUser, updatedUser.selectedCareerId);

    res.json({
      success: true,
      message: `Resume parsed! Extracted ${parsedSkills.length} technical skills.`,
      parsed: parsedData,
      user: updatedUser,
      analysis,
      roadmap,
      readiness,
      jobs: jobMatches.jobs
    });
  } catch (err) {
    console.error("Error parsing resume:", err);
    res.status(500).json({ error: "Failed to parse resume: " + err.message });
  }
});

// 4. AI Skill Analysis
router.get('/skill-analysis', (req, res) => {
  const db = readDB();
  const careerId = req.query.careerId || db.user.selectedCareerId;
  const analysis = analyzeSkillGaps(db.user, careerId);
  res.json({ success: true, analysis });
});

// 5. Personal Roadmap
router.get('/roadmap', (req, res) => {
  const db = readDB();
  const careerId = req.query.careerId || db.user.selectedCareerId;
  const roadmap = generatePersonalRoadmap(db.user, careerId);
  res.json({ success: true, roadmap });
});

router.patch('/roadmap/task', (req, res) => {
  const { taskId, completed } = req.body;
  const db = readDB();
  if (!db.user.completedRoadmapTasks) db.user.completedRoadmapTasks = [];

  if (completed) {
    if (!db.user.completedRoadmapTasks.includes(taskId)) {
      db.user.completedRoadmapTasks.push(taskId);
      db.user.weeklyStudyHours = Number(Math.min(db.user.weeklyStudyGoal || 6, (db.user.weeklyStudyHours || 0) + 0.5).toFixed(1));
    }
  } else {
    db.user.completedRoadmapTasks = db.user.completedRoadmapTasks.filter(id => id !== taskId);
    db.user.weeklyStudyHours = Number(Math.max(0, (db.user.weeklyStudyHours || 0) - 0.5).toFixed(1));
  }

  updateUser({
    completedRoadmapTasks: db.user.completedRoadmapTasks,
    weeklyStudyHours: db.user.weeklyStudyHours
  });

  const updatedRoadmap = generatePersonalRoadmap(db.user, db.user.selectedCareerId);

  res.json({
    success: true,
    taskId,
    completed,
    weeklyStudyHours: db.user.weeklyStudyHours,
    roadmap: updatedRoadmap
  });
});

// 6. Dynamic Assessment & Practice Question System
router.get('/roles', (req, res) => {
  const roles = getRoles().map(r => ({
    ...r,
    skills: getRoleSkills(r.id)
  }));
  res.json({ success: true, roles });
});

router.get('/skills', (req, res) => {
  res.json({ success: true, skills: getSkills() });
});

router.get('/questions', (req, res) => {
  const { status, difficulty, questionType, skillId, search } = req.query;
  const questions = getQuestions({ status, difficulty, questionType, skillId, search });
  res.json({ success: true, total: questions.length, questions });
});

router.get('/questions/:id', (req, res) => {
  const q = getQuestionById(req.params.id);
  if (!q) return res.status(404).json({ error: "Question not found" });
  res.json({ success: true, question: q });
});

router.post('/assessments/generate', (req, res) => {
  try {
    const db = readDB();
    const userId = db.user ? db.user.id : "user_rahul_sharma";
    const { roleId, level, mode, topicIds, totalQuestions, timeLimitMinutes } = req.body;

    const assessment = generateAssessment({
      userId,
      roleId: roleId || "role_frontend_dev",
      level: level || "intermediate",
      mode: mode || "practice",
      topicIds: topicIds || [],
      totalQuestions: Number(totalQuestions) || 20,
      timeLimitMinutes: timeLimitMinutes ? Number(timeLimitMinutes) : null
    });

    const sanitized = sanitizeAssessmentForLearner(assessment);
    res.json({ success: true, assessment: sanitized });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/assessments/:id', (req, res) => {
  const assessment = getAssessmentById(req.params.id);
  if (!assessment) return res.status(404).json({ error: "Assessment not found" });
  const sanitized = sanitizeAssessmentForLearner(assessment);
  res.json({ success: true, assessment: sanitized });
});

router.post('/assessments/:id/answers', (req, res) => {
  try {
    const { questionId, answer, timeSpentSeconds } = req.body;
    const result = saveAnswerProgress(req.params.id, questionId, answer, timeSpentSeconds);
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/assessments/:id/submit', (req, res) => {
  try {
    // Check if this is legacy assessment or new dynamic assessment
    const isDynamic = getAssessmentById(req.params.id);
    if (isDynamic) {
      const result = gradeAssessmentSubmission(req.params.id);
      return res.json({ success: true, result });
    }

    // Fallback to legacy exam grading if applicable
    const { answers } = req.body;
    const result = gradeAssessment(req.params.id, answers);
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/assessments/:id/results', (req, res) => {
  const assessment = getAssessmentById(req.params.id);
  if (!assessment) return res.status(404).json({ error: "Assessment not found" });
  const populated = sanitizeAssessmentForLearner(assessment);
  res.json({ success: true, assessment: populated });
});

router.get('/users/me/assessment-history', (req, res) => {
  const db = readDB();
  const userId = db.user ? db.user.id : "user_rahul_sharma";
  const history = getUserAssessments(userId);
  res.json({ success: true, total: history.length, history });
});

// Admin Question Management CRUD & Bulk Import
router.post('/admin/questions', (req, res) => {
  try {
    const newQ = createQuestion(req.body);
    res.json({ success: true, question: newQ });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/admin/questions/:id', (req, res) => {
  try {
    const updated = updateQuestion(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Question not found" });
    res.json({ success: true, question: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/admin/questions/:id', (req, res) => {
  try {
    const success = deleteQuestion(req.params.id);
    if (!success) return res.status(404).json({ error: "Question not found" });
    res.json({ success: true, message: "Question deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/admin/questions/import', (req, res) => {
  try {
    const questions = req.body.questions || req.body;
    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: "Payload must be an array of questions or { questions: [] }" });
    }
    const result = bulkImportQuestions(questions);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Legacy assessment listing endpoint for backward compatibility
router.get('/assessments', (req, res) => {
  const db = readDB();
  const career = getCareerById(db.user.selectedCareerId);
  const sorted = [...PROFESSION_ASSESSMENTS].sort((a, b) => {
    const aMatch = (a.careerTarget === career.title || a.category.toLowerCase().includes(career.category.toLowerCase())) ? 1 : 0;
    const bMatch = (b.careerTarget === career.title || b.category.toLowerCase().includes(career.category.toLowerCase())) ? 1 : 0;
    return bMatch - aMatch;
  });

  res.json({
    success: true,
    total: sorted.length,
    assessments: sorted
  });
});

router.get('/assessments/exam/:id', (req, res) => {
  const assess = PROFESSION_ASSESSMENTS.find(a => a.id === req.params.id) || PROFESSION_ASSESSMENTS[0];
  const sanitized = {
    ...assess,
    questions: assess.questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }))
  };
  res.json({ success: true, exam: sanitized });
});

// 7. Coding Playground & Scalable Bank
router.get('/coding-practice', (req, res) => {
  const db = readDB();
  const career = getCareerById(db.user.selectedCareerId);
  const { difficulty, topic } = req.query;
  let questions = [...CODING_CHALLENGES_BANK];

  if (difficulty && difficulty !== "All") {
    questions = questions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  if (topic && topic !== "All") {
    questions = questions.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
  }

  questions.sort((a, b) => {
    const aMatch = a.careerTarget === career.title ? 1 : (a.careerTarget === "All" ? 0.5 : 0);
    const bMatch = b.careerTarget === career.title ? 1 : (b.careerTarget === "All" ? 0.5 : 0);
    return bMatch - aMatch;
  });

  res.json({
    success: true,
    total: questions.length,
    codingChallenges: questions
  });
});

router.post('/coding-practice/:id/run', (req, res) => {
  try {
    const { code, language } = req.body;
    const result = runCodingChallenge(req.params.id, code, language || "javascript");
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 8. AI Mock Interview Studio
router.get('/mock-interviews/generate-question', (req, res) => {
  const db = readDB();
  const career = getCareerById(db.user.selectedCareerId);
  const userSkills = db.user.extractedSkills || [];
  const category = req.query.category || "all";
  const questionObj = generateDynamicInterviewQuestion(career.title, userSkills, category);
  res.json({ success: true, question: questionObj });
});

router.post('/mock-interviews/evaluate', (req, res) => {
  try {
    const { interviewType, question, candidateAnswer } = req.body;
    const feedback = evaluateInterviewResponse(
      interviewType || "Technical Architecture Screen",
      question || "Explain your technical problem-solving approach",
      candidateAnswer
    );
    res.json({ success: true, feedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 9. Verified Profile & Readiness
router.get('/readiness-score', (req, res) => {
  const db = readDB();
  const careerId = req.query.careerId || db.user.selectedCareerId;
  const readiness = calculateCareerReadinessScore(db.user, careerId);
  res.json({ success: true, readiness });
});

router.get('/verified-profile', (req, res) => {
  const db = readDB();
  const careerId = req.query.careerId || db.user.selectedCareerId;
  const readiness = calculateCareerReadinessScore(db.user, careerId);
  res.json({
    success: true,
    user: db.user,
    readiness,
    verifiedSkills: db.user.verifiedSkills,
    badges: db.user.badges
  });
});

// 10. Smart Jobs & Application Tracking
router.get('/jobs', (req, res) => {
  const db = readDB();
  const careerId = req.query.careerId || db.user.selectedCareerId;
  const { search, type, location } = req.query;
  const jobMatches = getSmartMatchedJobs(db.user, careerId, { search, type, location });
  res.json({ success: true, ...jobMatches });
});

router.get('/jobs/applications', (req, res) => {
  const db = readDB();
  res.json({ success: true, applications: db.applications || [] });
});

router.post('/jobs/:id/apply', (req, res) => {
  try {
    const { userNotes } = req.body;
    const result = recordJobApplication(req.params.id, userNotes);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
