#!/usr/bin/env node
/**
 * Standalone CLI Script for Bulk Question Import
 * Usage: node scripts/importQuestions.js data/sample_import_questions.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { bulkImportQuestions, readDB } from '../src/services/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = process.argv[2] || path.join(__dirname, '../data/sample_import_questions.json');

try {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(fullPath, 'utf-8');
  const questions = JSON.parse(raw);

  if (!Array.isArray(questions)) {
    console.error(`❌ Invalid format: Expected an array of question objects.`);
    process.exit(1);
  }

  console.log(`📦 Importing ${questions.length} questions from ${path.basename(fullPath)}...`);
  const result = bulkImportQuestions(questions);

  console.log(`✅ Successfully imported ${result.count} questions!`);
  console.log(`📊 Total questions now in database: ${result.totalInDB}`);
} catch (err) {
  console.error(`❌ Import failed: ${err.message}`);
  process.exit(1);
}
