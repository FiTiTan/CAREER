// ============================================================================
// CareerCare — Service d'Analyse CV (DeepSeek V3)
// ============================================================================
//
// Ce service reçoit du texte ANONYMISÉ et retourne un scoring complet.
// Aucune donnée personnelle ne transite par ce service.
//
// ============================================================================

import { callDeepSeek } from '@/lib/ai/deepseek';
import {
  CV_ANALYSIS_SYSTEM_PROMPT,
  buildCVAnalysisPrompt,
} from '@/lib/ai/prompts/cv-analysis';
import { withRetry } from '@/lib/utils';
import type { CVAnalysisResult, CVScores, CVDiagnostic } from '@/types/cv';

/**
 * Analyse un CV anonymisé via DeepSeek V3.
 *
 * @param anonymizedText - Le texte du CV avec les tokens d'anonymisation
 * @returns L'analyse complète (scores, diagnostic, recommandations)
 * @throws Si l'analyse échoue après 3 retries
 */
export async function analyzeCV(
  anonymizedText: string
): Promise<CVAnalysisResult> {
  const result = await withRetry(
    async () => {
      const { content } = await callDeepSeek([
        { role: 'system', content: CV_ANALYSIS_SYSTEM_PROMPT },
        { role: 'user', content: buildCVAnalysisPrompt(anonymizedText) },
      ]);

      return parseAnalysisResponse(content);
    },
    {
      maxRetries: 2,
      baseDelay: 3000,
      onRetry: (error, attempt) => {
        console.warn(
          `[CV Analysis] Retry ${attempt}/2 après erreur: ${error.message}`
        );
      },
    }
  );

  // Validation des scores
  validateScores(result.scores);

  return result;
}

// ============================================================================
// Helpers privés
// ============================================================================

/**
 * Parse et valide la réponse JSON de DeepSeek.
 */
function parseAnalysisResponse(content: string): CVAnalysisResult {
  let cleaned = content.trim();

  // Supprime les blocs de code markdown si présents
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  let parsed: Record<string, unknown>;

  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Impossible de parser la réponse d'analyse CV. Début du contenu : ${cleaned.slice(0, 200)}`
    );
  }

  // Validation de la structure
  const scores = validateAndExtractScores(parsed.scores);
  const diagnostic = validateAndExtractDiagnostic(parsed.diagnostic);

  return {
    scores,
    diagnostic,
    forces: extractStringArray(parsed.forces, 'forces'),
    faiblesses: extractStringArray(parsed.faiblesses, 'faiblesses'),
    recommandations: extractRecommandations(parsed.recommandations),
    resumeOptimise: typeof parsed.resumeOptimise === 'string'
      ? parsed.resumeOptimise
      : undefined,
    motsClesManquants: Array.isArray(parsed.motsClesManquants)
      ? parsed.motsClesManquants.filter((k): k is string => typeof k === 'string')
      : undefined,
    compatibiliteATS: typeof parsed.compatibiliteATS === 'number'
      ? clampScore(parsed.compatibiliteATS)
      : 50,
  };
}

/**
 * Extrait et valide les scores depuis la réponse DeepSeek.
 */
function validateAndExtractScores(
  raw: unknown
): CVScores {
  if (!raw || typeof raw !== 'object') {
    throw new Error('La réponse ne contient pas de "scores"');
  }

  const s = raw as Record<string, unknown>;

  return {
    global: extractScore(s.global, 'global'),
    technique: extractScore(s.technique, 'technique'),
    experience: extractScore(s.experience, 'experience'),
    formation: extractScore(s.formation, 'formation'),
    presentation: extractScore(s.presentation, 'presentation'),
    impact: extractScore(s.impact, 'impact'),
    coherence: extractScore(s.coherence, 'coherence'),
  };
}

/**
 * Extrait et valide le diagnostic depuis la réponse DeepSeek.
 */
function validateAndExtractDiagnostic(
  raw: unknown
): CVDiagnostic {
  if (!raw || typeof raw !== 'object') {
    throw new Error('La réponse ne contient pas de "diagnostic"');
  }

  const d = raw as Record<string, unknown>;

  return {
    metier: typeof d.metier === 'string' ? d.metier : 'Non détecté',
    secteur: typeof d.secteur === 'string' ? d.secteur : 'Non détecté',
    niveau: typeof d.niveau === 'string' ? d.niveau : 'Non détecté',
    profileContext: typeof d.profileContext === 'string'
      ? d.profileContext
      : 'general',
    marcheTension: typeof d.marcheTension === 'string'
      ? d.marcheTension
      : 'moyenne',
  };
}

/**
 * Extrait un score numérique et le clamp entre 0 et 100.
 */
function extractScore(value: unknown, name: string): number {
  if (typeof value === 'number') {
    return clampScore(value);
  }
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) return clampScore(parsed);
  }
  console.warn(`[CV Analysis] Score "${name}" manquant ou invalide, défaut à 50`);
  return 50;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Extrait un tableau de strings depuis la réponse.
 */
function extractStringArray(
  raw: unknown,
  fieldName: string
): string[] {
  if (!Array.isArray(raw)) {
    console.warn(`[CV Analysis] "${fieldName}" n'est pas un tableau`);
    return [];
  }
  return raw
    .filter((item): item is string => typeof item === 'string')
    .slice(0, 10); // Max 10 items
}

/**
 * Extrait et valide les recommandations.
 */
function extractRecommandations(
  raw: unknown
): CVAnalysisResult['recommandations'] {
  if (!Array.isArray(raw)) {
    console.warn('[CV Analysis] "recommandations" n\'est pas un tableau');
    return [];
  }

  return raw
    .filter((item): item is Record<string, unknown> =>
      item !== null && typeof item === 'object'
    )
    .map((item) => ({
      priorite: (['haute', 'moyenne', 'basse'].includes(item.priorite as string)
        ? item.priorite
        : 'moyenne') as 'haute' | 'moyenne' | 'basse',
      titre: typeof item.titre === 'string' ? item.titre : 'Recommandation',
      description: typeof item.description === 'string'
        ? item.description
        : '',
      impact: typeof item.impact === 'string' ? item.impact : '',
    }))
    .slice(0, 7); // Max 7 recommandations
}

/**
 * Validation de cohérence des scores.
 */
function validateScores(scores: CVScores): void {
  const subScores = [
    scores.technique,
    scores.experience,
    scores.formation,
    scores.presentation,
    scores.impact,
    scores.coherence,
  ];

  const avg = subScores.reduce((a, b) => a + b, 0) / subScores.length;

  // Le score global devrait être dans un range raisonnable par rapport à la moyenne
  if (Math.abs(scores.global - avg) > 25) {
    console.warn(
      `[CV Analysis] Score global (${scores.global}) très éloigné de la moyenne des sous-scores (${Math.round(avg)})`
    );
  }
}
