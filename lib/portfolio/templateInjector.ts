// ============================================================
// Portfolio Maître — Injection de Templates
// Remplace les marqueurs {{...}} dans le HTML du template
// ============================================================

import type { EnrichedPortfolioData } from './types';

/**
 * Échappe les caractères HTML pour éviter les injections
 */
const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Génère le HTML d'un service
 */
const renderService = (service: EnrichedPortfolioData['services'][0]): string => {
  return `
    <div class="service-item">
      ${service.icon ? `<div class="service-icon">${service.icon}</div>` : ''}
      <h3 class="service-title">${escapeHtml(service.title)}</h3>
      <p class="service-description">${escapeHtml(service.description)}</p>
    </div>
  `.trim();
};

/**
 * Génère le HTML des services
 */
const renderServices = (services: EnrichedPortfolioData['services']): string => {
  return services.map(renderService).join('\n      ');
};

/**
 * Génère le HTML d'un projet
 */
const renderProject = (project: EnrichedPortfolioData['projects'][0]): string => {
  return `
    <div class="project-card">
      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="project-image">` : ''}
      <div class="project-content">
        ${project.category ? `<span class="project-category">${escapeHtml(project.category)}</span>` : ''}
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        ${project.description ? `<p class="project-description">${escapeHtml(project.description)}</p>` : ''}
        ${project.link ? `<a href="${escapeHtml(project.link)}" class="project-link" target="_blank" rel="noopener">Voir le projet →</a>` : ''}
      </div>
    </div>
  `.trim();
};

/**
 * Génère le HTML des projets
 */
const renderProjects = (projects: EnrichedPortfolioData['projects']): string => {
  if (projects.length === 0) return '';
  return projects.map(renderProject).join('\n      ');
};

/**
 * Génère le HTML d'un lien social
 */
const renderSocialLink = (link: EnrichedPortfolioData['socialLinks'][0]): string => {
  return `<a href="${escapeHtml(link.url)}" class="social-link" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`;
};

/**
 * Génère le HTML des liens sociaux
 */
const renderSocialLinks = (socialLinks: EnrichedPortfolioData['socialLinks']): string => {
  if (socialLinks.length === 0) return '';
  return socialLinks.map(renderSocialLink).join('\n          ');
};

/**
 * Traite les blocs REPEAT
 * <!-- REPEAT: services -->...<!-- END REPEAT: services -->
 */
const processRepeatBlocks = (html: string, data: EnrichedPortfolioData): string => {
  // Services
  const servicesRegex = /<!-- REPEAT: services -->([\s\S]*?)<!-- END REPEAT: services -->/g;
  html = html.replace(servicesRegex, () => {
    return renderServices(data.services);
  });

  // Projects
  const projectsRegex = /<!-- REPEAT: projects -->([\s\S]*?)<!-- END REPEAT: projects -->/g;
  html = html.replace(projectsRegex, () => {
    return renderProjects(data.projects);
  });

  return html;
};

/**
 * Traite les blocs conditionnels IF/ENDIF
 * <!-- IF: has_phone -->...<!-- ENDIF: has_phone -->
 */
const processConditionalBlocks = (html: string, data: EnrichedPortfolioData): string => {
  // IF: has_phone
  const phoneRegex = /<!-- IF: has_phone -->([\s\S]*?)<!-- ENDIF: has_phone -->/g;
  html = html.replace(phoneRegex, (match, content) => {
    return data.phone ? content : '';
  });

  // IF: NOT has_phone
  const noPhoneRegex = /<!-- IF: NOT has_phone -->([\s\S]*?)<!-- ENDIF: NOT has_phone -->/g;
  html = html.replace(noPhoneRegex, (match, content) => {
    return !data.phone ? content : '';
  });

  // IF: has_address
  const addressRegex = /<!-- IF: has_address -->([\s\S]*?)<!-- ENDIF: has_address -->/g;
  html = html.replace(addressRegex, (match, content) => {
    return data.address ? content : '';
  });

  // IF: has_opening_hours
  const hoursRegex = /<!-- IF: has_opening_hours -->([\s\S]*?)<!-- ENDIF: has_opening_hours -->/g;
  html = html.replace(hoursRegex, (match, content) => {
    return data.openingHours ? content : '';
  });

  // IF: hasHeroImage
  const heroImageRegex = /<!-- IF: hasHeroImage -->([\s\S]*?)<!-- ENDIF: hasHeroImage -->/g;
  html = html.replace(heroImageRegex, (match, content) => {
    return data.aboutImage ? content : '';
  });

  // IF: NOT hasHeroImage
  const noHeroImageRegex = /<!-- IF: NOT hasHeroImage -->([\s\S]*?)<!-- ENDIF: NOT hasHeroImage -->/g;
  html = html.replace(noHeroImageRegex, (match, content) => {
    return !data.aboutImage ? content : '';
  });

  return html;
};

/**
 * Remplace tous les marqueurs {{...}} par les valeurs
 */
const replacePlaceholders = (html: string, data: EnrichedPortfolioData): string => {
  let result = html;

  // Hero
  result = result.replace(/\{\{HERO_TITLE\}\}/g, escapeHtml(data.heroTitle));
  result = result.replace(/\{\{HERO_SUBTITLE\}\}/g, escapeHtml(data.heroSubtitle));
  result = result.replace(/\{\{HERO_EYEBROW\}\}/g, escapeHtml(data.heroEyebrow));
  result = result.replace(/\{\{HERO_CTA_TEXT\}\}/g, escapeHtml(data.heroCta));
  result = result.replace(/\{\{HERO_IMAGE\}\}/g, data.aboutImage || '');

  // About
  result = result.replace(/\{\{ABOUT_TEXT\}\}/g, data.aboutText);
  result = result.replace(/\{\{ABOUT_IMAGE\}\}/g, data.aboutImage || '');
  result = result.replace(/\{\{VALUE_PROP\}\}/g, escapeHtml(data.valueProp));

  // Services (si pas en REPEAT)
  result = result.replace(/\{\{SERVICES\}\}/g, renderServices(data.services));
  result = result.replace(/\{\{SERVICES_LABEL\}\}/g, escapeHtml(data.servicesLabel));

  // Projects (si pas en REPEAT)
  result = result.replace(/\{\{PROJECTS\}\}/g, renderProjects(data.projects));
  result = result.replace(/\{\{PROJECTS_LABEL\}\}/g, escapeHtml(data.projectsLabel));

  // Contact
  result = result.replace(/\{\{CONTACT_EMAIL\}\}/g, escapeHtml(data.email));
  result = result.replace(/\{\{CONTACT_PHONE\}\}/g, data.phone ? escapeHtml(data.phone) : '');
  result = result.replace(/\{\{CONTACT_ADDRESS\}\}/g, data.address ? escapeHtml(data.address) : '');
  result = result.replace(/\{\{OPENING_HOURS\}\}/g, data.openingHours ? escapeHtml(data.openingHours) : '');

  // Social
  result = result.replace(/\{\{SOCIAL_LINKS\}\}/g, renderSocialLinks(data.socialLinks));

  // Utilitaires
  result = result.replace(/\{\{CURRENT_YEAR\}\}/g, new Date().getFullYear().toString());

  return result;
};

/**
 * Nettoie les marqueurs non remplacés
 */
const cleanUnreplacedMarkers = (html: string): string => {
  // Supprimer les marqueurs {{...}} restants
  return html.replace(/\{\{[A-Z_]+\}\}/g, '');
};

/**
 * Fonction principale : injecte les données dans le template HTML
 */
export const injectTemplateData = (
  templateHTML: string,
  enrichedData: EnrichedPortfolioData
): string => {
  let html = templateHTML;

  // 1. Traiter les blocs répétables (REPEAT)
  html = processRepeatBlocks(html, enrichedData);

  // 2. Traiter les blocs conditionnels (IF/ENDIF)
  html = processConditionalBlocks(html, enrichedData);

  // 3. Remplacer les marqueurs simples {{...}}
  html = replacePlaceholders(html, enrichedData);

  // 4. Nettoyer les marqueurs non utilisés
  html = cleanUnreplacedMarkers(html);

  return html;
};

/**
 * Charge un template HTML depuis le système de fichiers public
 * Essaie d'abord free/, puis premium/
 */
export const loadTemplateHTML = async (templateId: string): Promise<string> => {
  // Essayer free d'abord
  const freePath = `/templates/portfolio/free/${templateId}.html`;
  const premiumPath = `/templates/portfolio/premium/${templateId}.html`;
  
  try {
    let response = await fetch(freePath);
    if (!response.ok) {
      // Essayer premium
      response = await fetch(premiumPath);
    }
    if (!response.ok) {
      throw new Error(`Template not found: ${templateId}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading template ${templateId}:`, error);
    throw new Error(`Impossible de charger le template ${templateId}`);
  }
};

/**
 * Charge les métadonnées d'un template depuis index.json
 */
export const loadTemplateMeta = async (templateId: string): Promise<any> => {
  try {
    const response = await fetch('/templates/portfolio/index.json');
    if (!response.ok) {
      throw new Error('Template registry not found');
    }
    const registry = await response.json();
    const template = registry.templates.find((t: any) => t.id === templateId);
    if (!template) {
      throw new Error(`Template meta not found: ${templateId}`);
    }
    return template;
  } catch (error) {
    console.error(`Error loading template meta ${templateId}:`, error);
    throw new Error(`Impossible de charger les métadonnées du template ${templateId}`);
  }
};
