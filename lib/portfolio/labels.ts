// ============================================================
// Portfolio Maître — Labels Dynamiques
// Adapte le vocabulaire selon le contexte métier
// ============================================================

import type { ProfileContext, PortfolioLabels } from './types';

/**
 * Labels dynamiques selon le profileContext
 * Le vocabulaire s'adapte automatiquement au métier
 */
export const PORTFOLIO_LABELS: Record<ProfileContext, PortfolioLabels> = {
  tech: {
    services: 'Services',
    realisations: 'Projets',
    realisationsSubtitle: 'Découvrez mes réalisations',
    ctaContact: 'Discutons de votre projet',
    aboutTitle: 'À propos',
  },
  service: {
    services: "Domaines d'intervention",
    realisations: 'Références',
    realisationsSubtitle: 'Quelques cas accompagnés',
    ctaContact: 'Prendre rendez-vous',
    aboutTitle: 'Mon approche',
  },
  artisan: {
    services: 'Prestations',
    realisations: 'Réalisations',
    realisationsSubtitle: 'Nos derniers travaux',
    ctaContact: 'Demander un devis',
    aboutTitle: 'Notre savoir-faire',
  },
  food: {
    services: 'Nos spécialités',
    realisations: 'Nos plats signatures',
    realisationsSubtitle: 'Découvrez notre carte',
    ctaContact: 'Réserver une table',
    aboutTitle: 'Notre histoire',
  },
  retail: {
    services: 'Nos services',
    realisations: 'Nos produits',
    realisationsSubtitle: 'Notre sélection',
    ctaContact: 'Nous contacter',
    aboutTitle: 'Notre boutique',
  },
  junior: {
    services: 'Compétences',
    realisations: 'Expériences & Projets',
    realisationsSubtitle: 'Mon parcours',
    ctaContact: 'Me contacter',
    aboutTitle: 'Qui suis-je',
  },
  niche: {
    services: 'Services',
    realisations: 'Portfolio',
    realisationsSubtitle: 'Mes créations',
    ctaContact: 'Prendre contact',
    aboutTitle: 'À propos',
  },
};

/**
 * Récupère les labels pour un contexte donné
 */
export const getLabelsForContext = (context: ProfileContext | null): PortfolioLabels => {
  if (!context) {
    return PORTFOLIO_LABELS.niche; // Fallback par défaut
  }
  return PORTFOLIO_LABELS[context];
};

/**
 * Récupère le label pour les services
 */
export const getServicesLabel = (context: ProfileContext | null): string => {
  return getLabelsForContext(context).services;
};

/**
 * Récupère le label pour les réalisations
 */
export const getRealisationsLabel = (context: ProfileContext | null): string => {
  return getLabelsForContext(context).realisations;
};

/**
 * Récupère le CTA de contact adapté
 */
export const getContactCTA = (context: ProfileContext | null): string => {
  return getLabelsForContext(context).ctaContact;
};
