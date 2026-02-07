# BRIEF CLAUDE CODE — CareerCare v2
# "Prenez soin de votre carrière"
# Date : 07/02/2026
# Source : Jean-Louis (Telegram)

Ce fichier est la référence pour l'architecture CareerCare v2.
Voir le brief complet dans /home/ubuntu/.clawdbot/media/inbound/e3db5a2e-ee65-4b03-8d3f-9f16fdb611fd.md

## Résumé rapide

- **Stack** : Next.js 14 App Router + Supabase + Stripe + Mistral/DeepSeek
- **Deploy** : VPS (PM2 + Nginx), pas Vercel
- **PWA** : manifest + service worker + push
- **CareerScore** : Score central 0-100, 6 piliers pondérés

## Modules (7)

1. **CareerScore** — Dashboard central (/hub)
2. **CV Coach** — Analyse IA de CV (/hub/cv-coach)
3. **Portfolio** — Wizard + templates (/hub/portfolio)
4. **Job Match** — Matching offres (/hub/job-match)
5. **LinkedIn** — Optimiseur profil (/hub/linkedin)
6. **Vault** — Coffre-fort fichiers (/hub/vault)
7. **E-Réputation** — Scan web (/hub/e-reputation)
8. **Boutique** — Templates premium (/hub/boutique)

## Priorités

1. Structure + Config + Types
2. Supabase migrations
3. Auth + Hub layout (sidebar desktop + bottom nav mobile)
4. CareerScore dashboard
5. Pipeline CV Coach IA
6. PWA
7. Stripe
8. Modules restants
