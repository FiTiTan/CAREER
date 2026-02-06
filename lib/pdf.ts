// ============================================================================
// CareerCare — Extraction PDF
// ============================================================================

import type { PDFExtraction } from '@/types/cv';
import { cleanExtractedText } from '@/lib/utils';

/**
 * Extrait le texte d'un buffer PDF.
 * 
 * Utilise pdf-parse côté serveur uniquement.
 * Nettoie le texte extrait pour supprimer les artefacts.
 * 
 * @param buffer - Le contenu du fichier PDF
 * @returns Le texte extrait + métadonnées
 * @throws Si le PDF est invalide ou vide
 */
export async function extractTextFromPDF(
  buffer: Buffer
): Promise<PDFExtraction> {
  // Import dynamique pour éviter les erreurs côté client
  const pdfParse = (await import('pdf-parse')).default;

  const result = await pdfParse(buffer, {
    // Limite à 50 pages pour éviter les abus
    max: 50,
  });

  const text = cleanExtractedText(result.text);

  if (!text || text.length < 50) {
    throw new Error(
      'Le PDF semble vide ou ne contient pas assez de texte. ' +
      'Assurez-vous que votre CV n\'est pas un scan image.'
    );
  }

  // Tronque à ~15000 caractères (suffisant pour un CV, limite les coûts API)
  const truncatedText = text.length > 15000 ? text.slice(0, 15000) : text;

  return {
    text: truncatedText,
    pageCount: result.numpages,
    metadata: {
      title: result.info?.Title || undefined,
      author: result.info?.Author || undefined,
    },
  };
}

/**
 * Valide un fichier uploadé avant traitement.
 * 
 * @param file - Le fichier à valider
 * @returns true si valide
 * @throws Si le fichier est invalide
 */
export function validateCVFile(file: File): void {
  // Vérification du type MIME
  if (file.type !== 'application/pdf') {
    throw new Error('Seuls les fichiers PDF sont acceptés.');
  }

  // Vérification de la taille (5 MB max)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Le fichier ne doit pas dépasser 5 Mo.');
  }

  // Vérification du nom
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Le fichier doit avoir l\'extension .pdf');
  }
}
