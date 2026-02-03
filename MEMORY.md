# MEMORY.md - Mémoire à long terme

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

## 🏗️ Projet SOUVERAIN

**Type** : Application React/Electron  
**Localisation** : `/home/ubuntu/clawd/SOUVERAIN`

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
