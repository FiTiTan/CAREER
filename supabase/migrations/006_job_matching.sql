-- ══════════════════════════════════════════
-- Job Matching Module
-- ══════════════════════════════════════════

-- Job Preferences
CREATE TABLE IF NOT EXISTS job_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  job_titles TEXT[] DEFAULT '{}',
  locations TEXT[] DEFAULT '{}',
  remote_only BOOLEAN DEFAULT FALSE,
  salary_min INTEGER,
  salary_max INTEGER,
  contract_types TEXT[] DEFAULT '{}',
  industries TEXT[] DEFAULT '{}',
  company_sizes TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  excluded_companies TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Offers (cached from external sources)
CREATE TABLE IF NOT EXISTS job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE,
  source TEXT NOT NULL,  -- 'indeed', 'linkedin', 'welcometothejungle', etc.
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_logo TEXT,
  location TEXT,
  remote BOOLEAN DEFAULT FALSE,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_range TEXT,
  contract_type TEXT,
  description TEXT,
  requirements TEXT,
  url TEXT NOT NULL,
  posted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_offers_source ON job_offers(source);
CREATE INDEX idx_job_offers_posted ON job_offers(posted_at DESC);

-- Match Scores (user <-> offer)
CREATE TABLE IF NOT EXISTS job_match_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES job_offers(id) ON DELETE CASCADE,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  factors JSONB,  -- Breakdown of matching factors
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, offer_id)
);

CREATE INDEX idx_job_match_user ON job_match_scores(user_id, score DESC);

-- Applications Tracker (Kanban)
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES job_offers(id) ON DELETE SET NULL,
  custom_company TEXT,  -- For manually added applications
  custom_title TEXT,
  custom_url TEXT,
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'applied', 'interview', 'offer', 'rejected', 'accepted', 'withdrawn')),
  notes TEXT,
  applied_at TIMESTAMPTZ,
  interview_at TIMESTAMPTZ,
  response_at TIMESTAMPTZ,
  salary_offered INTEGER,
  position INTEGER DEFAULT 0,  -- For Kanban ordering
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_user ON applications(user_id, status);

-- Job Alerts
CREATE TABLE IF NOT EXISTS job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  criteria JSONB NOT NULL,
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('instant', 'daily', 'weekly')),
  enabled BOOLEAN DEFAULT TRUE,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE job_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_match_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own job preferences" ON job_preferences
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view own match scores" ON job_match_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own applications" ON applications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own job alerts" ON job_alerts
  FOR ALL USING (auth.uid() = user_id);

-- Public read for job offers
CREATE POLICY "Anyone can view job offers" ON job_offers
  FOR SELECT USING (true);

-- Function: Update dynamique pillar
CREATE OR REPLACE FUNCTION update_dynamique_pillar()
RETURNS TRIGGER AS $$
DECLARE
  v_score INTEGER;
  v_prefs_set INTEGER;
  v_matches INTEGER;
  v_applications INTEGER;
  v_interviews INTEGER;
BEGIN
  -- Check if preferences are set
  SELECT CASE WHEN array_length(job_titles, 1) > 0 THEN 20 ELSE 0 END
  INTO v_prefs_set
  FROM job_preferences WHERE user_id = NEW.user_id;
  
  -- Count matches
  SELECT COUNT(*) INTO v_matches
  FROM job_match_scores WHERE user_id = NEW.user_id AND score >= 70;
  
  -- Count applications
  SELECT COUNT(*) INTO v_applications
  FROM applications WHERE user_id = NEW.user_id AND status IN ('applied', 'interview', 'offer');
  
  -- Count interviews
  SELECT COUNT(*) INTO v_interviews
  FROM applications WHERE user_id = NEW.user_id AND status = 'interview';
  
  v_score := LEAST(100, 
    COALESCE(v_prefs_set, 0) + 
    LEAST(20, v_matches * 4) + 
    LEAST(30, v_applications * 10) + 
    LEAST(30, v_interviews * 15)
  );
  
  UPDATE career_scores
  SET pillar_dynamique = v_score, updated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  PERFORM compute_career_score(NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_application_change
  AFTER INSERT OR UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_dynamique_pillar();
