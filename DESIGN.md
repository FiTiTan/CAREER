# CareerCare Design System

> Charte graphique officielle — Toute instance doit respecter ces spécifications.

---

## 1. Philosophie

**CALM-UI** : Clean, Accessible, Light, Modern
- Interface épurée, professionnelle
- Pas d'émojis dans l'UI (icônes SVG uniquement)
- Light mode par défaut, dark mode supporté
- Accents de couleur subtils et ciblés

---

## 2. Couleurs

### 2.1 Backgrounds

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg-primary` | `#FAFAFA` | `#0F0F0F` | Fond de page |
| `--bg-secondary` | `#FFFFFF` | `#171717` | Cards, sections |
| `--bg-tertiary` | `#F5F5F5` | `#1F1F1F` | Éléments secondaires, inputs |
| `--bg-elevated` | `#FFFFFF` | `#262626` | Modals, popovers |

### 2.2 Textes

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--text-primary` | `#1A1A1A` | `#F5F5F5` | Titres, texte principal |
| `--text-secondary` | `#4A4A4A` | `#A3A3A3` | Sous-titres, descriptions |
| `--text-tertiary` | `#717171` | `#737373` | Labels, hints |
| `--text-muted` | `#9E9E9E` | `#525252` | Placeholders |

### 2.3 Bordures

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--border-light` | `#EBEBEB` | `#262626` | Séparateurs subtils |
| `--border-default` | `#E0E0E0` | `#333333` | Bordures standard |
| `--border-strong` | `#D0D0D0` | `#404040` | Bordures accentuées |

### 2.4 Actions primaires

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--anthracite` | `#2D2D2D` | `#FFFFFF` | Boutons primaires |
| `--anthracite-hover` | `#404040` | `#E5E5E5` | Hover boutons |

### 2.5 Accents de couleur

#### Teal (Principal)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--accent-teal` | `#0D9488` | Icônes, liens, accents |
| `--accent-teal-light` | `#14B8A6` | Hover, highlights |
| `--accent-teal-bg` | `#CCFBF1` (light) / `#134E4A` (dark) | Backgrounds subtils |

#### Violet (Secondaire)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--accent-violet` | `#7C3AED` | Accents secondaires, IA |
| `--accent-violet-light` | `#8B5CF6` | Hover |
| `--accent-violet-bg` | `#EDE9FE` (light) / `#2E1065` (dark) | Backgrounds |

#### Amber (Tertiaire)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--accent-amber` | `#D97706` | Warnings légers, highlights |
| `--accent-amber-light` | `#F59E0B` | Hover |
| `--accent-amber-bg` | `#FEF3C7` (light) / `#451A03` (dark) | Backgrounds |

### 2.6 Sémantiques

| Token | Valeur | Background | Usage |
|-------|--------|------------|-------|
| `--success` | `#16A34A` | `#DCFCE7` / `#14532D` | Succès, validations |
| `--warning` | `#CA8A04` | `#FEF9C3` / `#422006` | Avertissements |
| `--error` | `#DC2626` | `#FEE2E2` / `#450A0A` | Erreurs |

### 2.7 Scores (CV Analysis)

| Token | Valeur | Plage |
|-------|--------|-------|
| `--score-excellent` | `#16A34A` | 80-100 |
| `--score-good` | `#22C55E` | 65-79 |
| `--score-average` | `#EAB308` | 50-64 |
| `--score-poor` | `#F97316` | 35-49 |
| `--score-critical` | `#DC2626` | 0-34 |

---

## 3. Typographie

### 3.1 Police

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Poids disponibles** : 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### 3.2 Échelle typographique

| Élément | Taille | Poids | Line-height | Letter-spacing |
|---------|--------|-------|-------------|----------------|
| H1 (Hero) | `3rem` (48px) | 600 | 1.15 | -0.03em |
| H2 (Section) | `2.25rem` (36px) | 600 | 1.2 | -0.02em |
| H3 (Card title) | `1.25rem` (20px) | 600 | 1.4 | — |
| Body | `1rem` (16px) | 400 | 1.6 | — |
| Body small | `0.875rem` (14px) | 400 | 1.5 | — |
| Caption | `0.8125rem` (13px) | 400 | 1.5 | — |
| Label | `0.75rem` (12px) | 600 | 1.4 | 0.03em |
| Micro | `0.625rem` (10px) | 500 | 1.4 | 0.05em |

### 3.3 Labels & Headers de section

```css
/* Uppercase labels */
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--text-tertiary);
```

---

## 4. Espacements & Rayons

### 4.1 Border Radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `--radius-sm` | `0.25rem` (4px) | Petits éléments |
| `--radius-md` | `0.5rem` (8px) | Inputs, chips |
| `--radius-lg` | `0.75rem` (12px) | Cards internes |
| `--radius-xl` | `1rem` (16px) | Cards principales |
| `--radius-2xl` | `1.5rem` (24px) | Grandes sections |
| `--radius-pill` | `9999px` | Badges, boutons pill |

### 4.2 Espacements (Gap / Padding)

| Contexte | Valeur |
|----------|--------|
| Gap grille bento | `1rem` |
| Padding card | `1.5rem` |
| Padding section | `4rem 0` |
| Gap éléments internes | `0.75rem` |
| Margin entre sections | `6rem` |

---

## 5. Layout Bento Grid

### 5.1 Structure asymétrique (Zigzag)

```
┌──────────────┬─────────────────────────┐
│   Petit      │        Grand            │
│   (1fr)      │       (1.5fr)           │
├──────────────────────────┬─────────────┤
│        Grand             │   Petit     │
│       (1.5fr)            │   (1fr)     │
└──────────────────────────┴─────────────┘
```

### 5.2 CSS Reference

```css
.bento-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.bento-row {
    display: grid;
    gap: 1rem;
}

.bento-row-top {
    grid-template-columns: 1fr 1.5fr;
}

.bento-row-bottom {
    grid-template-columns: 1.5fr 1fr;
}

@media (max-width: 768px) {
    .bento-row { grid-template-columns: 1fr; }
}
```

### 5.3 Bento Box

```css
.bento-box {
    background: var(--bg-tertiary);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    border: 1px solid var(--border-light);
    width: 100%;
    height: 100%;
}
```

---

## 6. Composants

### 6.1 Boutons

#### Primaire (Anthracite)
```css
.btn-primary {
    background: var(--anthracite);
    color: white; /* ou var(--bg-primary) en dark */
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-pill);
    font-weight: 500;
    font-size: 0.9375rem;
}
.btn-primary:hover {
    background: var(--anthracite-hover);
}
```

#### Secondaire (Outline)
```css
.btn-secondary {
    background: transparent;
    border: 1px solid var(--border-default);
    color: var(--text-primary);
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-pill);
}
.btn-secondary:hover {
    background: var(--bg-tertiary);
}
```

### 6.2 Cards

```css
.card {
    background: var(--bg-secondary);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    border: 1px solid var(--border-light);
    box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.05);
}

/* Glass effect (pour headers, modals) */
.card-glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}
```

### 6.3 Inputs

```css
.input {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
}
.input:focus {
    border-color: var(--accent-teal);
    outline: none;
}
```

### 6.4 Badges

```css
.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.875rem;
    background: var(--accent-teal-bg);
    border-radius: var(--radius-pill);
    font-size: 0.8125rem;
    color: var(--accent-teal);
    font-weight: 500;
}
```

### 6.5 Score Bars

```css
.score-bar {
    height: 6px;
    background: var(--bg-tertiary);
    border-radius: var(--radius-pill);
    overflow: hidden;
}

.score-bar-fill {
    height: 100%;
    border-radius: var(--radius-pill);
    transition: width 0.5s ease;
}

.score-bar-fill.excellent { background: var(--score-excellent); }
.score-bar-fill.good { background: var(--score-good); }
.score-bar-fill.average { background: var(--score-average); }
.score-bar-fill.poor { background: var(--score-poor); }
.score-bar-fill.critical { background: var(--score-critical); }
```

### 6.6 Insight Cards

```css
.insight-item {
    padding: 0.75rem;
    border-radius: var(--radius-md);
}

.insight-item.success {
    background: var(--success-bg);
}

.insight-item.warning {
    background: var(--warning-bg);
}

/* PAS de border-left coloré */
```

---

## 7. Icônes

### 7.1 Règles

- **SVG uniquement** (pas d'émojis, pas de font icons)
- Style : Outline (stroke), pas fill
- Stroke-width : `1.5` ou `2`
- Tailles standards : `14px`, `16px`, `20px`, `24px`, `48px`

### 7.2 Icônes clés

```html
<!-- Document/Page -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
    <path d="M14 2v6h6"/>
    <path d="M16 13H8m8 4H8m2-8H8"/>
</svg>

<!-- Check -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 6L9 17l-5-5"/>
</svg>

<!-- Warning -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 9v2m0 4h.01"/>
</svg>
```

---

## 8. Effets & Animations

### 8.1 Transitions

```css
/* Standard */
transition: all 0.2s ease;

/* Backgrounds */
transition: background 0.3s, color 0.3s;
```

### 8.2 Shadows

```css
/* Card subtle */
box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.05);

/* Elevated */
box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.1);
```

### 8.3 Glow (optionnel, désactivé par défaut)

Si réactivé :
- Opacity : `0.03` max
- Blur : `100-120px`
- Position : coins opposés (bas-gauche + haut-droite)

---

## 9. Responsive Breakpoints

| Breakpoint | Valeur | Comportement |
|------------|--------|--------------|
| Mobile | `< 640px` | 1 colonne, padding réduit |
| Tablet | `< 768px` | Bento → 1 colonne |
| Desktop | `≥ 768px` | Layout complet |

---

## 10. Container

```css
.container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 1.5rem;
}
```

---

## 11. Checklist de conformité

Avant chaque PR/commit UI :

- [ ] Aucun émoji dans l'interface
- [ ] Couleurs via CSS variables uniquement
- [ ] Icônes SVG outline (pas de fill)
- [ ] Border-radius via tokens
- [ ] Typographie Inter avec poids corrects
- [ ] Dark mode compatible
- [ ] Bento layout asymétrique respecté
- [ ] Pas de border-left coloré sur cards
- [ ] Transitions smooth (0.2-0.3s)

---

## 12. Fichiers de référence

- `preview-ui.html` — Démo complète
- `DESIGN.md` — Ce document (source of truth)

---

*Version 1.0 — Février 2026*
*CareerCare Design System*
