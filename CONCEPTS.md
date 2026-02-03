# CONCEPTS.md - Mes Idées d'Applications

Liste centralisée de tous les concepts d'app avec analyse marché/revenus/dev.

---

## 1. SOUVERAIN Energy OS

**Tagline** : "Ne payez plus votre énergie, laissez votre maison la piloter."

### 📊 Marchés Potentiels
- **France** : 10M maisons individuelles
  - 500K foyers avec panneaux solaires (+40%/an)
  - 1.2M véhicules électriques (+50%/an)
  - 2M foyers tarifs dynamiques/Tempo
- **Europe** : Allemagne, Benelux (marché secondaire)

**Différenciateur** : V2H/V2G + IA locale + agnostique = aucun concurrent ne combine les 3

### 💰 Revenus Réalistes par An
- **An 1** : 2K users premium (9.90€/mois) = **240K€/an**
- **An 3** : 20K users + 500 installations artisans + partenariats = **~3M€/an**

**Business model** :
1. SaaS utilisateurs (freemium → 9.90€/mois)
2. Commission artisans (5-10% sur chantiers solaire/PAC/bornes)
3. Affiliation équipements (prises connectées, modules VMC)
4. B2B artisans (abonnement + leads qualifiés)

### ⏱️ Temps de Dev Approximatif
- **MVP (6-9 mois)** : Linky + Tempo + prises connectées + V2H basique + IA prédictive
- **Scale (6-12 mois)** : Multi-marques, VMC/PAC, Espace Pro, Matter, IA niveau 3
- **Total produit mature** : 12-18 mois

**Stack** : Python (backend/IA), Rust (IoT/Matter), TypeScript (mobile)

### 🎯 Statut
- Phase : Concept
- Roadmap : Détaillée (voir `memory/2026-02-03.md`)
- Prochaine étape : Commencer MVP semaine 1 (intégration Linky)

### 📎 Références
- Master Brief complet : `memory/2026-02-03.md`
- Roadmap 3 mois : Discussion Telegram 2026-02-03

---

## 2. ScoreFlow (Pre-Business Planning SaaS)

**Tagline** : "Transforme une intuition en décision basée sur la donnée."

### 📊 Marchés Potentiels
- **Entrepreneurs / Créateurs d'app** : 
  - France : ~50K créateurs actifs/an
  - Europe : ~200K
  - USA : ~500K
- **Startups en phase d'idéation** : Milliers de nouveaux projets/an
- **Consultants en innovation / Business coaches**
- **Incubateurs / Accélérateurs** (licence B2B)

**Concurrence** : Outils de business plan (LivePlan, Bizplan) mais pas d'outil de scoring pré-concept automatisé

**Différenciateur** : IA + scoring automatique + analyse marché internationale en 1 clic

### 💰 Revenus Réalistes par An
- **An 1** : 500 users premium (19.90€/mois) = **120K€/an**
- **An 3** : 3K users premium + 20 licences B2B incubateurs (500€/mois) = **~840K€/an**

**Business model** :
1. Freemium : 3 concepts gratuits
2. Premium : 19.90€/mois (analyses illimitées + export PDF + données temps réel)
3. B2B : Licences incubateurs/accélérateurs (500€/mois, accès multi-utilisateurs)
4. Affiliation : Commission sur outils recommandés (Make.com, Supabase, etc.)

### ⏱️ Temps de Dev Approximatif
- **MVP (2-3 mois)** : Formulaire + intégration OpenAI + scoring basique + dashboard
- **Scale (3-6 mois)** : APIs externes (Google Trends, données sectorielles) + matrice décision + export PDF
- **Total produit mature** : 5-9 mois

**Stack no-code/low-code** :
- Frontend/Backend : Bubble.io ou FlutterFlow
- IA : API OpenAI (GPT-4o)
- Automatisation : Make.com
- Base de données : Supabase ou Bubble DB

### 🎯 Statut
- Phase : Concept
- Prochaine étape : Définir 10 critères de scoring prioritaires + wireframe
- Formule scoring définie (Impact × Confiance × Demande / Effort)

### 📋 Fonctionnalités Clés
- **Quick-Input Concept** : Formulaire simplifié + mode vocal (dicté → IA structure)
- **Moteur d'Analyse Marché** : TAM/SAM/SOM + saturation + intérêt géographique
- **Magic Score** (sur 100) : Potentiel Business + Facilité Exécution + Fit Marché - Risque
- **Tableau de Bord Priorisation** : Matrice Impact vs Effort (Bubble Chart)
- **Comparatif côte-à-côte** : Arbitrer entre 2 concepts similaires

### 📎 Références
- Brief complet : Discussion Telegram 2026-02-03

---

## 3. MYSTIC FLOW (Super-App Holistique Gamifiée)

**Tagline** : "La première Super-App de spiritualité qui t'accompagne du digital au réel."

### 📊 Marchés Potentiels
- **Marché mondial spiritualité/bien-être** : 4.5 trillions $ (2023)
  - Apps astrologie (Co-Star, The Pattern) : 10M+ users chacune
  - E-commerce ésotérique : 2.2 milliards $ (croissance +9%/an)
- **Cibles principales** :
  - Femmes 18-45 ans intéressées développement personnel
  - Communautés spirituelles (Wicca, néo-paganisme, new age)
  - Marché français : 10M+ personnes consultent horoscope régulièrement
- **Marchés secondaires** : USA (énorme), UK, Canada

**Concurrence** : Co-Star (astro pure), Labyrinthos (tarot), Insight Timer (méditation) → **aucun ne combine tout + gamification + e-commerce**

**Différenciateur** : Sanctuaire digital + actions réelles gamifiées + boutique intégrée

### 💰 Revenus Réalistes par An
- **An 1** : 5K users premium (9.90€/mois) + e-commerce (50K€) = **650K€/an**
- **An 3** : 50K users premium + e-commerce (500K€) + marketplace praticiens (200K€) = **~6.6M€/an**

**Business model** :
1. Freemium : Horoscope basique + 1 tirage tarot/jour gratuit
2. Premium "The Mystic Club" : 9.90€/mois (analyses poussées, recettes exclusives, -10% boutique)
3. Micro-transactions : Achat de "Mana" pour lectures instantanées
4. E-commerce : Kits rituels, pierres, bougies, plantes (marge 40-60%)
5. Marketplace praticiens : Commission 20% sur consultations

### ⏱️ Temps de Dev Approximatif
- **MVP (9-12 mois)** : 
  - Sanctuaire digital : Astro + Tarot + Journal (4 mois)
  - Gamification : Système XP + quêtes + Mana (2 mois)
  - Boutique e-commerce : Stripe + gestion stock (2 mois)
  - Design Neo-Mystic + UX (2 mois)
  - Beta testing (1 mois)
- **Scale (6-12 mois)** : 
  - Vision IA (chiromancie scanner paume)
  - Pendule gyroscope
  - Marketplace praticiens
  - Partenariats boutiques physiques (QR codes)
- **Total produit mature** : 15-24 mois

**Stack** :
- Mobile : React Native ou Flutter (iOS/Android natif requis pour gyroscope/caméra)
- Backend : Node.js + PostgreSQL
- IA : OpenAI GPT-4 (synthèse astrologie/tarot/recommandations)
- Vision : TensorFlow Lite ou Core ML (chiromancie)
- Paiements : Stripe (abonnements + e-commerce)

### 🎯 Statut
- Phase : Concept
- Prochaine étape : Wireframes + définir catalogue produits e-commerce initial
- Complexité : Élevée (IA vision + gamification + e-commerce)

### 📋 Les 4 Piliers

**A. Sanctuaire Divinatoire (Digital)**
- Astrologie : Thème astral + météo planétaire + compatibilité
- Tarot & Oracles : Tirages quotidiens avec IA cross-référence astro
- Chiromancie : Scanner paume via caméra (lignes vie/cœur/tête)
- Pendule Interactif : Gyroscope pour questions binaires

**B. Laboratoire Ésotérique (Le Faire)**
- Herboristerie : Guide plantes à brûler + propriétés
- Recettes Magiques : Infusions lune, huiles intention, sels bain
- Rituels Saisonniers : Solstices, équinoxes, lunaisons

**C. Boutique Hybride (Business)**
- E-commerce intégré : Kits rituels, pierres, bougies, plantes (sourcing éthique)
- Pop-up & QR codes : Bonus app en boutique physique
- Marketplace experts : Rendez-vous astrologues/médiums

**D. Gamification (Engagement)**
- Progression : Néophyte → Apprenti → Initié → Gardien → Grand Mage
- Monnaie "Mana" : Débloquer tirages avancés
- Quêtes Réelles : Hydratation, purification, gratitude, marche, sommeil

### 🎮 Exemples de Gamification

| Action Réelle | Validation App | Récompense |
|---------------|----------------|------------|
| Hydratation | Timer "eau d'intention" | +10 Mana |
| Purification | Photo/scan plante brûlée | Mantra du soir |
| Gratitude | 3 points positifs journal | Bonus "Chance" tirage |
| Marche | Sync HealthKit (pas) | Étapes de sagesse |
| Sommeil | Noter rêves au réveil | Analyse IA gratuite |

### 🎨 Identité Visuelle
- **Design Neo-Mystic** : Épuré, sombre, néons dorés/violets
- Moderne et scannable (éviter "vieille boutique poussiéreuse")
- IA de synthèse : "Ton Mars en Bélier + carte La Tour = brûle du Romarin aujourd'hui"

### ⚖️ Éthique et Sécurité
- **Garde-fous** : Clause non-responsabilité claire
  - ❌ Pas de conseils médicaux
  - ❌ Pas de conseils financiers
  - ❌ Pas de prédictions de décès
- **Data Privacy** : Protection stricte données personnelles (thèmes astraux + journaux intimes)
- RGPD compliant (export/suppression données)

### 💡 Atout Majeur
"Ce n'est pas juste une application, c'est un écosystème qui transforme la spiritualité en un jeu de rôle grandeur nature, rendant le développement personnel ludique et tangible."

### 📎 Références
- Brief complet : Discussion Telegram 2026-02-03

---

## 4. SOUVERAIN (Suite Professionnelle Tout-en-Un)

**Tagline** : "Ta carrière, un seul endroit. Maîtrise totale, données locales."

**Vision** : La première suite desktop qui centralise **tous** les outils du professionnel moderne : CV/Portfolio, Coffre-Fort documentaire, Job Matching IA, LinkedIn Boost, Boutique ressources.

### 📊 Marchés Potentiels
- **Freelances / Indépendants** : 
  - France : 3.5M indépendants (dont 1M créatifs/tech)
  - Monde : 1.5 milliard freelances
- **Demandeurs d'emploi** : 6M en France, 150M dans le monde
- **Jeunes diplômés** : 750K/an en France
- **Établissements locaux** (restaurants, boutiques, artisans)
- **B2B** : Cabinets RH, outplacement, écoles

**Concurrence** : 
- Portfolio : Wix, Squarespace, Webflow (SaaS cloud payant)
- Job Matching : LinkedIn, Indeed (mais pas d'analyse IA privée)
- Coffre-Fort : Notion, Google Drive (cloud, pas chiffré bout-en-bout)

**Différenciateur** : 
- ✅ **Suite complète** (pas besoin de 10 outils différents)
- ✅ **Desktop-first** (pas de navigateur, pas de latence)
- ✅ **Privacy by Design** (données locales, chiffrement AES-256)
- ✅ **IA intégrée** pour chaque module
- ✅ **Export/Portabilité** (pas de vendor lock-in)

### 💰 Revenus Réalistes par An
- **An 1** : 2K users premium (9.90€/mois) + 1K one-time (templates/ressources 9.99€) = **250K€/an**
- **An 3** : 20K users premium + 10K one-time/an + B2B (écoles/cabinets RH) = **2.5M€/an**

**Business model** :
1. **Freemium** : 
   - Module Portfolio : Export HTML gratuit, 2 templates basiques
   - Module Vault : 50 documents max (non chiffré)
   - Module Job Matching : 3 analyses/mois
   
2. **Premium "SOUVERAIN Pro"** (9.90€/mois) : 
   - Portfolio : Templates premium illimités + IA boost illimité + analytics
   - Vault : Documents illimités + chiffrement AES-256 + sauvegarde cloud
   - Job Matching : Analyses illimitées + génération lettres motivation IA
   - LinkedIn Boost : Optimisation profil + suggestions posts
   - Support prioritaire
   
3. **One-time purchases** : 
   - Templates premium individuels (9.99€)
   - Packs sectoriels (Tech, Design, Marketing) (29.99€)
   
4. **Boutique** : 
   - Guides carrière (14.99€)
   - Sessions coaching (49.99€)
   - Affiliation : Formation, certifications
   
5. **B2B** : 
   - Écoles/Bootcamps : 499€/an (50 licences étudiants)
   - Cabinets RH/Outplacement : 999€/an (licences illimitées + branding)
   - Pôle Emploi/Mission Locale : Licences publiques

### ⏱️ Temps de Dev Approximatif
- **MVP (déjà fait)** : Wizard complet + 4 templates + export HTML ✅
- **Scale (3-6 mois)** :
  - Import automatique réseaux sociaux (LinkedIn, GitHub API)
  - Marketplace templates communauté
  - Module Analytics (stats visites)
  - Version web (en plus de desktop)
  - Multi-langue
- **Total produit mature** : 6-9 mois

**Stack actuel** :
- Frontend : React + TypeScript
- Desktop : Electron
- Design System : CALM-UI (propriétaire)
- IA : OpenAI GPT-4 (génération contenu)
- Base locale : SQLite

### 🎯 Statut
- Phase : **MVP terminé** ✅
- Prochaine étape : 
  1. Beta privée (10 testeurs)
  2. Packaging distribution (installeurs Windows/Mac/Linux)
  3. Landing page marketing
  4. Lancement Product Hunt

### 📋 Les 5 Modules

**1. CV & Portfolios** ✅ (MVP terminé)
- Wizard 7 étapes (Infos → Expertise → Réalisations → Style → Génération → Preview → Export)
- 4 templates (Developer, Minimal, Modern, Visual)
- IA boost contenu (tagline, descriptions)
- Import PDF/TXT + réseaux sociaux (10 plateformes)
- Drag & drop images dans preview
- Export HTML/CSS/JS statique
- Mode personne / établissement

**2. Coffre-Fort Pro (Vault)** ✅ (Fonctionnel)
- Stockage documents professionnels chiffré (AES-256)
- Catégories : CV, lettres, portfolios, certificats, références, contrats, fiches paie
- Vue grille/liste, tags, notes, favoris
- Recherche fulltext
- Preview intégré
- Badge Premium (pour chiffrement)

**3. Job Matching IA** ✅ (Fonctionnel)
- Input offre emploi (URL, copier-coller, ou formulaire)
- Sélection profil (depuis Vault ou portfolios créés)
- Analyse IA (compatibilité, points forts, manques, recommandations)
- Score de matching (sur 100)
- Génération lettre motivation personnalisée
- Historique des matchings

**4. LinkedIn Boost** 🚧 (Coming Soon)
- Optimisation profil (titre, résumé, expériences)
- Suggestions posts (contenu, hashtags)
- Analyse réseau (connexions stratégiques)
- Veille opportunités

**5. Boutique** 🚧 (Coming Soon)
- Templates premium (sectoriels)
- Guides carrière (rédaction CV, entretiens)
- Sessions coaching
- Formations partenaires

### 🚀 Avantages Compétitifs vs Concurrence

**vs Wix/Squarespace (Portfolio)** :
- ✅ Desktop app (pas de navigateur, plus rapide)
- ✅ Export HTML gratuit (pas d'abonnement hébergement forcé)
- ✅ Privacy (données locales)

**vs LinkedIn/Indeed (Job Matching)** :
- ✅ Analyse IA privée (pas de data mining)
- ✅ Matching multi-profils (compare plusieurs CV contre une offre)
- ✅ Génération lettre motivation (LinkedIn ne le fait pas)

**vs Notion/Google Drive (Vault)** :
- ✅ Chiffrement bout-en-bout (AES-256)
- ✅ Spécialisé carrière (catégories pro, pas un fourre-tout)
- ✅ Offline-first (accès sans connexion)

**Atout stratégique global** :
- 🎯 **Suite intégrée** : Les données circulent entre modules (portfolio → vault → job matching → LinkedIn)
- 🎯 **IA contextuelle** : L'IA connaît tout ton profil, recommandations ultra-personnalisées
- 🎯 **Privacy by Design** : Angle fort vs big tech, RGPD compliant natif

### 📎 Références
- Repo : `/home/ubuntu/clawd/SOUVERAIN/`
- Historique dev : `memory/2026-02-02.md`
- Design system : `SOUVERAIN/DESIGN.md`

---

## 📊 Comparatif Global des 5 Concepts

| Critère | SOUVERAIN Energy | ScoreFlow | MYSTIC FLOW | SOUVERAIN Suite | FiTTitan |
|---------|------------------|-----------|-------------|-----------------|----------|
| **Revenus an 3** | 3M€ | 840K€ | 6.6M€ | **2.5M€** | 600K€ |
| **Dev total** | 12-18 mois | 5-9 mois | 15-24 mois | **6-9 mois** ✅ | 12 mois |
| **Complexité** | Haute (IoT/V2H) | Faible (no-code) | Haute (IA vision) | Moyenne | Haute (animations 2D) |
| **Marché** | France (10M) | Mondial (250K) | Mondial (10M+) | **Mondial (1.5Mrd)** 🌍 | Mondial (400M+) |
| **Avancement** | Concept | Concept | Concept | **3/5 modules faits** 🚀 | **GDD finalisé** 📋 |
| **Potentiel licorne** | Moyen | Faible | Élevé | **Élevé** | Moyen |
| **Besoin capital** | 50K€ | 5K€ | 100K€ | 30K€ | **123K€** (43K cash + 80K sweat) |
| **Start dev** | - | - | - | En cours | Nov 2025 planifié |

### 🎯 Stratégie Recommandée

**Tu as 5 concepts, 2 ont une longueur d'avance :**

#### Option A : SOUVERAIN Suite (Recommandée si focus B2B/SaaS)
**Court terme (3-6 mois)** : 
1. ✅ **SOUVERAIN Suite** → Launch modules existants (Portfolio + Vault + Job Matching)
2. 🔄 **En parallèle** : ScoreFlow en no-code (side project, validation rapide)

**Moyen terme (6-12 mois)** :
3. 🚀 **SOUVERAIN Suite** → Modules 4-5 (LinkedIn Boost + Boutique)
4. 🔌 **OU** : SOUVERAIN Energy (si passion IoT/hardware)

**Long terme (levée)** :
5. 🔮 **MYSTIC FLOW** avec équipe complète

**Pourquoi ?**
- ✅ **3/5 modules déjà faits** (60% terminé)
- ✅ Marché B2B accessible (écoles, cabinets RH)
- ✅ Bootstrap seul possible
- ✅ Time-to-revenue : 3-6 mois

#### Option B : FiTTitan (Si passion gaming/fitness)
**Court terme (12 mois)** :
1. 🎮 **FiTTitan solo dev** (start nov 2025, launch oct 2026)
2. 🔄 Budget : 43K€ cash + sweat equity

**Post-launch (12-24 mois)** :
3. Scale FiTTitan (si PMF atteint)
4. OU pivoter vers SOUVERAIN Suite (en parallèle)

**Pourquoi ?**
- ✅ **GDD complet** = roadmap claire
- ✅ Marché viral (gamers + fitness)
- ✅ Potentiel communauté forte
- ⚠️ Risque : Besoin 123K€ investissement, ROI an 1 faible (43K€)

#### Comparaison Rapide

| Critère | SOUVERAIN Suite | FiTTitan |
|---------|----------------|----------|
| **Avancement** | 60% fait | 0% (GDD ready) |
| **Capital requis** | 30K€ | 123K€ |
| **Time-to-revenue** | 3-6 mois | 12 mois |
| **Marché** | B2B + B2C | B2C gaming |
| **Risque** | Faible (validation partielle) | Moyen (marché compétitif) |

#### Ma Recommandation
**Lance SOUVERAIN Suite d'abord** :
- Tu rentabilises l'existant (3 modules faits)
- Revenus rapides = financer FiTTitan après
- Moins de capital requis
- Si FiTTitan te passionne vraiment → fais-le en 2026, mais avec revenus SOUVERAIN pour sécuriser

---

## 5. FiTTitan (RPG Mobile Fitness Gamifié)

**Tagline** : "Level Up IRL. Gamify Workouts. Become a Titan."

**Vision** : "World of Warcraft du Fitness" - Ton workout IRL devient une quête épique dans un RPG. Chaque activité physique (HealthKit/Google Fit) forge ton avatar dans "l'Éternel Gymnase".

### 📊 Marchés Potentiels
- **Fitness gamification** : Marché mondial 1.5Mrd$ (2025)
- **Apps fitness** : 400M+ utilisateurs actifs monde
- **RPG mobile** : 1.2Mrd$ revenus/an
- **Cible primaire "Alex"** :
  - 25-35 ans (65% H, 35% F)
  - Tech-savvy, early adopters
  - Joueurs RPG/mobile games
  - 3-5× workouts/semaine
  - Budget apps/gaming : 15-30€/mois

**Concurrence** :
- Zombies Run (narrative running, 500K+ users)
- Habitica (habit gamification, mais fitness secondaire)
- Fitocracy (social fitness, mais faible immersion RPG)

**Différenciateur** :
- ✅ **Direction artistique premium** (2D Puppet Cel Shading, qualité AAA indie)
- ✅ **RPG immersif** (lore 15-20 pages, 3 classes Titans, quêtes narratives)
- ✅ **Gamification scientifique** (MET-minutes = XP, transparent, crédible)
- ✅ **Zero Pay-to-Win** (cosmétiques only, fair play absolu)
- ✅ **Bienveillant** (pas de punition inactivité, système catch-up)

### 💰 Revenus Réalistes par An
- **An 1** : 43,920€ (target GDD)
  - Battle Pass : 500 users × 9.99€/saison × 4 saisons = 20K€
  - Cosmétiques : ~24K€
- **An 3** : ~600K€ (scale avec 5K MAU, 50% D30 retention)

**Business model** :
1. **Freemium** :
   - App gratuite
   - Battle Pass Free Track (25% cosmétiques)
   - Gameplay complet accessible
   
2. **Battle Pass Premium** : 9.99€/saison (90 jours)
   - 50 tiers progression
   - 100% cosmétiques (pas de power)
   - Seasonal storylines
   
3. **Cosmétiques** :
   - Skins, emotes, poses
   - Banners, profile cards
   - 50+ items MVP (scalable 100+)
   
4. **Zero Pay-to-Win** :
   - Leaderboards = pure effort IRL
   - Aucun avantage stats payant
   - ARPU target : 2.40€ (low mais sustainable)

### ⏱️ Temps de Dev Approximatif
- **MVP (12 mois)** : Novembre 2025 → Octobre 2026
  - Beta Launch : Août 2026 (M10)
  - Public Launch : Octobre 2026 (M12)
- **Budget total** : 123K€
  - Cash : 43K€
  - Sweat equity : 80K€ (dev solo)

**Stack** :
- Frontend : Flutter (Dart) - cross-platform iOS 14+ / Android 9+
- Backend : Firebase (Firestore + Functions + Auth + Storage)
- Design : 2D Puppet Spine 4 (skeletal animation)
- Fitness : HealthKit (iOS) / Google Fit (Android)
- Pipeline graphique : IA-assisted (Stable Diffusion LoRA)

### 🎯 Statut
- Phase : GDD V3.2 finalisé ✅
- Prochaine étape : Start dev 1er novembre 2025
- Statut : **READY FOR EXECUTION** 🚀

### 📋 Les 4 Piliers

**1. Immersion Narrative (RPG Core)**
- Lore Bible 15-20 pages
- 3 Classes Titans (Guerrier, Coureur, Sage)
- 50+ quêtes narratives
- Seasonal storylines (Battle Pass)
- Impact : Anti-churn via investissement émotionnel (D30 50% target)

**2. Gamification Scientifique**
- MET-minutes = base XP (1 MET-min = 1 XP)
- 50+ activités reconnues (running, yoga, HIIT, etc.)
- Auto-sync HealthKit/Google Fit (0 friction)
- Impact : Confiance utilisateur + crédibilité

**3. Competitive Social (Asynchrone)**
- Leaderboards (Global, Friends, Regional)
- Achievements partageable (Carte de Profil virale)
- Battle Pass seasonal (12 semaines)
- Anti-cheat robuste (plausibility checks)
- Impact : Engagement + Retention (D7/D30)

**4. Zero Pay-to-Win (Fair Play Absolue)**
- Cosmétiques ONLY (0 stats advantage)
- Leaderboards = pure effort IRL
- Pass = cosmétiques, pas power
- Impact : Long-term retention + community health

### 🎨 Direction Artistique Unique

**Style** : 2D Puppet Sprite HD Semi-SD avec Cel Shading Pictural

**Caractéristiques** :
- Proportions héroïques (25-30% surélevées vs réalisme)
- Ombres au coup de crayon (charcoal sketch lines)
- Texture aquarelle sur aplats (richesse visuelle)
- Highlights dynamiques (luminosité volumétrique)
- Rig Spine 4 réutilisé partout (cohérence maximale)

**Référence visuelle** : Wukong/Ne Zha (Mobile Legends) - heroic fantasy premium

**Avantage** :
- Premium feel (NOT cheap gacha)
- Charme distinctif mémorable
- Justifie monétisation cosmétiques
- IA-assisted pipeline (40-50% gain temps)

### 🎮 Gameplay Core

**Formule XP** : 1 MET-minute = 1 XP (transparent, scientifique)

**Exemples** :
- 30 min running @ 9.8 MET = ~300 XP
- 45 min yoga @ 3.3 MET = ~150 XP
- 1h CrossFit @ 8.5 MET = ~500 XP

**Progression** :
- Level 1-50 : 78,000 XP cumulés
- Timeline to Level 50 :
  - Hardcore (3K XP/semaine) : 6 mois
  - Regular (2K XP/semaine) : 9 mois
  - Casual (1.2K XP/semaine) : 15 mois

**Système bienveillant** :
- ✅ Pas de pénalités inactivité
- ✅ Rest Points (catch-up casual)
- ✅ Soft Cap 2,400 XP/semaine (évite hardcore domination)

**Combat Condensé** : Simulation <5s (showcase animations premium)

### 📊 KPIs & Success Metrics

**Launch (M1)** :
- 500+ downloads semaine 1
- 4.5⭐️+ App Store
- 60%+ D1 retention

**Product-Market Fit (M12)** :
- 5,000+ MAU
- **50%+ D30 retention** (KEY TARGET)
- NPS ≥40
- MRR 3,000€+

**Scale (M24)** :
- 25,000+ MAU
- 55%+ D30 retention
- MRR 15,000€+
- LTV/CAC >3:1

### 🚀 Avantages Compétitifs

**vs Zombies Run** :
- ✅ RPG complet (pas juste narrative)
- ✅ Direction artistique premium
- ✅ Social competitive (leaderboards)

**vs Habitica** :
- ✅ Immersion RPG profonde (lore, classes, cosmétiques)
- ✅ Fitness-first (pas habit tracker générique)
- ✅ Graphics 2D Puppet (vs pixel art basique)

**vs apps fitness classiques** :
- ✅ Gamification immersive (pas juste badges)
- ✅ Progression RPG (levels, stats, combat)
- ✅ Community competitive

**Atout majeur** : Seule app combinant **RPG premium + gamification scientifique + zero P2W + communauté competitive**

### 📎 Références
- GDD V3.2 Final : Discussion Telegram 2026-02-03
- Start dev : 1er novembre 2025
- Launch : Octobre 2026

---

_Dernière mise à jour : 2026-02-03_
