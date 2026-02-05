# CareerCare — Le premier Career OS français

> Prenez soin de votre carrière

## Stack

- **Frontend** : Next.js 14 (App Router) + React 19
- **Styling** : Tailwind CSS + CALM-UI Design System
- **Auth** : Supabase Auth (Magic Link)
- **Database** : Supabase PostgreSQL (EU)
- **AI** : Mistral (anonymisation) + DeepSeek (analyse)
- **Paiements** : Stripe
- **Hosting** : Vercel

## Setup Local

```bash
# Install dependencies
npm install

# Copy .env.example to .env.local
cp .env.example .env.local

# Add your Supabase credentials to .env.local

# Run dev server
npm run dev
```

## Architecture RGPD

```
EU (RGPD) → Mistral (anonymisation) → DeepSeek (Chine, données anonymes) → EU (dé-anonymisation)
```

## Documentation

- [PIPELINE.md](./PIPELINE.md) - Roadmap complète
- [DESIGN.md](./DESIGN.md) - Charte graphique

## Déploiement

```bash
vercel --prod
```

---

*Projet généré par Claude Code — Février 2026*
