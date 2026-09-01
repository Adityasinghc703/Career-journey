import { getCareerById } from './careerEngine.js';

// Robust, Token-Aware Skill Similarity and Matcher
function calculateSkillScore(requiredSkillName, extractedSkills = [], verifiedSkills = []) {
  const reqLower = normalizeSkill(requiredSkillName);
  const verifiedLower = verifiedSkills.map(v => normalizeSkill(v.name || ''));
  const extractedLower = extractedSkills.map(s => normalizeSkill(s));

  // 1. Check verified skills first (Certified Mastery: 92%)
  for (const v of verifiedLower) {
    if (isSkillMatch(reqLower, v)) {
      return { status: "Proficient", score: 92, verified: true };
    }
  }

  // 2. Check extracted resume skills (Proficient: 85%)
  for (const e of extractedLower) {
    if (isSkillMatch(reqLower, e)) {
      return { status: "Proficient", score: 85, verified: false };
    }
  }

  // 3. Check partial conceptual match (e.g. "REST" in "REST APIs & GraphQL")
  if (isPartialSkillMatch(reqLower, extractedLower)) {
    return { status: "Learning", score: 55, verified: false };
  }

  // 4. Missing Skill / Gap
  return { status: "To Learn", score: 15, verified: false };
}

function normalizeSkill(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[()\/,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isSkillMatch(target, candidate) {
  if (!target || !candidate) return false;

  // Exact match
  if (target === candidate) return true;

  // Handle short 1-2 character languages (C, R, Go, C#) strictly with word boundary
  if (candidate.length <= 2) {
    const regex = new RegExp(`\\b${escapeRegex(candidate)}\\b`, 'i');
    return regex.test(target);
  }

  // For words with length >= 3, check word boundary or phrase match
  const candidateEscaped = escapeRegex(candidate);
  const targetRegex = new RegExp(`(^|\\s)${candidateEscaped}(\\s|$)`, 'i');
  if (targetRegex.test(target)) return true;

  // Synonym group match
  if (areSkillsSynonyms(target, candidate)) return true;

  return false;
}

function isPartialSkillMatch(target, extractedList) {
  const targetWords = target
    .split(/\s+/)
    .filter(w => w.length >= 4 && !["and", "with", "for", "using", "services", "system", "architecture", "deployment", "internals", "administration", "scripting", "management"].includes(w));

  for (const word of targetWords) {
    for (const extracted of extractedList) {
      if (extracted.includes(word) || isSkillMatch(extracted, word)) {
        return true;
      }
    }
  }
  return false;
}

function areSkillsSynonyms(a, b) {
  const syns = [
    ["react", "react.js", "reactjs", "next.js", "nextjs", "react 18"],
    ["node", "node.js", "nodejs", "express", "express.js", "nestjs"],
    ["python", "django", "flask", "fastapi", "python3"],
    ["sql", "postgresql", "postgres", "mysql", "sqlite", "relational database"],
    ["machine learning", "ml", "scikit-learn", "deep learning", "pytorch", "tensorflow"],
    ["javascript", "typescript", "es6", "js", "ts"],
    ["html", "css", "html5", "css3", "tailwind", "tailwind css", "bootstrap"],
    ["aws", "amazon web services", "cloud", "ec2", "s3", "lambda"],
    ["docker", "containers", "containerization"],
    ["kubernetes", "k8s"],
    ["git", "github", "gitlab", "version control"],
    ["data structures", "algorithms", "dsa", "leetcode"],
    ["linux", "bash", "shell scripting", "unix"],
    ["ci cd", "cicd", "github actions", "gitlab ci", "jenkins"],
    ["terraform", "iac", "infrastructure as code"]
  ];

  return syns.some(group => group.some(x => a.includes(x)) && group.some(x => b.includes(x)));
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function analyzeSkillGaps(user, careerId) {
  const career = getCareerById(careerId || user.selectedCareerId || "senior-frontend-dev");
  const extractedSkills = user.extractedSkills || [];
  const verifiedSkills = user.verifiedSkills || [];

  // Evaluate every core skill of target career
  const analyzedCoreSkills = career.coreTechnicalSkills.map(coreSkill => {
    const match = calculateSkillScore(coreSkill.name, extractedSkills, verifiedSkills);

    return {
      name: coreSkill.name,
      requiredProficiency: coreSkill.requiredProficiency,
      minScore: coreSkill.minScore,
      userStatus: match.status,
      userScore: match.score,
      isVerified: match.verified,
      isGap: match.status === "To Learn" || (match.status === "Learning" && coreSkill.requiredProficiency === "Advanced")
    };
  });

  // Calculate dynamic overall match score
  const totalWeight = analyzedCoreSkills.length * 100;
  const earnedWeight = analyzedCoreSkills.reduce((acc, curr) => acc + curr.userScore, 0);
  const overallMatchScore = Math.min(98, Math.max(15, Math.round((earnedWeight / totalWeight) * 100)));

  // Dynamic Radar Chart Evaluation
  const radarChart = career.radarDimensions.map(dim => {
    const match = calculateSkillScore(dim.name, extractedSkills, verifiedSkills);
    return {
      axis: dim.name,
      required: dim.requiredLevel,
      user: Math.min(100, Math.max(15, match.score))
    };
  });

  // Gaps Identified
  const gaps = analyzedCoreSkills.filter(s => s.isGap);

  // AI Recommended Next Steps targeting the actual identified gaps
  const aiRecommendedSteps = [];
  const topGaps = gaps.length > 0 ? gaps : analyzedCoreSkills;

  topGaps.slice(0, 3).forEach((gapItem, idx) => {
    const types = ["Course & Labs", "Production Project", "Architecture & System Design"];
    const durations = ["4 hrs", "1-2 weeks", "3 days"];
    const colors = ["primary", "secondary", "tertiary"];

    aiRecommendedSteps.push({
      id: `step_0${idx + 1}`,
      title: `Master ${gapItem.name}`,
      description: `Targeting your key competency gap for ${career.title}. Focus on production implementation and interview patterns.`,
      type: types[idx % types.length],
      duration: durations[idx % durations.length],
      color: colors[idx % colors.length],
      targetGap: gapItem.name
    });
  });

  const extractedNames = extractedSkills.map(s => s.toLowerCase());

  return {
    career,
    overallMatchScore,
    analyzedCoreSkills,
    gaps,
    radarChart,
    aiRecommendedSteps,
    essentialTools: career.essentialTools.map(tool => ({
      name: tool,
      acquired: extractedNames.some(e => isSkillMatch(tool.toLowerCase(), e))
    })),
    softSkills: career.softSkills,
    extractedInventory: extractedSkills
  };
}
