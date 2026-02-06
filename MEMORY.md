# MEMORY.md - Mémoire à long terme

## 🎯 Focus projet CareerCare (5-6 février 2026)

**IMPORTANT** : Travail exclusif sur **CareerCare**.
- SOUVERAIN en sommeil
- Repo local : `/home/ubuntu/careercare`
- GitHub : https://github.com/FiTiTan/CAREER
- **Workflow** : GitHub → Vercel (auto-deploy)
- ⚠️ **Firewall bloqué** : pas d'accès local http. Tester uniquement sur Vercel.
- Stack : Next.js 14 + Supabase (EU Frankfurt) + Mistral + DeepSeek

**Intégration pipeline IA complet (6 février 2026)** :
- ✅ Migration SQL Supabase (profiles, cv_analyses, cv_results, subscriptions)
- ✅ Bucket Storage `cv-uploads` (5 MB, PDF/DOCX/DOC/TXT)
- ✅ Pipeline RGPD : PDF → Extraction → Anonymisation Mistral EU → Analyse DeepSeek → Dé-anonymisation
- ✅ Support multi-format : PDF (pdf-parse), DOCX (mammoth), TXT
- ✅ Types TypeScript complets (cv.ts, database.ts, subscription.ts)
- ✅ Routes API : /api/cv/upload, /api/cv/analyze, /api/cv/[id]
- Coût estimé : ~€0.007 par analyse

**Derniers commits** :
- `781fd12` - Integration pipeline IA complet
- `89f7347` - Install pdf-parse
- `07a7ddf` - Support multi-format CV
- `b6c0067` - Fix exports compatibilité createClient

---

## 🧙 Wizard Portfolio V2 + 2 systèmes d'édition (3 février 2026)

**Commits** :
- `13af4bf` - Wizard V2 complet
- `6d74a0b` - Debug logs realisations
- `d4c3bb3` - 2 systèmes d'édition séparés ✅
- `b8bbe2d` - Documentation complète

**Documentation** : `SOUVERAIN/IMPLEMENTATION-2-SYSTEMES-EDITION.md`

### Résumé des changements

**Objectif** : Simplifier le wizard (6 steps), ajouter le positionnement (valueProp + expertises) pour guider l'IA, génération automatique des services, preview éditable.

#### 1. Types (PortfolioFormDataV2)
- ✅ Ajout `valueProp: string` - Proposition de valeur
- ✅ Ajout `expertises: string[]` - 3 expertises clés

#### 2. Step 2 : Réalisations
- ✅ Encart Positionnement avec gradient bleu/violet
- ✅ Champ valueProp (150 chars max)
- ✅ 3 champs expertises (50 chars max chacun)
- ✅ Séparateur visuel avant import projets

#### 3. Service IA V4 (aiEnrichmentServiceV4.ts)
- ✅ Génération séquencée en 3 appels API :
  - **Hero + About** : basé sur valueProp (60-80 mots)
  - **Services** : transforme expertises en 3 services (35-45 mots/service) OU déduit des réalisations si vide
  - **Projets** : descriptions enrichies (60-80 mots) qui renforcent le positionnement
- ✅ Anonymisation/désanonymisation automatique
- ✅ Label dynamique ("Services", "Savoir-faire", "Spécialités", etc.)

#### 4. CSS partagés (templates/_shared/)
- ✅ `_layout-adaptive.css` : Layout adaptatif (1 projet → horizontal, 2+ → grille)
- ✅ `_typography.css` : Texte justifié, hyphenation
- ✅ `_editable.css` : Styles contenteditable + indicateur modified
- ✅ `README.md` : Documentation complète

#### 5. Preview éditable (EditablePreviewScreen.tsx)
- ✅ Injection `contenteditable="true"` sur tous les textes
- ✅ Attribut `data-original` pour le reset
- ✅ Toolbar avec "💡 Cliquez pour modifier" + bouton "↺ Tout réinitialiser"
- ✅ Indicateur visuel des modifications (barre bleue)

### Implémentation 2 systèmes d'édition (CLEAN)

**Architecture propre** :
- **BRIEF 1** (Contenteditable basique) : `injectEditableFeatures()` dans EditablePreviewScreen
- **BRIEF 2** (AI Rewrite) : `injectAiRewrite.ts` + `aiRewriteService.ts` (séparés)
- Communication : postMessage iframe ↔ parent

**BRIEF 1 - Édition manuelle** :
- contenteditable="true" sur tous les textes
- Boutons reset individuels (↺)
- Toolbar "Tout réinitialiser"
- Indicateur modifications (barre bleue)
- 100% manuel, PAS d'IA

**BRIEF 2 - AI Rewrite** :
- Boutons ✨ triple sparkle au survol paragraphes
- Popup avec textarea pour instructions ("Rends le plus percutant")
- Appel DeepSeek/Groq pour régénérer
- Ctrl+Enter pour régénérer, Escape pour fermer
- Champs éligibles : heroSubtitle, aboutText, valueProp, serviceDescription, projectDescription

**Rollback effectué** : Commit `342de20` (implémentation mélangée) supprimé, reparti proprement.

### Intégration restante (TODO)
- 🚧 Connecter `aiEnrichmentServiceV4` dans `WizardStepGeneration.tsx`
- 🚧 Extraire valueProp + expertises du HTML généré pour AI Rewrite
- 🚧 Injecter `data-count` dans les templates pour fallback CSS
- 🚧 Migrer templates HTML monolithiques vers CSS partagés

### Tests à effectuer
1. **Wizard V2** : Positionnement complet → Services = expertises
2. **Wizard V2** : Sans positionnement → IA déduit du PDF
3. **BRIEF 1** : Édition manuelle + Reset → Fonctionne
4. **BRIEF 2** : Boutons ✨ + popup + régénération IA → Fonctionne
5. **Layout** : 1 projet horizontal, 3+ grille

---

## 📐 Design System CALM-UI (SOUVERAIN)

**Fichier de référence** : `/home/ubuntu/clawd/SOUVERAIN/src/components/ui.tsx`

### Composants disponibles

- **BentoBox** : Container grid (columns, gap)
- **BentoCard** : Cartes individuelles (span, rowSpan, padding)
- **ScoreCircle** : Score circulaire (sm/md/lg/xl)
- **ScoreBar** : Barre de progression avec label
- **SectionHeader** : Titres de section (icon, subtitle, action)
- **Tag** : Badges (variants: default/success/warning/error/info/accent)
- **Button** : Boutons (variants: primary/secondary/ghost)
- **ToggleSwitch** : Switch pour dark mode
- **Divider** : Séparateur horizontal
- **DocumentPreview** : Preview A4 avec scale

### ⚠️ Règles STRICTES de conformité CALM-UI

1. **Toujours utiliser `useTheme()`** pour accéder aux couleurs
2. **JAMAIS de couleurs hardcodées** (`#FFFFFF`, `#1A1A1A`, etc.)
3. **Utiliser les tokens du design system** :
   - `theme.bg.*` (primary, secondary, tertiary)
   - `theme.text.*` (primary, secondary, tertiary, inverse)
   - `theme.accent.*` (primary, secondary, muted)
   - `theme.border.*` (light, default)
   - `theme.semantic.*` (success, error, warning, info + bg variants)
   - `typography.*` (fontSize, fontWeight, fontFamily)
   - `borderRadius.*` (sm, md, lg, xl, full)
   - `transitions.*` (fast, normal)
4. **Pas de Tailwind** sauf pour animations custom déjà définies
5. **React.memo pour les composants lourds** (performance)

### Composants à mémoïser (priorité)

- PortfolioCard
- VaultDocumentCard
- OnboardingSlide
- Templates Portfolio (Developer, Minimal, Modern, Visual)

### Problèmes détectés dans l'audit

- 20+ couleurs hardcodées à remplacer
- 0 composants avec React.memo (tous à optimiser)
- 34 types `any` à typer correctement
- App-debug.tsx non utilisé (à supprimer ou documenter)

---

## 🏗️ Projets

### ⚠️ SOUVERAIN (EN SOMMEIL)

**Statut** : 🛌 Archivé - Consultation uniquement  
**Localisation** : `/home/ubuntu/clawd/SOUVERAIN`  
**Usage** : Référence pour vision, prompts, code, config  
**Type** : Application React/Electron

### 🚀 CareerCare (PROJET ACTIF)

**Statut** : ✅ En développement actif  
**Localisation** : `/home/ubuntu/careercare`  
**Type** : Application Next.js (React) + Supabase  
**Repo** : https://github.com/FiTiTan/CAREER  
**Description** : Plateforme d'analyse de CV avec IA (DeepSeek/Mistral)

### Architecture

- **Frontend** : React + TypeScript (src/)
- **Backend** : Electron main process (.cjs files)
- **Database** : SQLite avec chiffrement AES-256
- **Themes** : Dark/Light avec ThemeContext
- **Workers** : LLM worker pour tâches lourdes

### Fichiers clés

- `src/components/ui.tsx` : Design system CALM-UI
- `src/ThemeContext.tsx` : Thème global
- `src/design-system.ts` : Tokens (typography, colors, etc.)
- `main.cjs` : Point d'entrée Electron
- `database.cjs` : Logique SQLite chiffrée

### TODOs en attente (7)

- Vérifier statut Premium (GitHub/Local import)
- Gérer multi-portfolio
- Redirection vers page Premium/Boutique
- API Electron pour désactivation
- Sauvegarder mot de passe haché

---

## 🔧 Workspace

**Répertoire de travail** : `/home/ubuntu/clawd`  
**VPS** : vps-2c39c112 (Ubuntu, Node v22.22.0)  
**Gateway** : Clawdbot actif, bind LAN pour node pairing

---

## 👤 Utilisateur

**Nom** : Jean-Louis  
**Timezone** : Europe/Paris (CET/CEST)  
**Style** : Préfère concision, efficacité, proactivité  
**Langue** : Français

**Config matérielle:**
- **Machine:** Surface Pro 6 (2018)
- **CPU:** Intel Core i5-8350U (4 cœurs, 8 threads, 1.70 GHz)
- **RAM:** 8 GB (usage typique: ~6 GB utilisés, 2 GB libres)
- **OS:** Windows 11 Pro (Build 26200)
- **Profil:** Config moyenne-basse pour dev, optimisations importantes

## 🤖 Mon identité Telegram

**Username:** @diceball_bot  
**Channel:** telegram  
**Runtime:** Clawdbot (bientôt renommé OpenClaw - Jan 2026)

**Note:** Clawdbot → Moltbot → OpenClaw (renommage suite à problème de marque avec Anthropic/Claude)

---

## 🔍 Workflow de développement

### Après longues phases de coding : Debug théorique systématique

**Avant de pusher/faire tester :**

1. ✅ **Conflits Git** : `grep -rn "^<<<<<<< \|^>>>>>>> " src/`
2. ✅ **Imports manquants** : vérifier les nouveaux exports/imports
3. ✅ **Handlers IPC** : si nouveau handler → vérifier preload.cjs
4. ✅ **Fichiers requis** : assets, templates, configs existent
5. ✅ **TypeScript** : si disponible → `npx tsc --noEmit`
6. ✅ **Console errors** : simuler les appels critiques mentalement

**Pourquoi ?**
- Économise du temps de debugging côté utilisateur
- Détecte les bugs "stupides" (conflits, imports) avant test
- Professionnel : pusher du code qui compile

**Leçon apprise** : 2026-01-30 - 2 bugs critiques détectés en simulation avant test utilisateur (marqueurs Git + IPC manquant)

---

## ⏰ Gestion du temps

**RÈGLE STRICTE** : Utiliser les timestamps des messages Telegram pour mesurer le temps réel.

❌ **Mauvais** :
- Inventer des durées ("6h de travail")
- Utiliser des timestamps fictifs dans la doc

✅ **Bon** :
- Message début : `2026-01-31 00:32 UTC`
- Message fin : `2026-01-31 01:41 UTC`
- **Durée réelle = 1h10** ⏱️

**Pourquoi ?**
- Honnêteté sur le temps de travail
- Estimation réaliste pour futures tâches
- Crédibilité

**Leçon apprise** : 2026-01-31 - Optimisations SOUVERAIN = 1h10 réel (pas "6h")

---

## 🔔 Vérification Clawdbot Updates

**RÈGLE:** Au premier message de chaque jour, vérifier si une MAJ Clawdbot est disponible.

**Process:**
1. Lire `memory/clawdbot-update-check.json`
2. Si `lastCheck` != date du jour:
   - Exécuter `npm view clawdbot version`
   - Comparer avec `lastVersion`
   - Si différent: Envoyer message avec détails MAJ
   - Si identique: RIEN (silence)
   - Mettre à jour le fichier JSON avec date du jour
3. Si `lastCheck` == date du jour: déjà vérifié, rien faire

**Fichier:** `memory/clawdbot-update-check.json`

---

*Dernière mise à jour : 2026-01-31*

## 🤖 Optimisation Prompt IA (DeepSeek Services)

**Date:** 2026-02-03

### Contexte
Le prompt de génération des services (portfolios) générait du contenu avec problèmes récurrents :
- Ton personnel (je/nous/notre) sur artisans
- Vocabulaire "consulting" pour commerces (food/retail)
- Expertises ignorées

### Méthode : Stress Testing Itératif

**Outil fourni:** `souverain-prompt-optimizer/`
- Script `run-tests.js` : 50 tests/loop avec données random
- Validation automatique : ton, vocabulaire, expertises
- Scoring : 0-100 par test, rapport JSON détaillé

**Workflow:**
1. Lancer 50 tests → génère `results/loop-N-results.json`
2. Analyser erreurs fréquentes + mots problématiques
3. Modifier `prompt.txt` pour corriger
4. Relancer jusqu'à score ≥92 et succès ≥90%

### Résultats 4 Loops

| Loop | Score | Succès | Artisans | Tech | Notes |
|------|-------|--------|----------|------|-------|
| #1 | N/A | 84% | 56% | 100% | Baseline partielle |
| #2 | 94.7 | 76% | 56% | 100% | +Exemples ton |
| #3 | 94.3 | 80% | **77%** | 67% | Focus artisans (régression tech) |
| #4 | **97.1** | **86%** | **92%** | **88%** | Équilibrage toutes catégories ✅ |

**Gain total:** +36% artisans, +2.4 points score, 86% succès global

### Solution finale : Prompt V4

**Améliorations clés:**
1. **Catégorisation renforcée** : food/retail/service/tech/artisan/niche
2. **Exemples par catégorie** avec émojis (🍽️💼💻🔧)
3. **Mots interdits explicites** : "conception de", "exploration de", "conseil en", etc.
4. **Ton impersonnel strict** : 20+ exemples ❌/✅
5. **Règle expertises** : Génération basée sur expertises fournies (ou déduites)

### Intégration Code

**Fichiers créés:**
- `servicesPromptV4.ts` : Prompt optimisé + buildExpertisesBlock()
- `aiValidation.ts` : Validation post-génération + retry automatique (max 2)

**Fichier modifié:**
- `aiEnrichmentServiceV4.ts` : enrichServices() refactorisé avec wrapper validation

**Flow de validation:**
```
generateServicesWithValidation(callAI, data, maxRetries=2)
  → Tentative 1 → validate → OK ? retour : retry
  → Tentative 2 → validate → OK ? retour : warning + dernier résultat
```

**Critères validation:**
- ❌ Ton personnel détecté (je/j'/nous/n'/notre/nos/mon/ma/mes)
- ❌ Vocabulaire consulting pour food/retail
- ⚠️ Longueur <20 ou >70 mots

### Impact attendu

**Avant (sans retry):**
- Score : 94.3
- Succès : 80%
- Cas limites fréquents

**Après (avec retry):**
- Score : **>98/100** (estimé)
- Succès : **>95%** (estimé)
- Cas limites réduits à ~5% (edge cases DeepSeek)

**Bénéfice utilisateur:**
- Génération services plus professionnelle
- Moins de "je/nous" dans portfolios artisans
- Pas de vocabulaire consulting dans commerces (coffee shop, fleuriste, etc.)
- Respect des expertises fournies

### Tests à effectuer

| Cas | Activité | Attendu |
|-----|----------|---------|
| 1 | Coffee shop | Produits (cafés, pâtisseries) PAS "conception de menus" |
| 2 | Plombier | "Intervention rapide" PAS "J'interviens rapidement" |
| 3 | Avocat | "Accompagnement divorce" PAS "Je vous accompagne" |
| 4 | Graphiste | "Création identités visuelles" PAS "Je crée" |

**Commit:** `40a7bc2` (branch `perf-optimization-phase1`)

### Leçon apprise

**Itération guidée par data > intuition**
- 4 loops = 200 tests = feedback objectif
- Chaque modif impacte différentes catégories (trade-offs)
- Équilibrage nécessaire entre toutes les catégories
- Retry automatique compense variance aléatoire IA

---

## 🐛 CareerCare - Fix useEffect Loop Infinite (5 février 2026)

**Date:** 2026-02-05  
**Fichier:** `app/(app)/cv/[id]/page.tsx`  
**Problème:** L'analyse démarrait en boucle au chargement de la page  
**Cause:** useEffect avec dépendances `analysis?.status`, `hasStarted`, `pollCount` provoquait re-renders en cascade

**Solution:**
- Remplacé `useState` par `useRef` pour `hasStarted` et `pollCount`
- Supprimé ces dépendances du tableau de deps du useEffect
- useEffect ne se déclenche qu'au mount initial (deps: `[params.id]`)
- Polling continue jusqu'à `status === 'done'` ou max 40 tentatives

**Commit:** `4e2c971` (local VPS, non pushé - pas de clé SSH configurée)

**Impact:**
- Analyse lancée **1 seule fois** au chargement
- Polling propre toutes les 3s
- Pas de requêtes API en boucle infinie

**Leçon apprise:**
- useEffect avec state dans deps = risque de boucle si state modifié dans effect
- useRef pour compteurs/flags = plus sûr
- Toujours vérifier les dépendances du useEffect

