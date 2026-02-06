// ============================================================
// Portfolio Maître — Détection du Contexte Métier
// Détecte automatiquement le contexte (food, tech, artisan...)
// ============================================================

import type { ProfileContext, ProfileContextDetection } from './types';

/**
 * Mots-clés par contexte pour détection rapide
 */
const CONTEXT_KEYWORDS: Record<ProfileContext, string[]> = {
  food: [
    'restaurant', 'café', 'boulangerie', 'pâtisserie', 'traiteur',
    'cuisine', 'chef', 'cuisinier', 'bar', 'bistro', 'brasserie',
    'food truck', 'snack', 'épicerie', 'alimentation', 'gastronomie',
  ],
  retail: [
    'boutique', 'magasin', 'commerce', 'fleuriste', 'librairie',
    'vente', 'détaillant', 'shop', 'showroom', 'concept store',
    'épicerie', 'mercerie', 'bijouterie', 'parfumerie',
  ],
  artisan: [
    'plombier', 'électricien', 'menuisier', 'maçon', 'peintre',
    'charpentier', 'serrurier', 'vitrier', 'couvreur', 'carreleur',
    'chauffagiste', 'jardinier', 'paysagiste', 'artisan', 'bricolage',
    'rénovation', 'dépannage', 'installation',
  ],
  service: [
    'avocat', 'notaire', 'comptable', 'expert-comptable', 'conseil',
    'consultant', 'coaching', 'coach', 'thérapeute', 'psychologue',
    'formation', 'formateur', 'audit', 'juridique', 'administratif',
    'immobilier', 'assurance', 'finance', 'gestion',
  ],
  tech: [
    'développeur', 'développeuse', 'dev', 'programmeur', 'coder',
    'full-stack', 'front-end', 'backend', 'web developer',
    'designer', 'ux', 'ui', 'graphiste', 'infographiste',
    'webdesigner', 'motion', 'vidéaste', 'monteur',
    'data', 'devops', 'sysadmin', 'cybersécurité', 'it',
  ],
  junior: [
    'étudiant', 'étudiante', 'stagiaire', 'alternance', 'apprenti',
    'junior', 'débutant', 'jeune diplômé', 'premier emploi',
    'stage', 'recherche stage', 'recherche alternance',
  ],
  niche: [
    'tatoueur', 'tatoueuse', 'dj', 'musicien', 'artiste',
    'photographe', 'illustrateur', 'influenceur', 'créateur',
    'sophrologue', 'ostéopathe', 'yoga', 'bien-être',
  ],
};

/**
 * Détecte le contexte métier à partir du titre/métier
 * @param title - Métier ou activité de l'utilisateur
 * @param isPlace - Si c'est un lieu (true) ou une personne (false)
 */
export const detectProfileContext = (
  title: string,
  isPlace: boolean
): ProfileContextDetection => {
  const normalizedTitle = title.toLowerCase().trim();

  // Parcourir les contextes et compter les matches
  let bestMatch: ProfileContext = 'niche';
  let highestScore = 0;

  for (const [context, keywords] of Object.entries(CONTEXT_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (normalizedTitle.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = context as ProfileContext;
    }
  }

  // Déterminer la confiance
  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (highestScore >= 2) confidence = 'high';
  else if (highestScore === 1) confidence = 'medium';

  // Les lieux sont souvent food ou retail
  if (isPlace && (bestMatch === 'tech' || bestMatch === 'service')) {
    if (normalizedTitle.includes('agence')) {
      confidence = 'medium';
    } else {
      bestMatch = 'retail'; // Fallback pour les lieux
      confidence = 'low';
    }
  }

  return {
    context: bestMatch,
    confidence,
    isPlace,
  };
};

/**
 * Récupère une description du contexte (pour debug/UI)
 */
export const getContextDescription = (context: ProfileContext): string => {
  const descriptions: Record<ProfileContext, string> = {
    food: 'Restaurant, café, boulangerie, traiteur...',
    retail: 'Boutique, commerce, fleuriste, librairie...',
    artisan: 'Plombier, électricien, menuisier, paysagiste...',
    service: 'Avocat, consultant, coach, expert-comptable...',
    tech: 'Développeur, designer, graphiste, data analyst...',
    junior: 'Étudiant, stagiaire, jeune diplômé...',
    niche: 'Tatoueur, photographe, DJ, sophrologue...',
  };
  return descriptions[context];
};
