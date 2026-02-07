# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## CareerCare - Workflow Déploiement

**Repo:** https://github.com/FiTiTan/CAREER
- `main` = code CareerCare
- `master` = workspace agent (mémoire)

**VPS Test:** https://vps-2c39c112.taile5d497.ts.net/

**Commandes:**
```bash
# Commit + Push (backup)
git add -A && git commit -m "..." && git push

# Build + Deploy
npm run build && pm2 restart careercare
```

**Process pm2:** `careercare`
