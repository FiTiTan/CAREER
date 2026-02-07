# CareerCare - Rollout Final Nuit 5-6 Février 2026

## 🎉 CONFIGURATION COMPLÈTE !

✅ **Supabase** (EU Frankfurt)
✅ **Mistral AI** (anonymisation)
✅ **DeepSeek** (analyse)
✅ **Vercel** (hébergement)

---

## 🚀 Plan d'Exécution Autonome (6-8h)

### Phase 0 : Setup Supabase & Base (1h30)
**Durée estimée : 22h35 - 00h05**

- [ ] Créer migrations SQL
  - [ ] `001_users.sql` - Extension profiles
  - [ ] `002_cv_analyses.sql` - Table analyses + results
  - [ ] `003_subscriptions.sql` - Table abonnements
- [ ] Configurer Storage bucket `cvs`
- [ ] Policies RLS (Row Level Security)
- [ ] Créer clients Supabase
  - [ ] `lib/supabase/client.ts` (browser)
  - [ ] `lib/supabase/server.ts` (server)
- [ ] Types TypeScript depuis Supabase

---

### Phase 1 : Services IA RGPD-Compliant (2h)
**Durée estimée : 00h05 - 02h05**

#### Service Mistral (anonymisation)
- [ ] `lib/ai/mistral.ts`
  - [ ] Client Mistral
  - [ ] `anonymizeText(text)` → texte anonyme + map
  - [ ] `deanonymizeText(text, map)` → texte original

#### Service DeepSeek (analyse)
- [ ] `lib/ai/deepseek.ts`
  - [ ] Client DeepSeek
  - [ ] `analyzeCV(anonymizedText)` → résultat anonyme

#### Prompt V5 Migré
- [ ] `lib/ai/prompts/cv-analysis.ts`
  - [ ] Copier depuis SOUVERAIN `groq-client.cjs`
  - [ ] Adapter pour DeepSeek
  - [ ] Prompt système + user

#### Pipeline Complet
- [ ] `lib/ai/pipeline.ts`
  - [ ] `analyzeCVComplete(rawText)`
    1. Mistral anonymise
    2. DeepSeek analyse
    3. Mistral dé-anonymise
    4. Return résultat final

---

### Phase 2 : Upload & Extraction (1h30)
**Durée estimée : 02h05 - 03h35**

#### Extraction PDF
- [ ] `lib/pdf.ts`
  - [ ] Install `pdf-parse`
  - [ ] `extractTextFromPDF(buffer)` → text

#### Page Upload
- [ ] `app/(app)/cv/new/page.tsx`
  - [ ] Layout avec sidebar
  - [ ] Import CVUploader

#### Composant CVUploader
- [ ] `components/cv/CVUploader.tsx`
  - [ ] Drag & drop zone
  - [ ] Validation PDF (<5MB)
  - [ ] États (idle, uploading, success, error)
  - [ ] Animation ticker pendant analyse

#### API Upload
- [ ] `app/api/cv/upload/route.ts`
  - [ ] Validation file
  - [ ] Upload vers Supabase Storage
  - [ ] Extraction texte
  - [ ] Insert DB (status: pending)
  - [ ] Return CV ID

---

### Phase 3 : Analyse CV (1h30)
**Durée estimée : 03h35 - 05h05**

#### API Analyze
- [ ] `app/api/cv/analyze/route.ts`
  - [ ] Get CV by ID
  - [ ] Call pipeline.analyzeCVComplete()
  - [ ] Parse résultat JSON
  - [ ] Insert cv_results table
  - [ ] Update cv_analyses status: done

#### Types
- [ ] `types/cv.ts`
  - [ ] CVAnalysis
  - [ ] CVResult
  - [ ] Score types
  - [ ] Diagnostic types

---

### Phase 4 : UI Rapport (1h30)
**Durée estimée : 05h05 - 06h35**

#### Composants Score
- [ ] `components/cv/ScoreGauge.tsx`
  - [ ] Gauge circulaire animée
  - [ ] Props: score, color
  - [ ] SVG + CSS

- [ ] `components/cv/ScoreCard.tsx`
  - [ ] Card avec titre + valeur
  - [ ] Barre de progression
  - [ ] Colors selon score

#### Composant Rapport
- [ ] `components/cv/ReportView.tsx`
  - [ ] Header avec score global
  - [ ] Grille scores détaillés
  - [ ] Section diagnostic
  - [ ] Forces (green cards)
  - [ ] Faiblesses (orange cards)
  - [ ] Recommandations (checklist)

#### Page Rapport
- [ ] `app/(app)/cv/[id]/page.tsx`
  - [ ] Fetch CV + results
  - [ ] Layout avec sidebar
  - [ ] Import ReportView
  - [ ] Bouton partage

---

### Phase 5 : Pages Marketing & UI (1h)
**Durée estimée : 06h35 - 07h35**

#### Pages Marketing
- [ ] `app/(marketing)/pricing/page.tsx`
  - [ ] 3 tiers (Free, Pro, Business)
  - [ ] Toggle Mensuel/Annuel
  - [ ] Cards avec hover

- [ ] `app/(marketing)/about/page.tsx`
  - [ ] Mission CareerCare
  - [ ] Équipe (placeholder)
  - [ ] Contact

- [ ] `app/(marketing)/privacy/page.tsx`
  - [ ] Template RGPD
  - [ ] Sections : données, finalité, droits, cookies

- [ ] `app/(marketing)/terms/page.tsx`
  - [ ] CGU template
  - [ ] CGV (abonnements)

#### Composants UI Réutilisables
- [ ] `components/ui/Button.tsx`
- [ ] `components/ui/Card.tsx`
- [ ] `components/ui/Modal.tsx`
- [ ] `components/ui/Toast.tsx`
- [ ] `components/ui/Spinner.tsx`

---

### Phase 6 : Documentation (30min)
**Durée estimée : 07h35 - 08h05**

#### Docs
- [ ] `README.md`
  - [ ] Description projet
  - [ ] Stack technique
  - [ ] Installation locale
  - [ ] Déploiement

- [ ] `SETUP.md`
  - [ ] Prérequis
  - [ ] Configuration Supabase
  - [ ] Variables d'environnement
  - [ ] Migrations DB

- [ ] `.env.example`
  - [ ] Toutes les variables nécessaires
  - [ ] Commentaires explicatifs

- [ ] `CONTRIBUTING.md`
  - [ ] Guide contribution
  - [ ] Code style
  - [ ] Pull requests

---

## 📊 Tests & Validation

### Tests Manuels
- [ ] Upload PDF → doit réussir
- [ ] Extraction texte → doit retourner du texte
- [ ] Anonymisation → doit replacer noms/emails
- [ ] Analyse DeepSeek → doit retourner JSON
- [ ] Dé-anonymisation → doit restaurer données
- [ ] Affichage rapport → doit être joli

### Build
- [ ] `npm run build` → 0 erreur
- [ ] Types TypeScript → 0 erreur
- [ ] Lint → 0 warning critique

---

## 🎯 Livrable Final (8h du matin)

### ✅ Fonctionnel
- Upload CV (PDF)
- Analyse complète avec Mistral + DeepSeek
- Rapport interactif avec scores
- Pages marketing complètes
- Documentation

### ✅ Code Quality
- 0 erreur TypeScript
- Structure claire
- Services bien séparés
- Commentaires utiles

### ❌ Reste à faire (avec Jean-Louis)
- Auth (Magic Link)
- Stripe (paiements)
- Paywall (limites Free/Pro)
- Tests E2E
- Design review

---

## 📋 Critères de Succès

1. ✅ Jean-Louis peut uploader un CV
2. ✅ Le CV est analysé automatiquement
3. ✅ Le rapport s'affiche avec le score
4. ✅ Les données sont bien anonymisées (RGPD compliant)
5. ✅ Build Vercel réussi
6. ✅ 0 erreur TypeScript

---

**Estimation totale : 7-8h**
**Livraison : 6 Février 2026, 08h00 UTC**

🚀 **GO ! Je commence maintenant !**
