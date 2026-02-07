// E-Réputation Types

export interface ReputationScan {
  id: string;
  user_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  overall_score: number | null; // 0-100
  platforms: PlatformScore[];
  mentions: Mention[];
  recommendations: ReputationRecommendation[];
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

export interface PlatformScore {
  platform: Platform;
  connected: boolean;
  profile_url: string | null;
  score: number | null; // 0-100
  issues: string[];
  last_checked: string;
}

export type Platform = 
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'github'
  | 'google'
  | 'glassdoor'
  | 'indeed';

export interface Mention {
  id: string;
  scan_id: string;
  platform: string;
  url: string;
  title: string;
  snippet: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string | null;
  relevance: number; // 0-100
  flagged: boolean;
  created_at: string;
}

export interface ReputationRecommendation {
  id: string;
  category: 'profile' | 'content' | 'privacy' | 'presence';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action_url: string | null;
  impact: number;
}

export interface ReputationAlert {
  id: string;
  user_id: string;
  keywords: string[];
  platforms: Platform[];
  frequency: 'instant' | 'daily' | 'weekly';
  enabled: boolean;
  last_triggered_at: string | null;
  created_at: string;
}
