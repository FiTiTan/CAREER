# CALM-UI Design System

**Source:** `/home/ubuntu/clawd/SOUVERAIN/src/components/ui.tsx` + `/home/ubuntu/clawd/SOUVERAIN/src/design-system.ts`

## Core Principles

1. **Theme Tokens Only** - Never hardcode colors, use `theme.*`
2. **Spacing System** - Use `theme.spacing.*` (xs/sm/md/lg/xl/2xl)
3. **Typography Tokens** - Use `theme.typography.*` (fontSize, fontWeight, fontFamily)
4. **Border Radius** - Use `theme.borderRadius.*` (sm/md/lg/xl/full)
5. **Transitions** - Use `theme.transitions.*` (fast/normal)
6. **No Tailwind** except for custom animations already defined
7. **React.memo** for heavy components

## Available Components

### Layout
- **BentoBox** - Grid container (columns, gap)
- **BentoCard** - Individual cards (span, rowSpan, padding)

### Data Display
- **ScoreCircle** - Circular score (sm/md/lg/xl)
- **ScoreBar** - Progress bar with label
- **Tag** - Badges (variants: default/success/warning/error/info/accent)
- **DocumentPreview** - PDF preview component

### Navigation
- **SectionHeader** - Section titles (icon, subtitle, action)
- **Button** - Buttons (variants: primary/secondary/ghost)

### Controls
- **ToggleSwitch** - Dark mode toggle

### Utility
- **Divider** - Horizontal separator

## Theme Tokens Reference

### Colors
```typescript
theme.background.primary      // Main background
theme.background.secondary    // Cards, sections
theme.background.tertiary     // Hover states
theme.text.primary           // Main text
theme.text.secondary         // Muted text
theme.text.inverse           // Text on dark backgrounds
theme.accent.primary         // Brand color
theme.accent.secondary       // Secondary brand
theme.border.default         // Default borders
```

### Spacing
```typescript
theme.spacing.xs   // 8px
theme.spacing.sm   // 12px
theme.spacing.md   // 16px
theme.spacing.lg   // 24px
theme.spacing.xl   // 32px
theme.spacing.2xl  // 48px
```

### Typography
```typescript
theme.typography.fontSize.xs
theme.typography.fontSize.sm
theme.typography.fontSize.base
theme.typography.fontSize.lg
theme.typography.fontSize.xl
theme.typography.fontSize.2xl
theme.typography.fontWeight.normal
theme.typography.fontWeight.medium
theme.typography.fontWeight.semibold
theme.typography.fontWeight.bold
```

## Component Performance

### Heavy Components (MUST use React.memo)
- PortfolioCard
- VaultDocumentCard
- OnboardingSlide
- DeveloperTemplate
- MinimalTemplate
- ModernTemplate
- VisualTemplate

## Migration Patterns

### ❌ Before (Hardcoded)
```tsx
<div style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
```

### ✅ After (Theme Tokens)
```tsx
<div style={{ backgroundColor: theme.background.primary, color: theme.text.primary }}>
```

### ❌ Before (No memo)
```tsx
export const HeavyComponent = () => { ... }
```

### ✅ After (With memo)
```tsx
export const HeavyComponent = React.memo(() => { ... });
```
