#!/usr/bin/env node
/**
 * TypeScript Type Checker
 * Finds usage of `any` type in SOUVERAIN codebase
 */

const { execSync } = require('child_process');

const SOUVERAIN_PATH = process.env.SOUVERAIN_PATH || '/home/ubuntu/clawd/SOUVERAIN';

console.log('🔍 TypeScript Type Analysis\n');

try {
  // Find all `any` types
  const result = execSync(`cd ${SOUVERAIN_PATH} && grep -rn ": any" src/ --include="*.ts" --include="*.tsx" || true`).toString();
  const lines = result.trim().split('\n').filter(Boolean);

  if (lines.length > 0) {
    console.log(`❌ Found ${lines.length} instance(s) of 'any' type:\n`);
    lines.forEach(line => {
      // Format: file:line:content
      const [file, lineNum, ...content] = line.split(':');
      console.log(`   ${file}:${lineNum}`);
      console.log(`      ${content.join(':').trim()}\n`);
    });
    
    console.log(`\n📊 Total: ${lines.length} 'any' types to fix`);
    process.exit(1);
  } else {
    console.log('✅ No "any" types found - TypeScript compliance perfect!');
    process.exit(0);
  }
} catch (e) {
  console.error('Error running type check:', e.message);
  process.exit(2);
}
