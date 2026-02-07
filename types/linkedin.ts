// LinkedIn Optimizer Types

export interface LinkedInProfile {
  id: string;
  user_id: string;
  linkedin_id: string | null;
  public_url: string;
  headline: string | null;
  summary: string | null;
  location: string | null;
  industry: string | null;
  connections_count: number | null;
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: LinkedInSkill[];
  certifications: LinkedInCertification[];
  imported_at: string;
  updated_at: string;
}

export interface LinkedInExperience {
  title: string;
  company: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
}

export interface LinkedInEducation {
  school: string;
  degree: string | null;
  field: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
}

export interface LinkedInSkill {
  name: string;
  endorsements: number;
}

export interface LinkedInCertification {
  name: string;
  issuer: string;
  date: string | null;
  url: string | null;
}

export interface LinkedInAnalysis {
  id: string;
  user_id: string;
  profile_id: string;
  overall_score: number; // 0-100
  sections: LinkedInSectionAnalysis[];
  recommendations: LinkedInRecommendation[];
  analyzed_at: string;
}

export interface LinkedInSectionAnalysis {
  section: 'headline' | 'summary' | 'experience' | 'skills' | 'education' | 'photo' | 'banner';
  score: number;
  issues: string[];
  suggestions: string[];
}

export interface LinkedInRecommendation {
  section: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  example: string | null;
  impact: number; // Points potentiels
}

export interface LinkedInActionPlan {
  id: string;
  user_id: string;
  analysis_id: string;
  days: LinkedInActionDay[];
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface LinkedInActionDay {
  day: number; // 1-30
  title: string;
  tasks: LinkedInTask[];
  completed: boolean;
}

export interface LinkedInTask {
  id: string;
  description: string;
  section: string | null;
  completed: boolean;
  completed_at: string | null;
}
