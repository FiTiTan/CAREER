#!/usr/bin/env node
/**
 * CALM-UI Compliance Auditor
 * Scans SOUVERAIN codebase for violations:
 * - Hardcoded colors (should use theme tokens)
 * - Missing React.memo on heavy components
 * - Incorrect imports (*.ts extensions, wrong paths)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOUVERAIN_PATH = process.env.SOUVERAIN_PATH || '/home/ubuntu/clawd/SOUVERAIN';
const HEAVY_COMPONENTS = ['PortfolioCard', 'VaultDocumentCard', 'OnboardingSlide', 'DeveloperTemplate', 'MinimalTemplate', 'ModernTemplate', 'VisualTemplate'];

function scanFiles(dir, pattern) {
  try {
    const result = execSync(`cd ${dir} && grep -r "${pattern}" src/ --include="*.tsx" --include="*.ts" -n || true`).toString();
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function checkReactMemo(componentName) {
  try {
    const result = execSync(`cd ${SOUVERAIN_PATH} && grep -r "React.memo(${componentName})" src/ --include="*.tsx" || true`).toString();
    return result.trim().length > 0;
  } catch (e) {
    return false;
  }
}

console.log('🔍 SOUVERAIN CALM-UI Audit\n');

// 1. Hardcoded colors
console.log('📐 Checking hardcoded colors...');
const hexColors = scanFiles(SOUVERAIN_PATH, '#[0-9A-Fa-f]\\{6\\}');
const rgbColors = scanFiles(SOUVERAIN_PATH, 'rgb(');
const totalColors = hexColors.length + rgbColors.length;

if (totalColors > 0) {
  console.log(`❌ Found ${totalColors} hardcoded color(s):`);
  [...hexColors, ...rgbColors].slice(0, 10).forEach(line => console.log(`   ${line}`));
  if (totalColors > 10) console.log(`   ... and ${totalColors - 10} more`);
} else {
  console.log('✅ No hardcoded colors found');
}

// 2. React.memo
console.log('\n⚡ Checking React.memo on heavy components...');
let missingMemo = [];
HEAVY_COMPONENTS.forEach(comp => {
  if (!checkReactMemo(comp)) {
    missingMemo.push(comp);
  }
});

if (missingMemo.length > 0) {
  console.log(`❌ Missing React.memo on ${missingMemo.length} component(s):`);
  missingMemo.forEach(c => console.log(`   - ${c}`));
} else {
  console.log('✅ All heavy components use React.memo');
}

// 3. Incorrect imports (.ts extensions)
console.log('\n📦 Checking incorrect imports...');
const tsImports = scanFiles(SOUVERAIN_PATH, 'from.*\\.ts[\'"]');
if (tsImports.length > 0) {
  console.log(`❌ Found ${tsImports.length} import(s) with .ts extension:`);
  tsImports.slice(0, 5).forEach(line => console.log(`   ${line}`));
} else {
  console.log('✅ No .ts imports found');
}

// Summary
console.log('\n📊 Summary:');
console.log(`   Hardcoded colors: ${totalColors}`);
console.log(`   Missing React.memo: ${missingMemo.length}`);
console.log(`   Incorrect imports: ${tsImports.length}`);

const total = totalColors + missingMemo.length + tsImports.length;
if (total === 0) {
  console.log('\n✅ All CALM-UI compliance checks passed!');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${total} issue(s) detected`);
  process.exit(1);
}
