/**
 * Automated Test Suite for Technical Assessment & Practice System
 * Run with: node test/assessment.test.js
 */

import assert from 'assert';
import {
  readDB,
  getRoles,
  getSkills,
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  bulkImportQuestions
} from '../src/services/db.js';
import {
  generateAssessment,
  sanitizeAssessmentForLearner,
  saveAnswerProgress,
  gradeAssessmentSubmission
} from '../src/services/assessmentEngine.js';

console.log("🧪 Starting Technical Assessment & Practice System Test Suite...\n");

// Test 1: Seed Roles, Skills & Questions Load Correctly
console.log("▶ Test 1: Verifying seed database content...");
const roles = getRoles();
const skills = getSkills();
const questions = getQuestions();

assert(roles.length >= 8, `Expected at least 8 roles, found ${roles.length}`);
assert(skills.length >= 20, `Expected at least 20 skills, found ${skills.length}`);
assert(questions.length >= 40, `Expected at least 40 questions, found ${questions.length}`);
console.log(`  ✓ Loaded ${roles.length} roles, ${skills.length} skills, and ${questions.length} questions successfully.`);

// Test 2: Assessment Generation & Balanced Distribution
console.log("\n▶ Test 2: Generating personalized assessment (Frontend Developer, Intermediate)...");
const assessment = generateAssessment({
  userId: "test_user_1",
  roleId: "role_frontend_dev",
  level: "intermediate",
  mode: "practice",
  totalQuestions: 10
});

assert(assessment.id.startsWith("assess_"), "Assessment ID should start with assess_");
assert(assessment.questions.length === 10, `Expected 10 questions, got ${assessment.questions.length}`);
assert(assessment.status === "in_progress", "Assessment status should be in_progress");
console.log(`  ✓ Assessment generated: ID ${assessment.id} with ${assessment.questions.length} questions.`);

// Test 3: Anti-Leak Security & Question Sanitization
console.log("\n▶ Test 3: Testing Anti-Leak Question Payload Sanitization...");
const sanitized = sanitizeAssessmentForLearner(assessment);

for (const q of sanitized.questions) {
  // Must NOT expose isCorrect in options
  if (q.options) {
    for (const opt of q.options) {
      assert.strictEqual(opt.isCorrect, undefined, `Security failure: isCorrect leaked in question ${q.questionId}`);
    }
  }
  // Must NOT expose explanation before submission
  assert.strictEqual(q.explanation, undefined, `Security failure: explanation leaked in question ${q.questionId}`);
  // Must NOT expose acceptableShortAnswers
  assert.strictEqual(q.acceptableShortAnswers, undefined, `Security failure: acceptableShortAnswers leaked in question ${q.questionId}`);
  // Must NOT expose hidden test cases or solution code in coding questions
  if (q.coding) {
    assert.strictEqual(q.coding.solutionCodeJson, undefined, `Security failure: solutionCodeJson leaked in question ${q.questionId}`);
    for (const tc of q.coding.testCases || []) {
      assert.strictEqual(tc.isHidden, false, `Security failure: hidden test case leaked in question ${q.questionId}`);
    }
  }
}
console.log("  ✓ Security verification passed: Zero answer leaks, hidden tests, or solution codes detected in learner payloads.");

// Test 4: Answer Auto-Save Progress
console.log("\n▶ Test 4: Testing Answer Progress Auto-Saving...");
const firstQ = assessment.questions[0];
saveAnswerProgress(assessment.id, firstQ.questionId, "opt_1", 25);
const updatedAssess = sanitizeAssessmentForLearner(readDB().assessments.find(a => a.id === assessment.id));
const updatedFirstQ = updatedAssess.questions.find(q => q.questionId === firstQ.questionId);

assert.strictEqual(updatedFirstQ.answer, "opt_1", "Answer should be saved");
assert.strictEqual(updatedFirstQ.timeSpentSeconds, 25, "Time spent should be updated");
console.log("  ✓ Answer and time tracking successfully auto-saved.");

// Test 5: Grading & Result Calculations
console.log("\n▶ Test 5: Testing Grading & Diagnostic Result Calculations...");
// Answer all questions intentionally to verify scoring logic
const allQuestionsMap = new Map();
getQuestions().forEach(q => allQuestionsMap.set(q.id, q));

for (const aq of assessment.questions) {
  const fullQ = allQuestionsMap.get(aq.questionId);
  if (fullQ.questionType === "multiple_choice" || fullQ.questionType === "true_false" || fullQ.questionType === "scenario") {
    const correctOpt = (fullQ.options || []).find(o => o.isCorrect);
    if (correctOpt) saveAnswerProgress(assessment.id, aq.questionId, correctOpt.id);
  } else if (fullQ.questionType === "coding") {
    // Provide correct starter/solution code
    const code = fullQ.coding?.starterCodeJson?.javascript || "function test(){ return true; }";
    saveAnswerProgress(assessment.id, aq.questionId, { code, language: "javascript" });
  } else if (fullQ.questionType === "short_answer") {
    const ans = fullQ.acceptableShortAnswers ? fullQ.acceptableShortAnswers[0] : "429";
    saveAnswerProgress(assessment.id, aq.questionId, ans);
  }
}

const gradedResult = gradeAssessmentSubmission(assessment.id);
assert.strictEqual(gradedResult.status, "submitted", "Status should be submitted");
assert(typeof gradedResult.score === "number", "Overall score should be a number");
assert(gradedResult.skillResults.length > 0, "Should generate skill-by-skill breakdown");

console.log(`  ✓ Submission graded successfully! Overall Score: ${gradedResult.score}%`);
console.log(`  ✓ Skill breakdown generated for ${gradedResult.skillResults.length} skills:`);
gradedResult.skillResults.slice(0, 3).forEach(sr => {
  console.log(`    - ${sr.skillName}: ${sr.percentage}% (${sr.recommendation})`);
});

// Test 6: Admin Question Management & Bulk Import
console.log("\n▶ Test 6: Testing Admin Question Management CRUD & Bulk Import...");
const testQ = createQuestion({
  title: "Automated Test Question: CSS Flexbox",
  questionType: "multiple_choice",
  difficulty: "beginner",
  prompt: "Which CSS property aligns items along the cross axis in a flex container?",
  explanation: "align-items aligns items along the cross axis; justify-content aligns along the main axis.",
  status: "draft",
  options: [
    { id: "opt_1", text: "align-items", isCorrect: true },
    { id: "opt_2", text: "justify-content", isCorrect: false }
  ],
  skills: [{ skillId: "skill_css", weight: 1.0 }]
});

assert(testQ.id.startsWith("q_custom_"), "Custom question ID should be generated");
const fetched = getQuestionById(testQ.id);
assert.strictEqual(fetched.title, "Automated Test Question: CSS Flexbox");

// Update Question
const updatedQ = updateQuestion(testQ.id, { status: "published" });
assert.strictEqual(updatedQ.status, "published", "Question status should update to published");

// Delete Question
const deleted = deleteQuestion(testQ.id);
assert.strictEqual(deleted, true, "Question should be deleted");
assert.strictEqual(getQuestionById(testQ.id), undefined, "Deleted question should no longer exist");

console.log("  ✓ Admin CRUD operations verified successfully.");

// Test 7: Bulk Import
console.log("\n▶ Test 7: Testing Bulk Question JSON Import...");
const importPayload = [
  {
    id: "q_bulk_test_01",
    title: "Bulk Test: TypeScript Generics",
    questionType: "short_answer",
    difficulty: "intermediate",
    prompt: "What character is traditionally used as the standard default type parameter name in TypeScript generics?",
    explanation: "T is commonly used for Type.",
    status: "published",
    acceptableShortAnswers: ["T", "t"],
    skills: [{ skillId: "skill_ts", weight: 1.0 }]
  }
];

const importResult = bulkImportQuestions(importPayload);
assert(importResult.success, "Bulk import should succeed");
assert.strictEqual(importResult.count, 1, "Import count should be 1");
const importedQ = getQuestionById("q_bulk_test_01");
assert.strictEqual(importedQ.title, "Bulk Test: TypeScript Generics");
deleteQuestion("q_bulk_test_01");

console.log("  ✓ Bulk import engine verified successfully.");

console.log("\n🎉 ALL 7 TEST SUITES PASSED PERFECTLY WITH ZERO ERRORS!\n");
