# BRIEF CLAUDE CODE — CareerCare v2
# "Prenez soin de votre carrière"
# Date : 07/02/2026

---

## CONTEXTE

Tu travailles sur **CareerCare**, une web app de gestion de carrière complète.
Le repo existe déjà sur GitHub (FiTiTan/CAREER) avec un début de Next.js.
On repart sur des bases propres avec l'architecture v2 validée ci-dessous.

### Stack technique

- **Framework** : Next.js 14 (App Router, TypeScript strict)
- **CSS** : Tailwind CSS v3 + design system CALM-UI (CSS variables)
- **Auth** : Supabase Auth (Magic Link + OAuth Google)
- **Database** : Supabase PostgreSQL + RLS policies
- **Storage** : Supabase Storage (buckets privés/publics)
- **Paiement** : Stripe (subscriptions + one-shot boutique)
- **IA** : Mistral Small (anonymisation, EU Frankfurt) + DeepSeek V3 (analyse)
- **Deploy** : VPS Ubuntu (auto-hébergé, PM2 + Nginx reverse proxy)
- **PWA** : Service Worker + Web Push API + manifest.json

### Principes non-négociables

1. **RGPD-first** : Aucune donnée personnelle ne quitte l'UE sans anonymisation préalable
2. **PWA-first** : L'app doit être installable, supporter les push notifications, et avoir un cache offline pour le dashboard
3. **CareerScore central** : Le score est la page d'accueil du Hub, pas un module secondaire
4. **TypeScript strict** : Pas de `any`, pas de `@ts-ignore`
5. **Mobile-first responsive** : Bottom nav sur mobile, sidebar sur desktop

---

## STATUS IMPLEMENTATION

- [x] Structure dossiers créée
- [ ] Types TypeScript complets
- [ ] Migrations Supabase
- [ ] Auth complet
- [ ] Hub layout (sidebar + bottom nav)
- [ ] CareerScore
- [ ] CV Coach pipeline
- [ ] PWA
- [ ] Stripe
- [ ] Job Match
- [ ] LinkedIn
- [ ] Vault
- [ ] E-Réputation
- [ ] Boutique
- [ ] Pages légales
- [ ] Onboarding
