---
name: souverain
description: Audit and optimize the SOUVERAIN React/Electron application. Use when working on SOUVERAIN codebase for (1) CALM-UI compliance checking (hardcoded colors, React.memo, imports), (2) TypeScript type validation (finding 'any' types), (3) bundle size analysis, (4) enforcing best practices, or (5) checking code quality before commits. Includes automated scripts for auditing design system compliance, type safety, and performance metrics.
---

# SOUVERAIN Development Skill

Specialized tooling for the SOUVERAIN React/Electron application - a secure, encrypted personal data management system with dark/light themes and CALM-UI design system.

## Quick Start

### Audit Before Commit

Run full code quality check:

```bash
cd /home/ubuntu/clawd/SOUVERAIN
node /home/ubuntu/clawd/souverain/scripts/audit-calm-ui.js
node /home/ubuntu/clawd/souverain/scripts/check-types.js
npx tsc --noEmit
```

### Check Bundle Size

After build:

```bash
npm run build
bash /home/ubuntu/clawd/souverain/scripts/analyze-bundle.sh
```

## Available Scripts

### audit-calm-ui.js

Scans codebase for CALM-UI design system violations:
- ❌ Hardcoded colors (`#FFFFFF`, `rgb(...)`) → should use `theme.*`
- ❌ Missing `React.memo` on heavy components
- ❌ Incorrect imports (`.ts` extensions in import paths)

**Usage:**
```bash
SOUVERAIN_PATH=/path/to/SOUVERAIN node scripts/audit-calm-ui.js
```

**Exit codes:**
- `0` - All checks passed
- `1` - Issues detected (see output)

### check-types.js

Finds all usages of TypeScript `any` type that should be properly typed.

**Usage:**
```bash
SOUVERAIN_PATH=/path/to/SOUVERAIN node scripts/check-types.js
```

**Output:** File paths with line numbers and code snippets showing `any` usage.

### analyze-bundle.sh

Analyzes production bundle size after build:
- Total dist/ size
- Breakdown by folder
- Top 10 largest files

**Usage:**
```bash
SOUVERAIN_PATH=/path/to/SOUVERAIN bash scripts/analyze-bundle.sh
```

**Prerequisite:** Run `npm run build` first.

## References

### design-system.md

Complete CALM-UI design system reference:
- Theme token structure
- Available components (BentoBox, ScoreCircle, Tag, etc.)
- Migration patterns (hardcoded → theme tokens)
- Heavy components requiring `React.memo`

**Read when:** Need to understand CALM-UI usage, migrating hardcoded styles, or adding new components.

### best-practices.md

SOUVERAIN coding conventions and workflows:
- Pre-commit checklist
- TypeScript conventions
- IPC communication patterns (main/preload/renderer)
- Performance guidelines
- Git workflow (atomic commits, immediate push rule)

**Read when:** Onboarding to SOUVERAIN, reviewing architecture, or enforcing code quality standards.

## Workflow Patterns

### Pre-Commit Quality Gate

Before every commit:

1. **TypeScript validation:**
   ```bash
   npx tsc --noEmit
   ```

2. **CALM-UI compliance:**
   ```bash
   node souverain/scripts/audit-calm-ui.js
   ```

3. **Type safety:**
   ```bash
   node souverain/scripts/check-types.js
   ```

4. **IPC handler sync:** Verify main.cjs ↔ preload.cjs alignment

5. **Commit + Push immediately** (never leave local-only commits)

### Performance Optimization

When optimizing bundle size:

1. Run build: `npm run build`
2. Analyze: `bash souverain/scripts/analyze-bundle.sh`
3. Identify large files/folders
4. Apply optimizations:
   - Code splitting (Vite `manualChunks`)
   - Lazy loading for heavy components
   - Image optimization
   - Remove unused dependencies

### Type Migration

When fixing `any` types:

1. Find instances: `node souverain/scripts/check-types.js`
2. For each occurrence:
   - Identify proper type/interface
   - Update function signature or variable type
   - Verify TypeScript compilation
3. Re-run check to confirm all fixed

## Common Issues

### Hardcoded Colors Not Detected

**Symptom:** Visual theme inconsistency  
**Fix:** Run `audit-calm-ui.js`, replace with theme tokens from `design-system.md`

### Missing React.memo

**Symptom:** Slow UI, unnecessary re-renders  
**Fix:** Wrap heavy components (PortfolioCard, VaultDocumentCard, etc.) with `React.memo`

### IPC Handler Mismatch

**Symptom:** `ipcRenderer.invoke` fails at runtime  
**Fix:** Compare `main.cjs` handlers vs `preload.cjs` exposed methods, ensure 1:1 mapping

### Bundle Too Large

**Symptom:** Slow load times  
**Fix:** Run `analyze-bundle.sh`, identify culprits, apply code splitting or lazy loading

## Environment Variables

All scripts accept:

- `SOUVERAIN_PATH` - Path to SOUVERAIN project (default: `/home/ubuntu/clawd/SOUVERAIN`)

Example:
```bash
SOUVERAIN_PATH=/custom/path node scripts/audit-calm-ui.js
```

## Integration with Main Workflow

This skill integrates with the AGENTS.md "Code Quality Checklist" section. Before push:

```bash
# Quick validation
cd /home/ubuntu/clawd/SOUVERAIN
node ../souverain/scripts/audit-calm-ui.js && \
node ../souverain/scripts/check-types.js && \
npx tsc --noEmit && \
echo "✅ Ready to commit"
```

Consider adding as git pre-commit hook for automatic enforcement.
