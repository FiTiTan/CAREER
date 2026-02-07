// User Types

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
  onboarding_completed: boolean;
  last_activity_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  locale: 'fr' | 'en';
  theme: 'light' | 'dark' | 'system';
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
  created_at: string;
  updated_at: string;
}
