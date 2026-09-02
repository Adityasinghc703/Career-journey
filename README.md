# CareerJourney AI - AI Career Copilot for Students

An intelligent, end-to-end career guidance, skill gap analysis, personalized roadmapping, and technical assessment platform designed for engineering and tech students.

---

## 🚀 Key Modules & System Architecture

1. **Authentication & Student Identity**:
   - Google Sign-In simulation, email/password registration, and Instant Demo Access (Rahul Sharma - IIIT).
2. **AI Skill Analysis & Gap Identification**:
   - Compares candidate extracted profile against real Indian tech market benchmarks (LPA compensation ranges, tier ratings, hiring demand).
3. **Dynamic Roadmap Engine**:
   - Step-by-step modular weekly learning curriculum with real-time hour tracking.
4. **Technical Assessment & Targeted Practice Arena**:
   - Grounded across 8 target roles and 31 skills.
   - 6 question types: *Multiple Choice (MCQ)*, *Multi-Select*, *True/False*, *Short Answer*, *Live Coding Challenges*, and *Scenario Debugging*.
   - Balanced distribution: 40% Coding, 40% Theory, 20% Scenario Debugging.
   - Adaptive weighting for weak skills (< 60%) and anti-repeat history protection.
   - Real-time in-browser code execution sandbox via Node `vm` runner.
   - Diagnostic reports with per-skill breakdown, remedial guidance, and revealed solutions.
5. **AI Mock Interview Studio**:
   - Web Speech API voice-to-text dictation with STAR-format AI evaluation.
6. **Admin Question Studio & Bulk Importer**:
   - Manage question library, create questions with test case builders, and bulk import JSON question packs.

---

## 🛠️ Bulk Question Import Guide

### CLI Bulk Import
To import questions from a JSON file into the database:
```bash
node scripts/importQuestions.js data/sample_import_questions.json
```

### JSON Schema Format
```json
[
  {
    "id": "q_custom_01",
    "title": "SQL Indexing Strategy for High-Volume Timeseries",
    "slug": "sql-indexing-strategy-timeseries",
    "questionType": "multiple_choice",
    "difficulty": "intermediate",
    "prompt": "When querying timeseries logs partitioned by tenant_id and created_at, which composite B-Tree index structure provides optimal index-only scanning?",
    "explanation": "A composite index on (tenant_id, created_at DESC) allows the database to first seek directly to the tenant's slice and scan the ordered timestamps sequentially.",
    "estimatedMinutes": 2,
    "status": "published",
    "skills": [{ "skillId": "skill_db", "weight": 1.0 }],
    "options": [
      { "id": "opt_1", "text": "Composite index on (tenant_id, created_at DESC)", "isCorrect": true },
      { "id": "opt_2", "text": "Single column index on (created_at) only", "isCorrect": false }
    ]
  }
]
```

---

## 🧪 Running Automated Tests

Run the complete test suite verifying assessment generation, sanitization anti-leak security, grading, and admin CRUD:

```bash
node test/assessment.test.js
```

---

## 💻 Running the Platform Locally

1. Install dependencies (if needed):
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node src/server.js
   ```
3. Open `http://localhost:3000` in your web browser.
