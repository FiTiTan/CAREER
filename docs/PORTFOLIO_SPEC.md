# Portfolio Maître - Spécification CareerCare

## Concept

Le **Portfolio Maître** est le hub central où l'utilisateur stocke toutes ses réalisations professionnelles. Contrairement au CV statique, le portfolio est vivant et permet de générer des présentations ciblées pour chaque candidature.

## Structure

### 1. Portfolio (conteneur principal)
- `id`, `user_id`, `title`, `tagline`
- `sector` (tech, marketing, finance, etc.)
- `status` (draft, published)
- `created_at`, `updated_at`

### 2. Projets/Réalisations
- `id`, `portfolio_id`
- `title`, `description`, `role`
- `company`, `start_date`, `end_date`
- `skills` (array de skills utilisées)
- `metrics` (résultats chiffrés)
- `media` (images, liens)
- `visibility` (public, private)

### 3. Compétences
- `id`, `portfolio_id`
- `name`, `category` (hard/soft)
- `level` (1-5)
- `years_experience`
- `proof_projects` (liens vers projets)

### 4. Certifications
- `id`, `portfolio_id`
- `name`, `issuer`, `date`
- `credential_url`, `credential_id`
- `expiry_date`

### 5. Témoignages
- `id`, `portfolio_id`
- `author_name`, `author_title`, `author_company`
- `content`, `date`
- `linkedin_url` (optionnel)

## Flux Utilisateur

1. **Création** : Wizard simplifié
   - Secteur → Profil de base → Import CV (optionnel)
   
2. **Enrichissement** : Ajout progressif
   - Projets avec médias
   - Compétences avec preuves
   - Certifications
   
3. **Export ciblé** : Pour une candidature
   - Sélection des projets pertinents
   - Mise en avant des skills demandées
   - Génération PDF/Web

## Intégration avec l'analyse CV

Après analyse d'un CV, proposer :
- Import automatique des compétences détectées
- Création de projets à partir des expériences
- Suggestions d'amélioration basées sur le diagnostic

## Pages à créer

- `/portfolio` - Dashboard portfolio
- `/portfolio/new` - Wizard création
- `/portfolio/[id]` - Vue/édition portfolio
- `/portfolio/[id]/projects` - Gestion projets
- `/portfolio/[id]/export` - Export ciblé
