# PRD-009 : Vitrine Lieu

## 1. Objectif

Créer une page vitrine générique pour tout type de lieu (commerce, agence, cabinet, association...), servant de page de première intention.

## 2. Informations affichées

### 2.1 Obligatoire sur vitrine (tous types)
- Nom / Raison sociale
- Adresse
- Téléphone
- Email

*C'est tout. Les obligations réglementaires spécifiques (RCS, cartes pro, RNA, etc.) → page mentions légales via lien footer.*

### 2.2 Optionnel (proposé selon type)
| Type | Champs suggérés |
|------|-----------------|
| Commerce | Horaires, photos ambiance |
| Immo | Zone géographique |
| Cabinet | Domaines d'intervention |
| Asso | Mission / objet social |

### 2.3 Commun optionnel
- Logo
- Photo de couverture
- Description courte
- Lien site web
- Réseaux sociaux

### 2.3 Contenu dynamique
- Liste des annonces actives de l'agence
- Statistiques (nombre de biens, ventes récentes)
- Avis clients (si disponibles)

## 3. Structure de la page

```
┌─────────────────────────────────────────┐
│ Header : Logo + Nom agence              │
├─────────────────────────────────────────┤
│ Bandeau : Photo vitrine/équipe          │
├─────────────────────────────────────────┤
│ Infos contact :                         │
│ • Adresse                               │
│ • Téléphone                             │
│ • Email                                 │
│ • Horaires (optionnel)                  │
├─────────────────────────────────────────┤
│ Description agence (optionnel)          │
├─────────────────────────────────────────┤
│ Nos annonces : [Grille de biens]        │
├─────────────────────────────────────────┤
│ Footer : Lien mentions légales          │
└─────────────────────────────────────────┘
```

## 4. Modèle de données

```typescript
interface AgencyProfile {
  // Obligatoire
  id: string;
  name: string;              // Raison sociale
  legalForm: string;         // Forme juridique (SARL, SAS, etc.)
  address: Address;          // Siège social
  phone: string;
  email: string;
  
  // Optionnel (vitrine)
  logo?: string;
  coverImage?: string;
  description?: string;
  foundedYear?: number;
  serviceArea?: string[];
  openingHours?: OpeningHours;
  
  // Mentions légales (page séparée)
  legalDetails: {
    rcs: string;
    professionalCards: ProfessionalCard[];
    financialGuarantee: FinancialGuarantee;
    mediator: MediatorInfo;
  };
}
```

## 5. Routes

- `/agence/:slug` — Page vitrine publique
- `/agence/:slug/mentions-legales` — Mentions légales complètes

## 6. Hors scope (v1)

- Système de prise de RDV
- Chat intégré
- Gestion multi-agences (réseau)
- Édition de la vitrine par l'agence

## 7. Critères de succès

- Page charge en < 2s
- Toutes les infos légales obligatoires visibles
- Lien vers mentions légales accessible
- Navigation fluide vers les annonces
- Responsive mobile-first
