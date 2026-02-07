// ============================================================
// Portfolio Maître — Types TypeScript
// Générateur de sites portfolio via wizard + IA
// ============================================================

/**
 * Type de profil : Personne ou Lieu
 */
export type ProfileType = 'person' | 'place';

/**
 * Contexte métier détecté automatiquement par l'IA
 */
export type ProfileContext =
  | 'food'      // Restaurant, café, boulangerie...
  | 'retail'    // Boutique, fleuriste, librairie...
  | 'artisan'   // Plombier, électricien, menuisier...
  | 'service'   // Avocat, coach, comptable...
  | 'tech'      // Développeur, designer, graphiste...
  | 'junior'    // Étudiant, junior en recherche
  | 'niche';    // Tatoueur, DJ, sophrologue...

/**
 * Plateformes sociales supportées
 */
export type SocialPlatform =
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'youtube'
  | 'behance'
  | 'github'
  | 'dribbble'
  | 'twitter'
  | 'facebook'
  | 'malt'
  | 'pinterest'
  | 'other';

/**
 * Lien social avec plateforme
 */
export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string; // Pour "other"
}

/**
 * Projet / Réalisation
 */
export interface Project {
  id?: string;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  link?: string;
}

/**
 * Source d'import (LinkedIn, site web, PDF)
 */
export interface ImportSource {
  type: 'linkedin' | 'website' | 'pdf';
  url?: string;
  file?: File;
  extractedText?: string;
}

/**
 * Média (image)
 */
export interface Media {
  dataUrl: string;
  filename?: string;
  alt?: string;
  size?: number;
}

/**
 * Données du formulaire wizard (input utilisateur)
 */
export interface PortfolioFormData {
  // Step 1: Identité
  portfolioId: string;
  name: string;
  profileType: ProfileType | null;
  profileContext: ProfileContext | null;
  title: string;               // Métier / Activité
  expertises: string[];        // 3 spécialités
  tagline: string;             // Slogan / Accroche
  differentiation: string;     // Ce qui différencie
  
  // Détection IA du secteur
  detectedSector?: string;
  sectorConfidence?: number;
  sectorTips?: string[];

  // Step 2: Offre
  services: string[];
  valueProp: string;

  // Step 3: Contact
  email: string;
  phone: string;
  address: string;
  openingHours: string;

  // Step 4: Contenu
  importSources: ImportSource[];
  projects: Project[];

  // Step 5: Template
  templateId: string | null;

  // Media & Social
  media: Media[];
  imageAssignments: Record<string, string>; // zone → dataUrl
  socialLinks: SocialLink[];
}

/**
 * Données enrichies par l'IA (output DeepSeek)
 */
export interface EnrichedPortfolioData {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  heroCta: string;

  // About
  aboutText: string;        // 500-800 mots, enrichi par IA
  aboutImage?: string;
  valueProp: string;

  // Services (générés/enrichis par IA)
  services: {
    title: string;
    description: string;
    icon?: string;          // SVG inline (pas d'émojis !)
  }[];
  servicesLabel: string;    // Dynamique selon profileContext

  // Projects/Réalisations
  projects: {
    title: string;
    description: string;
    category: string;
    image?: string;
    link?: string;
  }[];
  projectsLabel: string;    // "Projets", "Réalisations", "Plats", etc.

  // Contact
  email: string;
  phone?: string;
  address?: string;
  openingHours?: string;

  // Social
  socialLinks: {
    platform: string;
    url: string;
    label: string;
  }[];
  socialIsMain: boolean;    // Si réseaux sociaux = showcase principal
}

/**
 * Métadonnées d'un template
 */
export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: 'free' | 'premium';
  price: number;
  version: string;
  author: string;
  tags: string[];
  idealFor: string[];
  thumbnailUrl: string;
  sections: {
    obligatoires: string[];
    optionnelles: string[];
  };
}

/**
 * Registre des templates (index.json)
 */
export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  file: string;
  category: 'free' | 'premium';
  price: number;
  tags: string[];
  idealFor: string[];
}

export interface TemplateRegistry {
  version: string;
  templates: TemplateInfo[];
}

/**
 * Détection du contexte métier par l'IA
 */
export interface ProfileContextDetection {
  context: ProfileContext;
  confidence: 'high' | 'medium' | 'low';
  isPlace: boolean;
}

/**
 * Détection IA du secteur (via DeepSeek)
 */
export interface SectorDetection {
  sector: string;
  subCategory: string;
  confidence: number;
  suggestedLabels: {
    services?: string;
    projects?: string;
  };
  tips: string[];
}

/**
 * Requête de détection de secteur
 */
export interface DetectSectorRequest {
  profileType: 'person' | 'place';
  title?: string;
  placeName?: string;
  placeType?: string;
  address?: string;
  socialLinks?: string[];
  tagline?: string;
}

/**
 * Labels dynamiques selon le contexte
 */
export interface PortfolioLabels {
  services: string;
  realisations: string;
  realisationsSubtitle: string;
  ctaContact: string;
  aboutTitle: string;
}

/**
 * Requête d'enrichissement IA
 */
export interface EnrichmentRequest {
  formData: PortfolioFormData;
  profileContext: ProfileContext;
  importedText?: string;
}

/**
 * Réponse d'enrichissement IA
 */
export interface EnrichmentResponse {
  enrichedData: EnrichedPortfolioData;
  tokensUsed: number;
  processingTime: number;
}

/**
 * Portfolio sauvegardé en base
 */
export interface PortfolioRecord {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  data: EnrichedPortfolioData;
  template: string;
  published: boolean;
  custom_domain?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Options de publication
 */
export interface PublishOptions {
  slug: string;
  customDomain?: string;
  enableSeo: boolean;
}

/**
 * Validation par étape
 */
export const validateStep1 = (data: PortfolioFormData): boolean => {
  return (
    data.name.trim().length > 0 &&
    data.profileType !== null &&
    data.title.trim().length > 0 &&
    data.tagline.trim().length > 0 &&
    data.tagline.length <= 150 &&
    data.expertises.filter(e => e.trim().length > 0).length >= 3
  );
};

export const validateStep2 = (data: PortfolioFormData): boolean => {
  return (
    data.services.filter(s => s.trim().length > 0).length >= 3 &&
    data.valueProp.trim().length > 0
  );
};

export const validateStep3 = (data: PortfolioFormData): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(data.email);
};

export const validateStep4 = (data: PortfolioFormData): boolean => {
  return true; // Contenu optionnel
};

export const validateStep5 = (data: PortfolioFormData): boolean => {
  return data.templateId !== null;
};

/**
 * Initialisation des données du formulaire
 */
export const initialPortfolioFormData: PortfolioFormData = {
  portfolioId: '',
  name: '',
  profileType: null,
  profileContext: null,
  title: '',
  expertises: ['', '', ''],
  tagline: '',
  differentiation: '',
  detectedSector: undefined,
  sectorConfidence: undefined,
  sectorTips: undefined,
  services: ['', '', ''],
  valueProp: '',
  email: '',
  phone: '',
  address: '',
  openingHours: '',
  importSources: [],
  projects: [],
  templateId: null,
  media: [],
  imageAssignments: {},
  socialLinks: [],
};
