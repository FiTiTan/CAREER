# PIPELINE.md — CareerCare MVP

> **Document de référence pour l'implémentation**  
> Généré le 2026-02-05 par Opus  
> À suivre par Sonnet pour l'exécution

---

## 🎯 Vision Produit

**CareerCare** — "Prenez soin de votre carrière"

Le premier Career OS français. Comme skincare pour ta peau, CareerCare pour ta carrière.

**Domaines** : careercare.io (principal) + careercare.fr (redirect)

**Langue** : FR par défaut, EN si IP hors France (détection auto)

---

## 🏗️ Stack Technique

| Layer | Techno | Raison |
|-------|--------|--------|
| **Frontend** | Next.js 14 (App Router) | SEO, SSR, performance |
| **Styling** | Tailwind CSS + CALM-UI tokens | Design system existant |
| **Auth** | Supabase Auth (Magic Link) | Sans mot de passe |
| **Database** | Supabase PostgreSQL (EU Frankfurt) | RGPD compliant |
| **Storage** | Supabase Storage | CVs, images |
| **LLM Anonymisation** | Mistral Small 3.1 | EU, pas cher |
| **LLM Analyse** | DeepSeek V3 | Qualité top, pas cher |
| **Paiements** | Stripe | Standard SaaS |
| **Hosting** | Vercel | CI/CD auto |
| **Analytics** | Plausible | RGPD-friendly |

---

## 🔐 Architecture IA (RGPD Compliant)

```
┌─────────────────────────────────────────────────────────────┐
│                      ZONE EU (RGPD)                         │
│                                                             │
│  ┌─────────┐    ┌──────────────┐    ┌─────────────────┐   │
│  │ CV brut │───▶│ Mistral Small│───▶│ Texte anonymisé │   │
│  │ (perso) │    │ (Frankfurt)  │    │ [P1], [E1]...   │   │
│  └─────────┘    └──────────────┘    └────────┬────────┘   │
│                                               │            │
└───────────────────────────────────────────────┼────────────┘
                                                │
                    ┌───────────────────────────▼──────┐
                    │         DeepSeek V3 (Chine)      │
                    │         Analyse + Scoring        │
                    │         (données anonymes)       │
                    └───────────────────────────┬──────┘
                                                │
┌───────────────────────────────────────────────┼────────────┐
│                      ZONE EU (RGPD)           │            │
│                                               ▼            │
│  ┌─────────────────┐    ┌──────────────────────────────┐  │
│  │ Dé-anonymisation│◀───│ Réponse avec tokens anonymes │  │
│  │ [P1]→Jean Dupont│    └──────────────────────────────┘  │
│  └────────┬────────┘                                      │
│           │                                               │
│           ▼                                               │
│  ┌─────────────────┐                                      │
│  │ Rapport final   │                                      │
│  │ (données réelles)│                                     │
│  └─────────────────┘                                      │
└───────────────────────────────────────────────────────────┘
```

---

## 👤 User Flows

### Flow 1 : Visiteur → Analyse CV (acquisition)

```
1. Landing page
   └─▶ CTA "Analysez votre CV gratuitement"

2. Upload CV (SANS compte)
   └─▶ Drag & drop PDF
   └─▶ Validation (PDF, <5MB)

3. Processing (15-30s)
   └─▶ Extraction texte
   └─▶ Anonymisation (Mistral)
   └─▶ Analyse (DeepSeek)
   └─▶ Animation ticker "Analyse en cours..."

4. Résultat PARTIEL (hook)
   └─▶ Score global : 73/100
   └─▶ 3 points clés visibles
   └─▶ Reste flouté

5. CTA conversion
   └─▶ "Créez un compte pour voir le rapport complet"
   └─▶ Magic link (email)

6. Compte créé → Rapport complet débloqué
```

### Flow 2 : User Free → Upgrade Pro

```
1. User connecté, 2ème analyse dans le mois
   └─▶ "Vous avez utilisé votre analyse gratuite ce mois"

2. Modal upgrade
   └─▶ Comparatif Free vs Pro
   └─▶ CTA "Passer à Pro — 19€/mois"

3. Stripe Checkout
   └─▶ Paiement
   └─▶ Webhook → update subscription

4. Retour app → analyse débloquée
```

---

## 💰 Modèle de Monétisation

### Plans

| Feature | FREE | PRO (19€/mois) | BUSINESS (49€/mois) |
|---------|------|----------------|---------------------|
| CV Coach | 1/mois, partiel | Illimité, complet | Illimité + export PDF |
| Portfolio | 1 site, watermark | 3 sites, custom domain | Illimité + booking |
| Job Matching | 5 matchs/mois | Illimité + alertes | Auto-apply |
| LinkedIn | Score seul | Suggestions IA | Plan d'action 30j |
| Vault | 3 docs | Illimité | + versioning |
| E-Réputation | Score | Dashboard + actions | Analytics |
| Support | — | Email | Chat prioritaire |

### Tarifs annuels
- PRO : 149€/an (2 mois offerts)
- BUSINESS : 399€/an (2 mois offerts)

### Boutique (one-shot)
- Templates Portfolio Premium : 9-29€
- Packs CV sectoriels : 19€
- Audit CV par expert : 49-99€

---

## 📁 Structure Projet

```
souverain-web/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                 # Landing
│   │   │   ├── pricing/page.tsx         # Tarifs
│   │   │   └── about/page.tsx           # À propos
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx           # Magic link
│   │   │   ├── verify/page.tsx          # Vérification email
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (app)/
│   │   │   ├── layout.tsx               # Layout avec sidebar
│   │   │   ├── dashboard/page.tsx       # Home connecté
│   │   │   ├── cv/
│   │   │   │   ├── page.tsx             # Liste analyses
│   │   │   │   ├── new/page.tsx         # Upload CV
│   │   │   │   └── [id]/page.tsx        # Rapport détaillé
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx             # Liste portfolios
│   │   │   │   └── wizard/page.tsx      # Création
│   │   │   └── settings/page.tsx        # Paramètres compte
│   │   │
│   │   ├── api/
│   │   │   ├── cv/
│   │   │   │   ├── upload/route.ts      # Upload PDF
│   │   │   │   ├── analyze/route.ts     # Lancer analyse
│   │   │   │   └── [id]/route.ts        # Get rapport
│   │   │   ├── auth/
│   │   │   │   └── callback/route.ts    # Supabase callback
│   │   │   └── stripe/
│   │   │       ├── checkout/route.ts    # Créer session
│   │   │       └── webhook/route.ts     # Sync abo
│   │   │
│   │   ├── report/[id]/page.tsx         # Rapport public (partage)
│   │   ├── layout.tsx                   # Root layout
│   │   ├── globals.css                  # Tailwind + CALM-UI
│   │   └── providers.tsx                # Context providers
│   │
│   ├── components/
│   │   ├── ui/                          # CALM-UI components
│   │   │   ├── CalmCard.tsx
│   │   │   ├── CalmModal.tsx
│   │   │   ├── GlassForms.tsx
│   │   │   ├── ScoreGauge.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── cv/
│   │   │   ├── CVUploader.tsx           # Drag & drop
│   │   │   ├── AnalysisTicker.tsx       # Animation processing
│   │   │   ├── ScoreCard.tsx            # Score principal
│   │   │   ├── ReportView.tsx           # Rapport complet
│   │   │   └── ShareCard.tsx            # OG image preview
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   │
│   │   └── marketing/
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── Pricing.tsx
│   │       └── CTA.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                # Browser client
│   │   │   ├── server.ts                # Server client
│   │   │   └── middleware.ts            # Auth middleware
│   │   │
│   │   ├── ai/
│   │   │   ├── mistral.ts               # Anonymisation
│   │   │   ├── deepseek.ts              # Analyse
│   │   │   ├── anonymizer.ts            # Logic anonymisation
│   │   │   └── prompts/
│   │   │       ├── anonymize.ts
│   │   │       └── cv-analysis.ts       # Prompt V5 BMAD
│   │   │
│   │   ├── stripe.ts                    # Stripe helpers
│   │   ├── pdf.ts                       # Extraction texte
│   │   └── utils.ts                     # Helpers
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSubscription.ts
│   │   └── useToast.ts
│   │
│   └── types/
│       ├── database.ts                  # Types Supabase
│       ├── cv.ts                        # Types CV/Analyse
│       └── subscription.ts
│
├── public/
│   ├── og-image.png                     # Image partage social
│   └── templates/                       # Templates portfolio
│
├── supabase/
│   └── migrations/
│       ├── 001_users.sql
│       ├── 002_cv_analyses.sql
│       ├── 003_subscriptions.sql
│       └── 004_portfolios.sql
│
├── tailwind.config.ts                   # CALM-UI tokens
├── middleware.ts                        # i18n + auth
└── .env.local                           # Secrets
```

---

## 🎨 Design System — CALM-UI → Tailwind

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          elevated: 'var(--bg-elevated)',
        },
        // Text
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
        },
        // Accent (bleu)
        accent: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          lighter: '#60A5FA',
          muted: '#DBEAFE',
        },
        // Semantic
        success: { DEFAULT: '#16A34A', bg: '#DCFCE7' },
        warning: { DEFAULT: '#CA8A04', bg: '#FEF9C3' },
        error: { DEFAULT: '#DC2626', bg: '#FEE2E2' },
        info: { DEFAULT: '#2563EB', bg: '#DBEAFE' },
        // Score colors
        score: {
          excellent: '#16A34A',
          good: '#22C55E',
          average: '#EAB308',
          poor: '#F97316',
          critical: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}

export default config
```

### globals.css (CSS Variables)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Light mode */
  --bg-primary: #FAFAFA;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #F5F5F5;
  --bg-elevated: #FFFFFF;
  
  --text-primary: #1A1A1A;
  --text-secondary: #4A4A4A;
  --text-tertiary: #717171;
  --text-muted: #9E9E9E;
  
  --border-light: #E8E8E8;
  --border-default: #D4D4D4;
}

.dark {
  --bg-primary: #0F0F0F;
  --bg-secondary: #171717;
  --bg-tertiary: #1F1F1F;
  --bg-elevated: #262626;
  
  --text-primary: #F5F5F5;
  --text-secondary: #A3A3A3;
  --text-tertiary: #737373;
  --text-muted: #525252;
  
  --border-light: #262626;
  --border-default: #333333;
}

/* Glassmorphism utility */
.glass {
  @apply bg-bg-secondary/70 backdrop-blur-glass border border-[var(--border-light)];
}

.dark .glass {
  @apply bg-bg-secondary/60;
}
```

---

## 📊 Base de Données (Supabase)

### Tables

```sql
-- 001_users.sql (extension de auth.users)
create table public.profiles (
  id uuid references auth.users(id) primary key,
  email text,
  full_name text,
  avatar_url text,
  locale text default 'fr',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- 002_cv_analyses.sql
create table cv_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  file_path text not null,
  file_name text,
  raw_text text,
  anonymized_text text,
  anonymization_map jsonb,        -- {"[P1]": "Jean Dupont", "[E1]": "jean@mail.com"}
  status text default 'pending',  -- pending, anonymizing, analyzing, done, error
  created_at timestamptz default now()
);

create table cv_results (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid references cv_analyses(id) on delete cascade,
  score_global int,
  scores jsonb,                   -- {technique: 85, experience: 72, ...}
  diagnostic jsonb,               -- {metier, secteur, niveau, ...}
  forces jsonb,                   -- ["Point fort 1", ...]
  faiblesses jsonb,
  recommandations jsonb,
  raw_response jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table cv_analyses enable row level security;
create policy "Users can view own analyses" on cv_analyses
  for select using (auth.uid() = user_id);
create policy "Users can insert own analyses" on cv_analyses
  for insert with check (auth.uid() = user_id);

alter table cv_results enable row level security;
create policy "Users can view own results" on cv_results
  for select using (
    analysis_id in (select id from cv_analyses where user_id = auth.uid())
  );

-- 003_subscriptions.sql
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free',       -- free, pro, business
  status text,                    -- active, canceled, past_due
  current_period_end timestamptz,
  analyses_used_this_month int default 0,
  analyses_reset_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table subscriptions enable row level security;
create policy "Users can view own subscription" on subscriptions
  for select using (auth.uid() = user_id);

-- 004_portfolios.sql (Phase 2)
create table portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  slug text unique,               -- username.careercare.io/slug
  title text,
  data jsonb,                     -- Contenu du portfolio
  template text default 'glassmorphism',
  published boolean default false,
  custom_domain text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 🔑 Variables d'Environnement

```env
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# AI
MISTRAL_API_KEY=xxx
DEEPSEEK_API_KEY=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_PRICE_PRO_MONTHLY=price_xxx
STRIPE_PRICE_PRO_YEARLY=price_xxx
STRIPE_PRICE_BUSINESS_MONTHLY=price_xxx
STRIPE_PRICE_BUSINESS_YEARLY=price_xxx

# App
NEXT_PUBLIC_APP_URL=https://careercare.io
```

---

## 📋 Checklist RGPD

- [ ] Supabase région **EU (Frankfurt)**
- [ ] Page `/privacy` — Politique de confidentialité
- [ ] Page `/terms` — CGU/CGV
- [ ] Cookie banner avec Consent Mode
- [ ] Checkbox inscription : "J'accepte les CGU..."
- [ ] Bouton "Exporter mes données" (JSON)
- [ ] Bouton "Supprimer mon compte"
- [ ] Mention dans privacy : données anonymisées vers DeepSeek
- [ ] Chiffrement transit (HTTPS) — auto Vercel
- [ ] Pas de données perso dans les logs

---

## 🚀 Roadmap Exécution

### Semaine 1 — Fondations
- [ ] Configurer Supabase (projet EU)
- [ ] Setup Auth (Magic Link)
- [ ] Landing page (Hero, Features, CTA)
- [ ] Tailwind config CALM-UI
- [ ] Deploy Vercel

### Semaine 2 — Upload CV
- [ ] Page upload (`/cv/new`)
- [ ] Composant CVUploader (drag & drop)
- [ ] API route upload → Supabase Storage
- [ ] Extraction texte PDF (pdf-parse)

### Semaine 3 — Pipeline IA
- [ ] Service Mistral (anonymisation)
- [ ] Service DeepSeek (analyse)
- [ ] Prompt V5 BMAD migré
- [ ] API route `/api/cv/analyze`
- [ ] Gestion erreurs + retry

### Semaine 4 — Rapport
- [ ] Page rapport (`/cv/[id]`)
- [ ] Composants: ScoreGauge, ScoreCard, ReportView
- [ ] Page publique (`/report/[id]`)
- [ ] OG image dynamique
- [ ] Partage social

### Semaine 5 — Monétisation
- [ ] Intégration Stripe
- [ ] Plans Free/Pro/Business
- [ ] Paywall (limite 1 analyse/mois)
- [ ] Modal upgrade
- [ ] Webhooks sync

### Semaine 6 — Polish & Launch
- [ ] SEO (meta, sitemap, robots)
- [ ] Analytics (Plausible)
- [ ] Emails transactionnels
- [ ] Pages légales (privacy, terms)
- [ ] Tests E2E
- [ ] Product Hunt prep

---

## 📦 Assets à Migrer

Depuis le repo `FiTiTan/SOUVERAIN` (branche `perf-optimization-phase1`) :

| Source | Destination | Usage |
|--------|-------------|-------|
| `groq-client.cjs` (lignes 20-200) | `lib/ai/prompts/cv-analysis.ts` | Prompt V5 BMAD |
| `src/services/profileContextDetector.ts` | `lib/profile-context.ts` | Détection type profil |
| `src/services/anonymizationService.ts` | `lib/ai/anonymizer.ts` | Logique anonymisation |
| `templates/*.html` | `public/templates/` | Templates portfolio |
| CALM-UI.md | `tailwind.config.ts` + `globals.css` | Design tokens |

---

## 🎯 Critères de Succès MVP

| Métrique | Cible S6 |
|----------|----------|
| Landing → Upload | >15% conversion |
| Upload → Compte | >40% conversion |
| Compte → Pro | >3% |
| Temps analyse | <30s |
| Bugs critiques | 0 |
| Lighthouse score | >90 |

---

## 📝 Instructions pour Sonnet

1. **Lire ce fichier en entier** avant de coder
2. **Suivre la structure projet** exactement
3. **Utiliser CALM-UI** tokens (pas inventer des couleurs)
4. **Tester chaque feature** avant de passer à la suivante
5. **Commiter souvent** avec messages clairs
6. **Demander si doute** — ne pas inventer

### Priorités
1. Landing qui convertit
2. Upload qui marche
3. Analyse qui impressionne
4. Paiement qui encaisse

### Anti-patterns à éviter
- ❌ Over-engineering (faire simple)
- ❌ Composants non utilisés
- ❌ Console.log en prod
- ❌ Données perso dans les logs
- ❌ Skip les tests

---

*Document généré par Opus — 2026-02-05*
*Prêt pour exécution par Sonnet*
