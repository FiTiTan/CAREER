# SOUVERAIN Best Practices

## Architecture

**Frontend:** React + TypeScript (`src/`)  
**Backend:** Electron main process (`.cjs` files)  
**Database:** SQLite with AES-256 encryption  
**Build:** Vite with code splitting

## File Structure

```
SOUVERAIN/
├── src/
│   ├── components/
│   │   └── ui.tsx           # CALM-UI design system
│   ├── ThemeContext.tsx     # Theme provider
│   ├── design-system.ts     # Theme tokens
│   └── modules/             # Feature modules
├── main.cjs                 # Electron entry point
├── database.cjs             # SQLite encrypted logic
└── vite.config.js           # Build config
```

## Code Quality Checklist

### Before Every Commit

1. **TypeScript Compile**
   ```bash
   npx tsc --noEmit
   ```

2. **Import Verification**
   ```bash
   grep -r "from.*\.ts" src/ | grep -v node_modules
   ```

3. **IPC Handler Sync** (main.cjs ↔ preload.cjs)
   ```bash
   grep "ipcMain.handle" main.cjs | cut -d"'" -f2 | sort > /tmp/handlers.txt
   grep "ipcRenderer.invoke" preload.cjs | cut -d"'" -f2 | sort > /tmp/preload.txt
   diff /tmp/handlers.txt /tmp/preload.txt
   ```

4. **CALM-UI Compliance**
   - No hardcoded colors
   - Theme tokens used
   - React.memo on heavy components

5. **TypeScript Strictness**
   - No `any` types
   - Proper interfaces/types

### Push Immediately

**RÈGLE ABSOLUE:** Never commit without pushing immediately after.

**Why:**
- Avoids "did you push?" → "no" → re-push cycles
- Code available instantly to collaborators
- No local/remote divergence

**Exception:** Explicit work-in-progress requested by team.

## Performance Guidelines

### Bundle Optimization

- **Code Splitting:** Use Vite's `manualChunks` for large modules
- **Lazy Loading:** Defer non-critical components
- **React.memo:** Wrap heavy components
- **react-window:** Use for long lists (>100 items)

### Database Queries

- **SELECT specific columns** (not `SELECT *`)
- **Use LIMIT** when appropriate
- **Index frequently queried fields**
- **Batch updates** when possible

### Images

- **Lazy load** with `loading="lazy"`
- **Optimize sizes** before bundling
- **Use WebP** when browser support allows

## TypeScript Conventions

### ✅ Good
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUser = async (id: string): Promise<User> => { ... }
```

### ❌ Bad
```typescript
const fetchUser = async (id: any): Promise<any> => { ... }
```

## IPC Communication

### Main Process (main.cjs)
```javascript
ipcMain.handle('vault:getData', async () => {
  // Handler logic
});
```

### Preload (preload.cjs)
```javascript
contextBridge.exposeInMainWorld('electron', {
  vault: {
    getData: () => ipcRenderer.invoke('vault:getData')
  }
});
```

### Renderer (React)
```typescript
const data = await window.electron.vault.getData();
```

## Git Workflow

1. **Atomic commits** - One fix = one commit
2. **Descriptive messages** - What changed and why
3. **Push immediately** - No local-only commits
4. **Test before push** - Run checklist above

## TODOs Management

Track pending tasks in code with TODO comments:

```typescript
// TODO: Vérifier statut Premium (GitHub/Local import)
// TODO: Gérer multi-portfolio
// TODO: API Electron pour désactivation
```

Convert critical TODOs to GitHub issues for tracking.

## Documentation

Update relevant docs when making architectural changes:
- **MEMORY.md** - Long-term decisions, lessons learned
- **Daily logs** (`memory/YYYY-MM-DD.md`) - Work done, context
- **Code comments** - Complex logic, non-obvious choices
