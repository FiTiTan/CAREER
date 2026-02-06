// ============================================================================
// CareerCare — Extraction de texte multi-format
// ============================================================================
//
// Supporte : PDF, DOCX, DOC, TXT
//
// ============================================================================

import type { PDFExtraction } from '@/types/cv';
import { cleanExtractedText } from '@/lib/utils';

/**
 * Détecte le type MIME à partir du buffer
 */
function detectMimeType(buffer: Buffer, filename?: string): string {
  // Check magic bytes
  const header = buffer.slice(0, 4).toString('hex');
  
  // PDF: %PDF (25 50 44 46)
  if (header.startsWith('25504446')) {
    return 'application/pdf';
  }
  
  // DOCX: PK (ZIP header - 50 4B 03 04)
  if (header.startsWith('504b0304')) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  
  // DOC: D0 CF 11 E0 (OLE header)
  if (header.startsWith('d0cf11e0')) {
    return 'application/msword';
  }
  
  // TXT: essaie de détecter si c'est du texte lisible
  const sample = buffer.slice(0, 100).toString('utf-8');
  if (/^[\x20-\x7E\s\n\r]+$/.test(sample)) {
    return 'text/plain';
  }
  
  // Fallback sur l'extension du fichier
  if (filename) {
    const ext = filename.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'doc': return 'application/msword';
      case 'txt': return 'text/plain';
    }
  }
  
  throw new Error('Format de fichier non reconnu');
}

/**
 * Extrait le texte d'un PDF
 */
async function extractFromPDF(buffer: Buffer): Promise<string> {
  const pdfParse = await import('pdf-parse');
  const parse = (pdfParse as any).default || pdfParse;
  const result = await parse(buffer, { max: 50 });
  return result.text;
}

/**
 * Extrait le texte d'un DOCX
 */
async function extractFromDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

/**
 * Extrait le texte d'un DOC (ancien format)
 * Note: Format complexe, on recommande la conversion en DOCX/PDF
 */
async function extractFromDOC(buffer: Buffer): Promise<string> {
  throw new Error(
    'Le format .DOC (ancien Word) n\'est pas supporté. ' +
    'Veuillez convertir votre CV en .DOCX ou .PDF avant de l\'uploader.'
  );
}

/**
 * Extrait le texte d'un TXT
 */
async function extractFromTXT(buffer: Buffer): Promise<string> {
  return buffer.toString('utf-8');
}

/**
 * Extrait le texte d'un document (PDF, DOCX, DOC, TXT).
 * 
 * Détecte automatiquement le format et utilise l'extracteur approprié.
 * 
 * @param buffer - Le contenu du fichier
 * @param filename - Nom du fichier (optionnel, aide à la détection)
 * @returns Le texte extrait + métadonnées
 * @throws Si le format n'est pas supporté ou l'extraction échoue
 */
export async function extractTextFromDocument(
  buffer: Buffer,
  filename?: string
): Promise<PDFExtraction> {
  // Détection du type
  const mimeType = detectMimeType(buffer, filename);
  
  let text: string;
  let pageCount: number | undefined;
  
  // Extraction selon le type
  switch (mimeType) {
    case 'application/pdf':
      text = await extractFromPDF(buffer);
      // pdf-parse retourne le nombre de pages, on pourrait l'extraire ici
      pageCount = undefined; // TODO: extraire du résultat pdf-parse
      break;
      
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      text = await extractFromDOCX(buffer);
      break;
      
    case 'application/msword':
      text = await extractFromDOC(buffer);
      break;
      
    case 'text/plain':
      text = await extractFromTXT(buffer);
      break;
      
    default:
      throw new Error(`Format non supporté: ${mimeType}`);
  }
  
  // Nettoyage
  const cleanedText = cleanExtractedText(text);
  
  if (!cleanedText || cleanedText.length < 50) {
    throw new Error(
      'Le document semble vide ou ne contient pas assez de texte. ' +
      'Assurez-vous que votre CV n\'est pas un scan image.'
    );
  }
  
  // Tronque à ~15000 caractères (suffisant pour un CV, limite les coûts API)
  const truncatedText = cleanedText.length > 15000 
    ? cleanedText.slice(0, 15000) 
    : cleanedText;
  
  return {
    text: truncatedText,
    pageCount: pageCount || undefined,
    metadata: {
      title: undefined,
      author: undefined,
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
export function validateDocumentFile(file: File): void {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ];
  
  // Vérification du type MIME
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      'Format non supporté. Formats acceptés : PDF, DOCX, DOC, TXT'
    );
  }
  
  // Vérification de la taille (5 MB max)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Le fichier ne doit pas dépasser 5 Mo.');
  }
  
  // Vérification de l'extension
  const allowedExtensions = ['pdf', 'docx', 'doc', 'txt'];
  const ext = file.name.toLowerCase().split('.').pop();
  if (!ext || !allowedExtensions.includes(ext)) {
    throw new Error(
      `Extension invalide (.${ext}). Extensions acceptées : .pdf, .docx, .doc, .txt`
    );
  }
}
