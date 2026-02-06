// ============================================================================
// CareerCare — Types CV & Analyse
// ============================================================================

/** Map d'anonymisation : token → valeur réelle */
export type AnonymizationMap = Record<string, string>;

/** Statut du pipeline d'analyse */
export type AnalysisStatus =
  | 'pending'
  | 'extracting'
  | 'anonymizing'
  | 'analyzing'
  | 'deanonymizing'
  | 'done'
  | 'error';

/** Résultat de l'extraction PDF */
export interface PDFExtraction {
  text: string;
  pageCount: number;
  metadata?: {
    title?: string;
    author?: string;
  };
}

/** Résultat de l'anonymisation Mistral */
export interface AnonymizationResult {
  anonymizedText: string;
  map: AnonymizationMap;
  tokensUsed: number;
}

/** Scores détaillés du CV */
export interface CVScores {
  global: number;           // 0-100
  technique: number;        // Compétences techniques
  experience: number;       // Pertinence de l'expérience
  formation: number;        // Parcours académique
  presentation: number;     // Mise en forme, clarté
  impact: number;           // Résultats quantifiés
  coherence: number;        // Cohérence du parcours
}

/** Diagnostic métier */
export interface CVDiagnostic {
  metier: string;           // "Développeur Full-Stack"
  secteur: string;          // "Tech / SaaS"
  niveau: string;           // "Senior (5-8 ans)"
  profileContext: string;   // "tech", "commerce", "artisan", etc.
  marcheTension: string;    // "élevée", "moyenne", "faible"
}

/** Résultat complet de l'analyse DeepSeek */
export interface CVAnalysisResult {
  scores: CVScores;
  diagnostic: CVDiagnostic;
  forces: string[];
  faiblesses: string[];
  recommandations: {
    priorite: 'haute' | 'moyenne' | 'basse';
    titre: string;
    description: string;
    impact: string;
  }[];
  resumeOptimise?: string;  // Version améliorée du résumé pro
  motsClesManquants?: string[];
  compatibiliteATS: number; // 0-100
}

/** Entrée dans la table cv_analyses */
export interface CVAnalysis {
  id: string;
  user_id: string | null;
  file_path: string;
  file_name: string | null;
  raw_text: string | null;
  anonymized_text: string | null;
  anonymization_map: AnonymizationMap | null;
  status: AnalysisStatus;
  created_at: string;
}

/** Entrée dans la table cv_results */
export interface CVResult {
  id: string;
  analysis_id: string;
  score_global: number;
  scores: CVScores;
  diagnostic: CVDiagnostic;
  forces: string[];
  faiblesses: string[];
  recommandations: CVAnalysisResult['recommandations'];
  raw_response: Record<string, unknown>;
  created_at: string;
}

/** Payload envoyé au client pendant le processing */
export interface AnalysisProgress {
  status: AnalysisStatus;
  step: number;       // 1-5
  totalSteps: number;  // 5
  message: string;
}

/** Rapport final (après dé-anonymisation) envoyé au client */
export interface CVReport {
  id: string;
  fileName: string;
  scores: CVScores;
  diagnostic: CVDiagnostic;
  forces: string[];
  faiblesses: string[];
  recommandations: CVAnalysisResult['recommandations'];
  resumeOptimise?: string;
  motsClesManquants?: string[];
  compatibiliteATS: number;
  createdAt: string;
  /** true si l'user est free et ne voit que le partiel */
  isPartial: boolean;
}
