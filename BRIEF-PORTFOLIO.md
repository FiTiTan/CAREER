# BRIEF COMPLET — Portfolio Maître SOUVERAIN → CareerCare

> **Document de référence pour Clawdbot (Claude Code)**
> Compilé le 2026-02-06 par Opus depuis l'historique complet du projet SOUVERAIN
> Objectif : Transposer le module Portfolio Maître de l'app desktop Electron vers la web app CareerCare (Next.js)

---

## 1. VISION DU MODULE PORTFOLIO

Le Portfolio Maître est un **générateur de sites portfolio professionnels** piloté par IA. L'utilisateur fournit ses infos (métier, services, réalisations, médias) via un wizard guidé, choisit un template, et l'IA génère un site web complet et personnalisé.

**Positionnement** : Un plombier, un coffee shop ou un avocat obtient un site pro en 15 minutes, sans savoir coder. L'IA adapte automatiquement le ton, le vocabulaire et les sections au métier détecté.

---

## 2. PARCOURS UTILISATEUR — WIZARD 8 ÉTAPES

```
ÉTAPE 1    ÉTAPE 2    ÉTAPE 3    ÉTAPE 4    ÉTAPE 5         ÉTAPE 6      ÉTAPE 7     ÉTAPE 8
Identité → Offre   → Contact → Contenu  → Template      → Génération → Édition  → Export
                                              │                                       │
                                    ┌─────────┴─────────┐                            │
                                    │ Gratuits (5)      │                            ▼
                                    │ Achetés (N)       │                    ┌───────────────┐
                                    │ Boutique (4,99€)  │                    │ HTML / PDF    │
                                    └───────────────────┘                    │ Hébergement   │
                                                                             │ (sous-domaine)│
                                                                             └───────────────┘
```

### Étape 1 : À Propos (Identité)

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1 : À PROPOS                                              │
├─────────────────────────────────────────────────────────────────┤
│  • Choix: Personne 👤 ou Lieu 📍                                │
│  • Import sources (LinkedIn, site web, PDF) — optionnel         │
│  • Nom / Nom du lieu                                            │
│  • Activité / Métier (déclenche la détection profileContext)    │
│  • Slogan (+ bouton IA ✨ pour suggestions)                     │
│  • Ce qui vous différencie (+ bouton IA ✨)                     │
│  • 3 Expertises / Spécialités                                   │
│  • Réseaux sociaux (grille toggle ON/OFF)                       │
└─────────────────────────────────────────────────────────────────┘
```

### Étape 2 : Offre (Services / Spécialités)

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2 : OFFRE                                                 │
├─────────────────────────────────────────────────────────────────┤
│  • 3 services/spécialités minimum                               │
│  • Labels dynamiques selon profileContext                       │
│  • Proposition de valeur                                        │
│  • Bouton IA ✨ pour générer des services depuis le profil      │
└─────────────────────────────────────────────────────────────────┘
```

### Étape 3 : Contact

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3 : CONTACT                                               │
├─────────────────────────────────────────────────────────────────┤
│  • Email (requis)                                               │
│  • Téléphone (optionnel)                                        │
│  • Adresse (optionnel — pertinent pour "Lieu")                  │
│  • Horaires d'ouverture (optionnel — pertinent pour "Lieu")     │
└─────────────────────────────────────────────────────────────────┘
```

### Étape 4 : Contenu (Documents & Réalisations)

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4 : CONTENU                                               │
├─────────────────────────────────────────────────────────────────┤
│  • Upload PDF/TXT (extraction automatique du texte)             │
│  • Import depuis URL / LinkedIn (optionnel)                     │
│  • Ajout manuel de réalisations :                               │
│    - Titre                                                      │
│    - Description                                                │
│    - Catégorie                                                  │
│    - Image (optionnel)                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Étape 5 : Choix du Template

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5 : TEMPLATE                                              │
├─────────────────────────────────────────────────────────────────┤
│  Onglets : [Gratuits] [Mes achats] [Boutique]                   │
│                                                                  │
│  Grille de cards avec :                                         │
│  - Thumbnail 400×300                                            │
│  - Nom du template                                              │
│  - Bouton "Preview" (ouvre modal iframe)                        │
│  - Badge "Gratuit" ou prix "4,99€"                              │
│                                                                  │
│  Template sélectionné : [nom] ✓                                 │
│                                                                  │
│  [← Retour]                          [Générer mon portfolio →]  │
└─────────────────────────────────────────────────────────────────┘
```

### Étape 6 : Génération IA

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6 : GÉNÉRATION                                            │
├─────────────────────────────────────────────────────────────────┤
│  Pipeline :                                                     │
│  1. Anonymisation des données perso (si activé)                 │
│  2. Envoi au LLM (DeepSeek) avec le prompt d'enrichissement    │
│  3. Injection des données enrichies dans le template HTML       │
│  4. Remplacement des marqueurs {{...}}                          │
│  5. Gestion des sections conditionnelles (IF/ENDIF)             │
│  6. Gestion des zones répétables (REPEAT/END REPEAT)            │
│                                                                  │
│  UX : Animation "orbe IA" + étapes de progression               │
└─────────────────────────────────────────────────────────────────┘
```

### Étape 7 : Preview & Édition

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 7 : PREVIEW                                               │
├─────────────────────────────────────────────────────────────────┤
│  - Iframe avec le portfolio généré                              │
│  - Drag & drop images sur les zones placeholder                 │
│  - Texte éditable en ligne (contenteditable)                    │
│  - Bouton "AI Rewrite" (premium) pour reformuler               │
│                                                                  │
│  [← Modifier]               [Exporter →]                       │
└─────────────────────────────────────────────────────────────────┘
```

### Étape 8 : Export

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 8 : EXPORT                                                │
├─────────────────────────────────────────────────────────────────┤
│  Options :                                                      │
│  - Télécharger HTML (gratuit)                                   │
│  - Exporter PDF (Pro)                                           │
│  - Publier sur sous-domaine username.careercare.io (Pro)        │
│  - Connecter un domaine custom (Business)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. SYSTÈME DE TYPES

### ProfileType & ProfileContext

```typescript
type ProfileType = 'person' | 'place';

type ProfileContext =
  | 'food'      // Restaurant, café, boulangerie...
  | 'retail'    // Boutique, fleuriste, librairie...
  | 'artisan'   // Plombier, électricien, menuisier...
  | 'service'   // Avocat, coach, comptable...
  | 'tech'      // Développeur, designer, graphiste...
  | 'niche';    // Tatoueur, DJ, sophrologue...
```

### Détection automatique du ProfileContext

L'utilisateur tape son métier/activité → l'IA détecte le contexte :

```typescript
// Input: "Coffee shop" → { context: 'food', confidence: 'high', isPlace: true }
// Input: "Développeur Full-Stack" → { context: 'tech', confidence: 'high', isPlace: false }
// Input: "Plombier" → { context: 'artisan', confidence: 'high', isPlace: false }
// Input: "Avocat" → { context: 'service', confidence: 'high', isPlace: false }
```

### Labels dynamiques selon profileContext

```typescript
const PORTFOLIO_LABELS = {
  tech: {
    services: 'Services',
    realisations: 'Projets',
    realisationsSubtitle: 'Découvrez mes réalisations',
  },
  service: {
    services: "Domaines d'intervention",
    realisations: 'Références',
    realisationsSubtitle: 'Quelques cas accompagnés',
  },
  artisan: {
    services: 'Prestations',
    realisations: 'Réalisations',
    realisationsSubtitle: 'Nos derniers travaux',
  },
  food: {
    services: 'Nos spécialités',
    realisations: 'Nos plats signatures',
    realisationsSubtitle: 'Découvrez notre carte',
  },
  retail: {
    services: 'Nos services',
    realisations: 'Nos produits',
    realisationsSubtitle: 'Notre sélection',
  },
  junior: {
    services: 'Compétences',
    realisations: 'Expériences & Projets',
    realisationsSubtitle: 'Mon parcours',
  },
  default: {
    services: 'Services',
    realisations: 'Réalisations',
    realisationsSubtitle: 'Découvrez notre travail',
  },
};
```

### Données du formulaire wizard

```typescript
interface PortfolioFormDataV2 {
  portfolioId: string;
  name: string;
  profileType: 'person' | 'place' | null;
  profileContext: ProfileContext | null;
  title: string;               // Métier / Activité
  expertises: string[];        // 3 spécialités
  tagline: string;             // Slogan / Accroche
  valueProp: string;           // Proposition de valeur
  email: string;
  phone: string;
  address: string;
  openingHours: string;
  importSources: ImportSource[];
  socialLinks: { platform: string; url: string }[];
  realisations: {
    title: string;
    description: string;
    category: string;
    image?: string;
  }[];
  media: Media[];
  imageAssignments: Record<string, string>; // zone → dataUrl
  templateId: string | null;
}
```

### Données enrichies par l'IA (output)

```typescript
interface EnrichedPortfolioData {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  heroCta: string;

  // About
  aboutText: string;        // 500-800 mots, enrichi par IA
  aboutImage?: string;
  valueProp: string;

  // Services (générés/enrichis par IA)
  services: {
    title: string;
    description: string;
    icon?: string;          // SVG inline (pas d'émojis !)
  }[];
  servicesLabel: string;    // Dynamique selon profileContext

  // Projects/Réalisations
  projects: {
    title: string;
    description: string;
    category: string;
    image?: string;
    link?: string;
  }[];

  // Contact
  email: string;
  phone?: string;
  address?: string;
  openingHours?: string;

  // Social
  socialLinks: {
    platform: string;
    url: string;
    label: string;
  }[];
  socialIsMain: boolean;    // Si réseaux sociaux = showcase principal
}
```

---

## 4. TEMPLATES HTML

### 5 templates gratuits

| ID | Nom | Style | Idéal pour |
|----|-----|-------|------------|
| `bento-grid` | Bento Grid Layout | Cards asymétriques façon Apple, bords arrondis, ombres douces | Freelances, Créatifs, Tech |
| `kinetic-typo` | Kinetic Typography | Animations texte au scroll, typographie expressive | Créatifs, Artistes, Designers |
| `organic-flow` | Organic Flow | Formes organiques, courbes douces, palette nature | Artisans, Thérapeutes, Bio |
| `glassmorphism` | Glassmorphism | Effet verre dépoli, transparences, blur | Tech, Startups, Modernes |
| `minimal-apple` | Minimal Apple | Ultra épuré, beaucoup de blanc, typo élégante | Avocats, Consultants, Premium |

### Templates premium (boutique)

| ID | Nom | Prix | Style |
|----|-----|------|-------|
| `brutalism` | Brutalism Elevated | 4,99€ | Typographie brute, contrastes forts |
| `retro-revival` | Retro Revival | 4,99€ | Vintage modernisé, grain photo |
| `museumcore` | Museumcore | 4,99€ | Galerie d'art, espacement généreux |

### Structure d'un template

Chaque template est un fichier HTML autonome avec :

```
templates/portfolio/free/bento-grid/
├── template.html     # HTML complet avec marqueurs {{...}}
├── meta.json         # Métadonnées (nom, tags, idealFor, prix)
└── thumbnail.png     # Screenshot 400×300 (ou 800×600 retina)
```

### meta.json exemple

```json
{
  "id": "bento-grid",
  "name": "Bento Grid Layout",
  "description": "Organisation modulaire façon Apple, cards asymétriques avec bords arrondis",
  "category": "free",
  "price": 0,
  "version": "1.0.0",
  "author": "CareerCare",
  "tags": ["moderne", "minimaliste", "tech", "freelance"],
  "idealFor": ["Freelances", "Créatifs", "Tech"],
  "sections": {
    "obligatoires": ["hero", "about", "services", "contact"],
    "optionnelles": ["projects", "testimonials", "social_showcase", "practical_info"]
  }
}
```

### Registre central : index.json

```json
{
  "version": "1.0.0",
  "templates": {
    "free": [
      { "id": "bento-grid", "path": "free/bento-grid", "name": "Bento Grid Layout" },
      { "id": "kinetic-typo", "path": "free/kinetic-typo", "name": "Kinetic Typography" },
      { "id": "organic-flow", "path": "free/organic-flow", "name": "Organic Flow" },
      { "id": "glassmorphism", "path": "free/glassmorphism", "name": "Glassmorphism" },
      { "id": "minimal-apple", "path": "free/minimal-apple", "name": "Minimal Apple" }
    ],
    "premium": [
      { "id": "brutalism", "path": "premium/brutalism", "name": "Brutalism Elevated", "price": 4.99 }
    ]
  }
}
```

---

## 5. FORMAT DES TEMPLATES HTML — CONVENTIONS DE MARQUAGE

### Marqueurs de contenu dynamique

```
{{HERO_TITLE}}          → Titre principal (nom ou nom du lieu)
{{HERO_SUBTITLE}}       → Sous-titre / accroche (tagline)
{{HERO_EYEBROW}}        → Sur-titre (métier/titre)
{{HERO_CTA_TEXT}}       → Texte du bouton CTA ("Me contacter")
{{HERO_IMAGE}}          → URL/dataUrl image hero

{{ABOUT_TEXT}}          → Texte de présentation (enrichi par IA, 500-800 mots)
{{ABOUT_IMAGE}}         → URL/dataUrl image about
{{VALUE_PROP}}          → Proposition de valeur

{{SERVICE_TITLE}}       → Titre d'un service (dans une zone REPEAT)
{{SERVICE_DESC}}        → Description d'un service

{{PROJECT_TITLE}}       → Titre d'un projet/réalisation
{{PROJECT_DESC}}        → Description
{{PROJECT_CATEGORY}}    → Catégorie
{{PROJECT_IMAGE}}       → Image

{{TESTIMONIAL_TEXT}}    → Texte d'un témoignage
{{TESTIMONIAL_AUTHOR}}  → Auteur
{{TESTIMONIAL_ROLE}}    → Rôle/entreprise

{{CONTACT_EMAIL}}       → Email
{{CONTACT_PHONE}}       → Téléphone
{{CONTACT_ADDRESS}}     → Adresse
{{OPENING_HOURS}}       → Horaires d'ouverture

{{SOCIAL_PLATFORM}}     → Nom du réseau
{{SOCIAL_URL}}          → URL du profil

{{CURRENT_YEAR}}        → Année en cours
```

### Commentaires de section

```html
<!-- SECTION: hero (OBLIGATOIRE) -->
<section class="hero">...</section>

<!-- SECTION: services (OPTIONNEL - supprimer si non pertinent) -->
<section class="services">...</section>
```

### Zones répétables

```html
<!-- REPEAT: services -->
<div class="service-card">
  <h3>{{SERVICE_TITLE}}</h3>
  <p>{{SERVICE_DESC}}</p>
</div>
<!-- END REPEAT: services -->
```

### Contenu conditionnel

```html
<!-- IF: has_phone -->
<a href="tel:{{CONTACT_PHONE}}">{{CONTACT_PHONE}}</a>
<!-- ENDIF: has_phone -->

<!-- IF: hasHeroImage -->
<img src="{{HERO_IMAGE}}" alt="{{HERO_TITLE}}">
<!-- ENDIF: hasHeroImage -->
<!-- IF: NOT hasHeroImage -->
<div class="hero-visual-placeholder">
  <svg>...</svg>
</div>
<!-- ENDIF: NOT hasHeroImage -->
```

### Protection du style

```html
<style>
/* ========== NE PAS MODIFIER - STYLE PROTÉGÉ ========== */
:root { ... }
body { ... }
/* ========== FIN STYLE PROTÉGÉ ========== */
</style>
```

---

## 6. PIPELINE DE GÉNÉRATION (IA)

### Architecture SOUVERAIN (Electron — ancien)

```
Données wizard → Anonymisation (Ollama local) → Enrichissement (Groq/DeepSeek) → Injection template → Preview
```

### Architecture CareerCare (Web — nouveau)

```
Données wizard → API /api/portfolio/generate (POST)
                    → Enrichissement (DeepSeek V3 — données non-perso, pas besoin d'anonymiser)
                    → Injection des marqueurs {{...}} dans le template HTML
                    → Sauvegarde en base (table portfolios, champ data JSONB)
                    → Retour HTML généré au client
```

**Note importante** : Contrairement au module CV Coach qui manipule des données personnelles (nom, email, téléphone), le module Portfolio n'a PAS BESOIN d'anonymisation puisque l'objectif est justement de publier ces infos. L'IA enrichit le CONTENU (texte about, descriptions de services), pas les données perso.

### Prompt d'enrichissement (DeepSeek)

Le prompt reçoit les données du wizard et doit :
1. Générer un texte "About" riche (500-800 mots) adapté au profileContext
2. Enrichir les descriptions de services
3. Générer des descriptions de réalisations si incomplètes
4. Adapter le ton au métier (formel pour avocat, chaleureux pour resto, technique pour dev)
5. Retourner un JSON structuré (EnrichedPortfolioData)

```
Prompt système :
"Tu es un expert en création de portfolios professionnels.
CONTEXTE DU PROFIL : ${profileContext}
- Si "tech" : vocabulaire technique, projets, technologies
- Si "food" : vocabulaire cuisine, plats, ambiance
- Si "service" : vocabulaire professionnel, cas clients, expertise
- Si "artisan" : vocabulaire métier, savoir-faire, avant/après
RÈGLES :
1. Adapte le TON au contexte
2. Utilise le VOCABULAIRE approprié au secteur
3. N'invente PAS de réalisations si non fournies
4. Pas d'émojis dans le contenu
5. Retourne UNIQUEMENT le JSON"
```

### Service d'injection (templateInjector)

Le service prend le template HTML + les données enrichies et :
1. Remplace tous les `{{MARQUEUR}}` par les valeurs réelles
2. Traite les `<!-- REPEAT: ... -->` en dupliquant le bloc pour chaque item
3. Traite les `<!-- IF: ... -->` / `<!-- ENDIF: ... -->` (afficher/masquer)
4. Injecte les images (dataUrl ou URL Supabase Storage)
5. Remplace `{{CURRENT_YEAR}}` par l'année en cours
6. Nettoie les marqueurs non remplacés

---

## 7. ADAPTATION POUR CAREERCARE (WEB)

### Ce qui change vs SOUVERAIN desktop

| Aspect | SOUVERAIN (Electron) | CareerCare (Next.js) |
|--------|---------------------|----------------------|
| Stockage templates | Filesystem local | `public/templates/` ou Supabase Storage |
| Stockage images | Filesystem + SQLite | Supabase Storage |
| IA locale | Ollama (Llama 3.2) | ❌ Supprimé |
| IA cloud | Groq / DeepSeek (via renderer) | DeepSeek (via API route serveur) |
| Anonymisation | BERT local → Ollama | ❌ Pas nécessaire pour Portfolio |
| Preview | Electron webview | iframe ou page Next.js |
| Export HTML | Filesystem local | Download ou hébergement sous-domaine |
| Hébergement | ❌ Pas possible | `username.careercare.io/slug` |
| Paiement templates | ❌ Non implémenté | Stripe (one-shot 4,99€) |
| Base de données | SQLite local chiffré | Supabase PostgreSQL |

### Table `portfolios` (déjà dans le schema)

```sql
create table portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  slug text unique,                    -- username.careercare.io/slug
  title text,
  data jsonb,                          -- Contenu enrichi (EnrichedPortfolioData)
  template text default 'glassmorphism', -- ID du template utilisé
  published boolean default false,
  custom_domain text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Routes API à créer

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/portfolio/generate` | POST | Enrichit les données wizard via DeepSeek + injecte dans template |
| `/api/portfolio/save` | POST | Sauvegarde le portfolio en base |
| `/api/portfolio/[id]` | GET | Récupère un portfolio |
| `/api/portfolio/publish` | POST | Publie sur le sous-domaine |
| `/portfolio/[slug]` | GET (page) | Page publique du portfolio |

### Pages à créer

| Page | Route | Description |
|------|-------|-------------|
| Liste portfolios | `/dashboard/portfolio` | Mes portfolios (cards avec status) |
| Wizard création | `/dashboard/portfolio/wizard` | Wizard 8 étapes |
| Preview/Édition | `/dashboard/portfolio/[id]/edit` | Preview iframe + édition inline |
| Page publique | `/p/[slug]` | Portfolio publié (SSR pour SEO) |

### Stockage des templates dans Next.js

```
public/
└── templates/
    └── portfolio/
        ├── index.json              # Registre central
        ├── free/
        │   ├── bento-grid/
        │   │   ├── template.html
        │   │   ├── meta.json
        │   │   └── thumbnail.png
        │   ├── kinetic-typo/
        │   ├── organic-flow/
        │   ├── glassmorphism/
        │   └── minimal-apple/
        └── premium/
            ├── brutalism/
            └── ...
```

---

## 8. PRIORITÉS D'IMPLÉMENTATION

### Phase 1 : MVP Wizard (Semaine 1-2)
- [ ] Page `/dashboard/portfolio` (liste vide + CTA "Créer")
- [ ] Wizard 5 étapes simplifiées (Identité + Offre + Contact + Template + Génération)
- [ ] 2 templates gratuits (bento-grid + glassmorphism)
- [ ] Enrichissement DeepSeek (prompt basique)
- [ ] Injection template côté serveur
- [ ] Sauvegarde en base

### Phase 2 : Preview & Publish (Semaine 3)
- [ ] Preview iframe
- [ ] Édition inline (contenteditable)
- [ ] Publication sur `/p/[slug]`
- [ ] SEO (meta OG, sitemap)

### Phase 3 : Full Templates + Boutique (Semaine 4)
- [ ] 5 templates gratuits complets
- [ ] Boutique templates premium (Stripe one-shot)
- [ ] Export PDF
- [ ] Custom domain (Business plan)

---

## 9. RÈGLES STRICTES

1. **Pas d'émojis dans le contenu généré** — utiliser des SVG pour les icônes
2. **Labels dynamiques** — toujours adapter selon profileContext
3. **Protection CSS** — l'IA NE DOIT JAMAIS modifier le style du template
4. **Images optionnelles** — toujours prévoir un placeholder SVG si pas d'image
5. **Responsive** — tous les templates doivent fonctionner mobile
6. **SEO** — meta title, description, OG image pour les portfolios publiés
7. **RGPD** — bouton "Supprimer mon portfolio" qui supprime tout (base + storage)

---

*Brief compilé par Opus depuis 19+ sessions de développement SOUVERAIN*
*Prêt pour exécution par Clawdbot sur le repo CareerCare*
