// ============================================================
// API Route : Détection IA du Secteur Portfolio
// POST /api/portfolio/detect-sector
// ============================================================

import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * Interface de la requête
 */
interface DetectSectorRequest {
  profileType: 'person' | 'place';
  title?: string;
  placeName?: string;
  placeType?: string;
  address?: string;
  socialLinks?: string[];
  tagline?: string;
}

/**
 * Interface de la réponse
 */
interface DetectSectorResponse {
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
 * Fallback détection par mots-clés si DeepSeek échoue
 */
const fallbackDetection = (request: DetectSectorRequest): DetectSectorResponse => {
  const text = [
    request.title,
    request.placeName,
    request.placeType,
    request.tagline,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  // Détection simple par mots-clés
  let sector = 'service';
  let subCategory = 'general';
  const confidence = 0.5;

  if (text.match(/restaurant|café|boulangerie|cuisine|chef|food|bar|bistro/)) {
    sector = 'food';
    subCategory = text.includes('café') ? 'coffee_shop' : 'restaurant';
  } else if (text.match(/boutique|magasin|commerce|shop|retail|fleuriste/)) {
    sector = 'retail';
    subCategory = 'boutique_general';
  } else if (text.match(/développeur|dev|programmeur|web|software|tech|designer|ux|ui/)) {
    sector = 'tech';
    subCategory = text.includes('designer') ? 'designer' : 'developer';
  } else if (text.match(/plombier|électricien|menuisier|artisan|paysagiste|rénovation/)) {
    sector = 'artisan';
    subCategory = 'multi_services';
  } else if (text.match(/avocat|notaire|comptable|conseil|coach|consultant/)) {
    sector = 'service';
    subCategory = text.includes('avocat') ? 'legal' : 'consulting';
  } else if (text.match(/photographe|créatif|artiste|graphiste|illustrateur/)) {
    sector = 'creative';
    subCategory = 'photography';
  }

  // Détection basée sur réseaux sociaux
  if (request.socialLinks?.includes('behance') || request.socialLinks?.includes('dribbble')) {
    sector = 'creative';
    confidence * 1.2;
  } else if (request.socialLinks?.includes('github')) {
    sector = 'tech';
    confidence * 1.2;
  }

  const suggestedLabels: Record<string, { services: string; projects: string }> = {
    food: { services: 'Nos spécialités', projects: 'Nos plats signature' },
    retail: { services: 'Nos produits', projects: 'Notre sélection' },
    tech: { services: 'Services', projects: 'Projets' },
    artisan: { services: 'Nos prestations', projects: 'Réalisations' },
    service: { services: 'Services', projects: 'Cas clients' },
    creative: { services: 'Prestations', projects: 'Portfolio' },
  };

  return {
    sector,
    subCategory,
    confidence: Math.min(confidence, 1),
    suggestedLabels: suggestedLabels[sector] || { services: 'Services', projects: 'Projets' },
    tips: [
      'Ajoutez plus de détails sur votre activité pour améliorer la détection',
      'Précisez vos spécialités dans les expertises',
    ],
  };
};

/**
 * Construit le prompt pour DeepSeek
 */
const buildDetectionPrompt = (request: DetectSectorRequest): string => {
  let prompt = `Tu es un expert en classification métier et commerciale.

DONNÉES:
- Type: ${request.profileType === 'person' ? 'Personne' : 'Lieu'}`;

  if (request.profileType === 'person') {
    if (request.title) prompt += `\n- Métier/Titre: ${request.title}`;
    if (request.tagline) prompt += `\n- Tagline: ${request.tagline}`;
  } else {
    if (request.placeName) prompt += `\n- Nom du lieu: ${request.placeName}`;
    if (request.placeType) prompt += `\n- Type de lieu: ${request.placeType}`;
    if (request.address) prompt += `\n- Adresse: ${request.address}`;
  }

  if (request.socialLinks && request.socialLinks.length > 0) {
    prompt += `\n- Réseaux sociaux: ${request.socialLinks.join(', ')}`;
  }

  prompt += `

TÂCHE:
1. Détecte le SECTEUR principal parmi: food, retail, tech, service, artisan, creative, health, legal, education
2. Détecte la SOUS-CATÉGORIE précise (ex: coffee_shop, plomberie_chauffage, avocat_droit_affaires, web_developer)
3. Donne un score de CONFIANCE (0-1)
4. Suggère des LABELS adaptés pour les services et projets selon le secteur:
   - food: "Nos spécialités", "Nos plats signature"
   - retail: "Nos produits", "Notre sélection"
   - tech: "Services", "Projets"
   - artisan: "Nos prestations", "Réalisations"
   - creative: "Prestations créatives", "Portfolio"
   - service: "Services professionnels", "Cas clients"
5. Donne 2-3 TIPS concrets pour améliorer le portfolio selon le secteur détecté

INDICES RÉSEAUX SOCIAUX:
- Behance/Dribbble → créatif/design
- GitHub → tech/développement
- LinkedIn → corporate/service
- Instagram → visuel (food, retail, créatif)
- Malt → freelance tech/créatif

Réponds UNIQUEMENT en JSON valide (pas de markdown):
{
  "sector": "...",
  "subCategory": "...",
  "confidence": 0.95,
  "suggestedLabels": {
    "services": "...",
    "projects": "..."
  },
  "tips": ["...", "...", "..."]
}`;

  return prompt;
};

/**
 * POST /api/portfolio/detect-sector
 */
export async function POST(request: NextRequest) {
  try {
    const body: DetectSectorRequest = await request.json();

    // Validation
    if (!body.profileType) {
      return NextResponse.json(
        { error: 'profileType requis' },
        { status: 400 }
      );
    }

    if (body.profileType === 'person' && !body.title) {
      return NextResponse.json(
        { error: 'title requis pour profileType=person' },
        { status: 400 }
      );
    }

    if (body.profileType === 'place' && !body.placeName && !body.placeType) {
      return NextResponse.json(
        { error: 'placeName ou placeType requis pour profileType=place' },
        { status: 400 }
      );
    }

    // Vérifier la clé API DeepSeek
    if (!DEEPSEEK_API_KEY) {
      console.warn('[Detect Sector] DEEPSEEK_API_KEY manquante, fallback keywords');
      const result = fallbackDetection(body);
      return NextResponse.json(result);
    }

    // Construire le prompt
    const prompt = buildDetectionPrompt(body);

    // Appel à DeepSeek avec timeout 10s
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 800,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('[Detect Sector] DeepSeek error:', response.status);
        const result = fallbackDetection(body);
        return NextResponse.json(result);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        console.error('[Detect Sector] No content in response');
        const result = fallbackDetection(body);
        return NextResponse.json(result);
      }

      // Parser le JSON de la réponse
      let parsedResult: DetectSectorResponse;
      try {
        // Nettoyer le contenu (enlever markdown si présent)
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsedResult = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error('[Detect Sector] JSON parse error:', parseError);
        const result = fallbackDetection(body);
        return NextResponse.json(result);
      }

      // Validation du résultat
      if (!parsedResult.sector || !parsedResult.confidence) {
        console.error('[Detect Sector] Invalid result structure');
        const result = fallbackDetection(body);
        return NextResponse.json(result);
      }

      return NextResponse.json(parsedResult);
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      if ((fetchError as Error).name === 'AbortError') {
        console.error('[Detect Sector] Timeout (10s)');
      } else {
        console.error('[Detect Sector] Fetch error:', fetchError);
      }
      const result = fallbackDetection(body);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('[Detect Sector] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la détection du secteur' },
      { status: 500 }
    );
  }
}
