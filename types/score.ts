// CareerScore Types — Cœur du système CareerCare

export interface CareerScore {
  id: string;
  user_id: string;
  total: number; // 0-100, score global pondéré
  pillars: {
    documents: PillarScore;   // CV Coach → 20%
    visibility: PillarScore;  // Portfolio → 20%
    network: PillarScore;     // LinkedIn → 20%
    dynamique: PillarScore;   // Job Match → 15%
    organisation: PillarScore; // Vault → 10%
    presence: PillarScore;    // E-Réputation → 15%
  };
  recommended_action: RecommendedAction | null;
  computed_at: string;
  updated_at: string;
}

export interface PillarScore {
  value: number;              // 0-100
  weight: number;             // Poids dans le total (ex: 0.20)
  module: string;             // Nom du module source
  factors: PillarFactor[];    // Détail des critères
  trend: 'up' | 'down' | 'stable';
}

export interface PillarFactor {
  name: string;               // ex: "Qualité CV", "Mots-clés ATS"
  value: number;              // 0-100
  max_impact: number;         // Points potentiels
}

export interface RecommendedAction {
  pillar: keyof CareerScore['pillars'];
  module_route: string;       // ex: "/hub/linkedin/suggestions"
  title: string;              // ex: "Améliorez votre profil LinkedIn"
  description: string;
  potential_gain: number;     // Points potentiels
  priority: 'high' | 'medium' | 'low';
}

export interface ScoreHistory {
  id: string;
  user_id: string;
  total: number;
  pillars: Record<string, number>;
  recorded_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  target_score: number;
  target_pillar: string | null; // null = score global
  deadline: string | null;
  created_at: string;
  achieved_at: string | null;
}

export const PILLAR_WEIGHTS = {
  documents: 0.20,
  visibility: 0.20,
  network: 0.20,
  dynamique: 0.15,
  organisation: 0.10,
  presence: 0.15,
} as const;

export const PILLAR_CONFIG = {
  documents:    { icon: '📄', label: 'Documents',    color: '#4f8fff', module: 'CV Coach',     route: '/hub/cv-coach' },
  visibility:   { icon: '🎨', label: 'Visibilité',   color: '#8b5cf6', module: 'Portfolio',    route: '/hub/portfolio' },
  network:      { icon: '💼', label: 'Réseau',       color: '#0a66c2', module: 'LinkedIn',     route: '/hub/linkedin' },
  dynamique:    { icon: '🎯', label: 'Dynamique',    color: '#06d6a0', module: 'Job Match',    route: '/hub/job-match' },
  organisation: { icon: '🔒', label: 'Organisation', color: '#ff8c42', module: 'Coffre-Fort',  route: '/hub/vault' },
  presence:     { icon: '🌐', label: 'Présence',     color: '#f472b6', module: 'E-Réputation', route: '/hub/e-reputation' },
} as const;

export type PillarKey = keyof typeof PILLAR_CONFIG;
