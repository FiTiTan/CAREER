// ============================================================================
// CareerCare — Utilitaires
// ============================================================================

/**
 * Retry une fonction async avec backoff exponentiel.
 * Utilisé pour les appels API LLM qui peuvent timeout.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000, onRetry } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxRetries) break;

      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      onRetry?.(lastError, attempt + 1);

      await sleep(delay);
    }
  }

  throw lastError;
}

/** Sleep helper */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Tronque un texte à une longueur max en coupant proprement sur un mot.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > maxLength * 0.8 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

/**
 * Nettoie le texte extrait d'un PDF.
 * Supprime les caractères parasites, normalise les espaces.
 */
export function cleanExtractedText(text: string): string {
  return text
    // Supprime les caractères de contrôle sauf newlines
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalise les sauts de ligne multiples
    .replace(/\n{3,}/g, '\n\n')
    // Supprime les espaces en début/fin de ligne
    .replace(/^[ \t]+|[ \t]+$/gm, '')
    // Normalise les espaces multiples
    .replace(/ {2,}/g, ' ')
    .trim();
}

/**
 * Vérifie si un fichier est un PDF valide (par magic bytes).
 */
export function isPDF(buffer: ArrayBuffer): boolean {
  const header = new Uint8Array(buffer.slice(0, 5));
  // %PDF-
  return (
    header[0] === 0x25 &&
    header[1] === 0x50 &&
    header[2] === 0x44 &&
    header[3] === 0x46 &&
    header[4] === 0x2d
  );
}

/**
 * Formate un score en couleur sémantique.
 */
export function scoreToColor(score: number): string {
  if (score >= 85) return 'score-excellent';
  if (score >= 70) return 'score-good';
  if (score >= 50) return 'score-average';
  if (score >= 30) return 'score-poor';
  return 'score-critical';
}

/**
 * Formate un score en label texte.
 */
export function scoreToLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Bon';
  if (score >= 50) return 'Moyen';
  if (score >= 30) return 'À améliorer';
  return 'Critique';
}

/**
 * Génère un ID court pour les rapports publics.
 */
export function generateShortId(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
