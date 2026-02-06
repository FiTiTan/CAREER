// ============================================================================
// CareerCare — Service d'Anonymisation
// ============================================================================
//
// Migré depuis : SOUVERAIN/src/services/anonymizationService.ts
// Adapté pour l'architecture web (Mistral cloud au lieu de Ollama local)
//
// Ce service est le gardien RGPD du pipeline :
// 1. Anonymise le texte brut avant envoi hors EU
// 2. Stocke la map de dé-anonymisation (EU only)
// 3. Dé-anonymise le rapport final
//
// ============================================================================

import { callMistral } from '@/lib/ai/mistral';
import {
  ANONYMIZATION_SYSTEM_PROMPT,
  buildAnonymizationPrompt,
} from '@/lib/ai/prompts/anonymize';
import { withRetry } from '@/lib/utils';
import type { AnonymizationMap, AnonymizationResult } from '@/types/cv';

/**
 * Anonymise le texte d'un CV via Mistral Small (EU).
 *
 * @param rawText - Le texte brut extrait du PDF
 * @returns Le texte anonymisé + la map token→valeur
 * @throws Si l'anonymisation échoue après 3 retries
 */
export async function anonymizeCV(rawText: string): Promise<AnonymizationResult> {
  const result = await withRetry(
    async () => {
      const { content, tokensUsed } = await callMistral([
        { role: 'system', content: ANONYMIZATION_SYSTEM_PROMPT },
        { role: 'user', content: buildAnonymizationPrompt(rawText) },
      ]);

      // Parse le JSON retourné par Mistral
      const parsed = parseAnonymizationResponse(content);

      return {
        anonymizedText: parsed.anonymized_text,
        map: parsed.map,
        tokensUsed,
      };
    },
    {
      maxRetries: 2,
      baseDelay: 2000,
      onRetry: (error, attempt) => {
        console.warn(
          `[Anonymization] Retry ${attempt}/2 après erreur: ${error.message}`
        );
      },
    }
  );

  // Validation de sécurité : vérifier que l'anonymisation a bien fonctionné
  validateAnonymization(rawText, result);

  return result;
}

/**
 * Dé-anonymise un texte en remplaçant les tokens par les valeurs réelles.
 *
 * @param anonymizedText - Le texte contenant les tokens [P1], [E1], etc.
 * @param map - La map token→valeur
 * @returns Le texte avec les données personnelles restaurées
 */
export function deanonymize(
  text: string,
  map: AnonymizationMap
): string {
  let result = text;

  // Trie les tokens par longueur décroissante pour éviter les remplacements partiels
  // Ex: [URL10] doit être traité avant [URL1]
  const sortedTokens = Object.keys(map).sort((a, b) => b.length - a.length);

  for (const token of sortedTokens) {
    const value = map[token];
    // Remplace toutes les occurrences du token
    result = result.replaceAll(token, value);
  }

  return result;
}

/**
 * Dé-anonymise un objet de résultats CV (forces, faiblesses, recommandations...).
 * Applique la dé-anonymisation récursivement sur toutes les strings.
 */
export function deanonymizeResults(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  map: AnonymizationMap
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  if (typeof data === 'string') {
    return deanonymize(data, map);
  }

  if (Array.isArray(data)) {
    return data.map((item) => deanonymizeResults(item, map));
  }

  if (data && typeof data === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = deanonymizeResults(value, map);
    }
    return result;
  }

  return data;
}

// ============================================================================
// Helpers privés
// ============================================================================

/**
 * Parse la réponse JSON de Mistral pour l'anonymisation.
 */
function parseAnonymizationResponse(
  content: string
): { anonymized_text: string; map: AnonymizationMap } {
  // Nettoie le contenu (parfois Mistral wrap dans ```json ... ```)
  let cleaned = content.trim();

  // Supprime les blocs de code markdown si présents
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  let parsed: { anonymized_text?: string; map?: AnonymizationMap };

  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Impossible de parser la réponse d'anonymisation. Contenu reçu (100 premiers chars) : ${cleaned.slice(0, 100)}`
    );
  }

  if (!parsed.anonymized_text || typeof parsed.anonymized_text !== 'string') {
    throw new Error('La réponse d\'anonymisation ne contient pas de "anonymized_text"');
  }

  if (!parsed.map || typeof parsed.map !== 'object') {
    throw new Error('La réponse d\'anonymisation ne contient pas de "map"');
  }

  return {
    anonymized_text: parsed.anonymized_text,
    map: parsed.map as AnonymizationMap,
  };
}

/**
 * Vérifie que l'anonymisation a bien supprimé les données sensibles.
 * Cherche des patterns courants de données personnelles dans le texte anonymisé.
 */
function validateAnonymization(
  rawText: string,
  result: AnonymizationResult
): void {
  const { anonymizedText, map } = result;

  // Extraire les valeurs réelles de la map
  const personalValues = Object.values(map);

  // Vérifier qu'aucune valeur personnelle n'est encore dans le texte anonymisé
  const leaks: string[] = [];
  for (const value of personalValues) {
    // Ignore les valeurs très courtes (risque de faux positifs)
    if (value.length < 4) continue;

    if (anonymizedText.toLowerCase().includes(value.toLowerCase())) {
      leaks.push(value);
    }
  }

  if (leaks.length > 0) {
    console.error(
      `[Anonymization] FUITE DÉTECTÉE — ${leaks.length} valeur(s) personnelle(s) encore présentes dans le texte anonymisé`
    );
    // Ne pas logger les valeurs elles-mêmes pour ne pas les exposer dans les logs
    throw new Error(
      `L'anonymisation est incomplète : ${leaks.length} donnée(s) personnelle(s) n'ont pas été remplacées. Relance de l'anonymisation nécessaire.`
    );
  }

  // Vérifier que le texte anonymisé n'est pas trop court (signe d'une troncation)
  if (anonymizedText.length < rawText.length * 0.5) {
    console.warn(
      '[Anonymization] Le texte anonymisé est significativement plus court que l\'original — vérification manuelle recommandée'
    );
  }

  // Vérifier la présence d'au moins quelques tokens
  const tokenPattern = /\[(P|E|T|A|DOB|SS|URL|PHOTO|NAT|FAM|PERM)\d+\]/g;
  const tokensFound = anonymizedText.match(tokenPattern) || [];
  if (tokensFound.length === 0 && Object.keys(map).length === 0) {
    console.warn(
      '[Anonymization] Aucun token d\'anonymisation trouvé — le CV ne contenait peut-être aucune donnée personnelle ?'
    );
  }
}
