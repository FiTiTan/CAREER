# 📱 APP CONCEPTS - Système de Gestion

Dossier centralisé pour tous tes concepts d'applications mobiles.

---

## 🎯 OBJECTIF

Capitaliser sur tes idées d'apps, les scorer, les prioriser, et décider lesquelles lancer.

**Formule priorité :**
```
Priorité = Potentiel (0-10) ÷ Difficulté (0-10)

> 2.0  = 🔥 PRIORITÉ HAUTE (lance maintenant)
1.5-2.0 = ⭐ PRIORITÉ MOYENNE (attends bon timing)
< 1.5  = 💤 PRIORITÉ BASSE (side-project quand temps libre)
```

---

## 📂 STRUCTURE

```
APP-CONCEPTS/
├── README.md              ← Tu es ici
├── INDEX.md               ← Liste tous concepts par priorité
├── TEMPLATE.md            ← Template pour nouveaux concepts
├── 01-PRIVACY-GUARDIAN.md ← Concept #1
├── 02-NOM-CONCEPT.md      ← Concept #2
└── ...
```

---

## 🚀 COMMENT UTILISER

### 1️⃣ **Lister tous les concepts**

Demande à Claude :
```
"On a quoi comme concepts app ?"
```

→ Il te liste par ordre de priorité (potentiel ÷ difficulté)

### 2️⃣ **Ajouter un nouveau concept**

Demande à Claude :
```
"Ajoute un concept app : [description de ton idée]"
```

→ Il créera automatiquement :
- Nouveau fichier `XX-NOM-CONCEPT.md`
- Remplira le template avec scoring
- Mettra à jour `INDEX.md`

### 3️⃣ **Consulter un concept**

Demande :
```
"Ouvre le concept Privacy Guardian"
```

→ Détails complets : marché, business model, roadmap, risques

### 4️⃣ **Mettre à jour un concept**

Demande :
```
"Update Privacy Guardian : marché passé de $12B à $15B"
```

→ Claude met à jour le fichier + recalcule priorité si nécessaire

---

## 📊 SCORING GUIDE

### Potentiel Marché (0-10)

| Score | Taille marché | Croissance |
|-------|---------------|------------|
| 9-10 | $10B+ | >25%/an |
| 7-8 | $1-10B | 15-25%/an |
| 5-6 | $100M-1B | 10-15%/an |
| 3-4 | $10-100M | 5-10%/an |
| 1-2 | <$10M | <5%/an |

### Difficulté Technique (0-10)

| Score | Complexité | Temps MVP |
|-------|------------|-----------|
| 9-10 | Très hard (ML, blockchain, hardware) | >12 mois |
| 7-8 | Hard (temps réel, scaling complexe) | 6-12 mois |
| 5-6 | Medium (intégrations multiples) | 3-6 mois |
| 3-4 | Easy (CRUD + APIs standard) | 1-3 mois |
| 1-2 | Trivial (no-code possible) | <1 mois |

### Différenciation (0-10)

| Score | USP |
|-------|-----|
| 9-10 | Nouveau marché, 0 concurrent |
| 7-8 | Feature killer que personne n'a |
| 5-6 | Meilleure exécution marché existant |
| 3-4 | Légère différenciation |
| 1-2 | Me-too product |

---

## 🎯 CRITÈRES VALIDATION

Avant de lancer, un concept doit avoir :

✅ **Business :**
- [ ] Priorité > 1.5
- [ ] Marché > $100M
- [ ] CAC < LTV (viable économiquement)
- [ ] Time to market < 6 mois

✅ **Technique :**
- [ ] Stack maîtrisée ou apprenable rapidement
- [ ] Pas de blockers techniques insurmontables

✅ **Risques :**
- [ ] Risques critiques mitigables
- [ ] Pas de dépendance forte à 1 vendor (kill switch)

✅ **Personnel :**
- [ ] Passion pour le sujet (tu vas y passer 1-2 ans)
- [ ] Compétences existantes ou manque comblable

---

## 📈 WORKFLOW IDÉAL

```
1. IDÉE
   ↓
2. CRÉATION CONCEPT (Template)
   ↓
3. SCORING (Potentiel, Difficulté, Différenciation)
   ↓
4. PRIORITÉ CALCULÉE
   ↓
5. SI > 2.0 → VALIDATION (20 interviews users)
   ↓
6. SI VALIDÉ → MVP (3-6 mois)
   ↓
7. LAUNCH → ITERATE → SCALE ou PIVOT
```

---

## 💡 EXEMPLES SCORING

**Privacy Guardian :**
- Potentiel : 9/10 (marché $12B, croissance 25%)
- Difficulté : 4/10 (React Native + APIs standard, 3 mois MVP)
- Priorité : **2.25** → 🔥 LANCE

**App hypothétique blockchain AI :**
- Potentiel : 7/10 (marché $2B, hype mais incertain)
- Difficulté : 9/10 (ML + blockchain + 12 mois dev)
- Priorité : **0.78** → 💤 BASSE

---

## 🗂️ COMMANDES RAPIDES CLAUDE

```bash
# Lister concepts par priorité
"On a quoi comme concepts app ?"

# Ajouter concept
"Ajoute concept : app pour tracker sommeil avec ML"

# Détails concept
"Montre-moi Privacy Guardian"

# Update scoring
"Update Privacy Guardian : difficulté passe à 3/10"

# Comparer 2 concepts
"Compare Privacy Guardian vs [autre concept]"

# Archiver concept
"Archive [nom concept] : raison XYZ"
```

---

## 📝 CHANGELOG

- **2026-02-03 :** Création système + Privacy Guardian concept
- **YYYY-MM-DD :** [Prochain ajout]

---

**Prêt à capturer tes meilleures idées et décider lesquelles lancer ! 🚀**
