// ============================================================
// Portfolio Maître — Enrichissement IA via DeepSeek
// Génère le contenu enrichi à partir des données du formulaire
// ============================================================

import type {
  PortfolioFormData,
  EnrichedPortfolioData,
  ProfileContext,
  EnrichmentRequest,
  EnrichmentResponse,
} from './types';
import { getLabelsForContext } from './labels';

/**
 * Prompt système pour DeepSeek
 */
const buildSystemPrompt = (profileContext: ProfileContext): string => {
  const contextDescriptions: Record<ProfileContext, string> = {
    tech: 'Profil tech/digital : développeur, designer, data analyst. Vocabulaire technique, projets tech, technologies utilisées.',
    food: 'Restaurant/café/boulangerie : vocabulaire cuisine, ambiance, plats, expérience client, savoir-faire culinaire.',
    artisan: 'Artisan/prestataire : plombier, électricien, menuisier. Vocabulaire métier, savoir-faire, réalisations concrètes, avant/après.',
    service: 'Professionnel de services : avocat, consultant, coach. Vocabulaire professionnel, cas clients, expertise, méthodologie.',
    retail: 'Commerce/boutique : vocabulaire produits, sélection, expérience client, service personnalisé.',
    junior: 'Étudiant/junior : vocabulaire projets académiques, compétences acquises, formation, motivation, potentiel.',
    niche: 'Métier créatif/spécialisé : tatoueur, photographe, DJ. Vocabulaire créatif, univers artistique, portfolio visuel.',
  };

  return `Tu es un expert en création de portfolios professionnels et en copywriting.

CONTEXTE DU PROFIL : ${profileContext}
${contextDescriptions[profileContext]}

RÈGLES STRICTES :
1. Adapte le TON et le VOCABULAIRE au contexte métier détecté
2. N'invente JAMAIS de réalisations ou de faits si non fournis
3. PAS d'émojis dans le contenu généré (SVG icons uniquement dans le HTML)
4. Génère un texte "About" riche de 500-800 mots qui raconte une histoire
5. Enrichis les descriptions de services (3-4 phrases par service)
6. Si des projets sont fournis, enrichis leurs descriptions
7. Retourne UNIQUEMENT du JSON valide, sans markdown

ADAPTATION DU TON :
- Tech : Précis, technique, moderne, orienté résultats
- Food : Chaleureux, sensoriel, passion, authenticité
- Artisan : Pragmatique, savoir-faire, fiabilité, expertise terrain
- Service : Professionnel, rassurant, expertise, accompagnement
- Junior : Dynamique, motivation, apprentissage, potentiel

FORMAT DE SORTIE (JSON) :
{
  "heroTitle": "string",
  "heroSubtitle": "string",
  "heroEyebrow": "string",
  "heroCta": "string",
  "aboutText": "string (500-800 mots)",
  "valueProp": "string",
  "services": [
    {
      "title": "string",
      "description": "string (3-4 phrases enrichies)"
    }
  ],
  "servicesLabel": "string",
  "projects": [
    {
      "title": "string",
      "description": "string",
      "category": "string"
    }
  ],
  "projectsLabel": "string"
}`;
};

/**
 * Construit le prompt utilisateur avec les données du formulaire
 */
const buildUserPrompt = (formData: PortfolioFormData, importedText?: string): string => {
  let prompt = `Génère le contenu enrichi pour ce portfolio :\n\n`;

  // Identité
  prompt += `NOM : ${formData.name}\n`;
  prompt += `TYPE : ${formData.profileType === 'person' ? 'Personne' : 'Lieu'}\n`;
  prompt += `MÉTIER/ACTIVITÉ : ${formData.title}\n`;
  prompt += `SLOGAN : ${formData.tagline}\n`;
  prompt += `EXPERTISES : ${formData.expertises.filter(e => e).join(', ')}\n`;
  
  if (formData.differentiation) {
    prompt += `DIFFÉRENCIATION : ${formData.differentiation}\n`;
  }

  // Offre
  prompt += `\nSERVICES :\n`;
  formData.services.filter(s => s).forEach((service, i) => {
    prompt += `  ${i + 1}. ${service}\n`;
  });

  if (formData.valueProp) {
    prompt += `\nPROPOSITION DE VALEUR : ${formData.valueProp}\n`;
  }

  // Projets/Réalisations
  if (formData.projects.length > 0) {
    prompt += `\nRÉALISATIONS :\n`;
    formData.projects.forEach((project, i) => {
      prompt += `  ${i + 1}. ${project.title}`;
      if (project.description) prompt += ` - ${project.description}`;
      if (project.category) prompt += ` [${project.category}]`;
      prompt += `\n`;
    });
  }

  // Contact (pour contexte)
  if (formData.address) {
    prompt += `\nADRESSE : ${formData.address}\n`;
  }
  if (formData.openingHours) {
    prompt += `HORAIRES : ${formData.openingHours}\n`;
  }

  // Texte importé (LinkedIn, site web, PDF)
  if (importedText && importedText.trim().length > 0) {
    prompt += `\nTEXTE IMPORTÉ (à utiliser pour enrichir le contenu) :\n${importedText}\n`;
  }

  prompt += `\nGénère maintenant le JSON complet avec le contenu enrichi.`;

  return prompt;
};

/**
 * Appel à l'API DeepSeek pour enrichissement
 */
export const enrichPortfolioWithAI = async (
  request: EnrichmentRequest
): Promise<EnrichmentResponse> => {
  const startTime = Date.now();

  try {
    const { formData, profileContext, importedText } = request;

    // Construire les prompts
    const systemPrompt = buildSystemPrompt(profileContext);
    const userPrompt = buildUserPrompt(formData, importedText);

    // Appel à l'API DeepSeek via notre route API
    const response = await fetch('/api/portfolio/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemPrompt,
        userPrompt,
        profileContext,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Erreur lors de l\'enrichissement IA');
    }

    const result = await response.json();

    // Récupérer les labels dynamiques
    const labels = getLabelsForContext(profileContext);

    // Construire l'EnrichedPortfolioData
    const enrichedData: EnrichedPortfolioData = {
      ...result.enrichedData,
      email: formData.email,
      phone: formData.phone || undefined,
      address: formData.address || undefined,
      openingHours: formData.openingHours || undefined,
      socialLinks: formData.socialLinks.map(link => ({
        platform: link.platform,
        url: link.url,
        label: link.label || link.platform,
      })),
      socialIsMain: formData.socialLinks.length > 3,
      servicesLabel: labels.services,
      projectsLabel: labels.realisations,
    };

    const processingTime = Date.now() - startTime;

    return {
      enrichedData,
      tokensUsed: result.tokensUsed || 0,
      processingTime,
    };
  } catch (error) {
    console.error('[Portfolio Enrichment] Error:', error);
    throw error;
  }
};

/**
 * Enrichissement en mode dégradé (sans IA, fallback)
 * Utilisé si l'API DeepSeek est indisponible ou en cas d'erreur
 */
export const fallbackEnrichment = (
  formData: PortfolioFormData,
  profileContext: ProfileContext
): EnrichedPortfolioData => {
  const labels = getLabelsForContext(profileContext);

  return {
    heroTitle: formData.name,
    heroSubtitle: formData.tagline,
    heroEyebrow: formData.title,
    heroCta: labels.ctaContact,
    aboutText: formData.differentiation || formData.valueProp || formData.tagline,
    valueProp: formData.valueProp,
    services: formData.services.filter(s => s).map(s => ({
      title: s,
      description: `Service professionnel de qualité dans le domaine ${s}.`,
    })),
    servicesLabel: labels.services,
    projects: formData.projects.map(p => ({
      title: p.title,
      description: p.description || '',
      category: p.category || '',
      image: p.image,
      link: p.link,
    })),
    projectsLabel: labels.realisations,
    email: formData.email,
    phone: formData.phone || undefined,
    address: formData.address || undefined,
    openingHours: formData.openingHours || undefined,
    socialLinks: formData.socialLinks.map(link => ({
      platform: link.platform,
      url: link.url,
      label: link.label || link.platform,
    })),
    socialIsMain: formData.socialLinks.length > 3,
  };
};
