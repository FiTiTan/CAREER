// Job Match Types

export interface JobPreferences {
  id: string;
  user_id: string;
  job_titles: string[];
  locations: string[];
  remote_only: boolean;
  salary_min: number | null;
  salary_max: number | null;
  contract_types: ContractType[];
  industries: string[];
  company_sizes: CompanySize[];
  created_at: string;
  updated_at: string;
}

export type ContractType = 'cdi' | 'cdd' | 'freelance' | 'stage' | 'alternance';
export type CompanySize = 'startup' | 'pme' | 'eti' | 'grand-groupe';

export interface JobOffer {
  id: string;
  external_id: string;
  source: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  remote: boolean;
  salary_range: string | null;
  contract_type: ContractType;
  description: string;
  url: string;
  posted_at: string;
  expires_at: string | null;
  created_at: string;
}

export interface MatchScore {
  offer_id: string;
  user_id: string;
  score: number; // 0-100
  factors: MatchFactor[];
  computed_at: string;
}

export interface MatchFactor {
  name: string;
  weight: number;
  match: number; // 0-100
  details: string;
}

export interface Application {
  id: string;
  user_id: string;
  offer_id: string;
  status: ApplicationStatus;
  notes: string | null;
  applied_at: string | null;
  interview_at: string | null;
  response_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ApplicationStatus = 
  | 'saved'
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'accepted'
  | 'withdrawn';

export interface JobAlert {
  id: string;
  user_id: string;
  name: string;
  criteria: Partial<JobPreferences>;
  frequency: 'instant' | 'daily' | 'weekly';
  enabled: boolean;
  last_sent_at: string | null;
  created_at: string;
}
