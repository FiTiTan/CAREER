-- ══════════════════════════════════════════
-- LinkedIn Optimizer Module
-- ══════════════════════════════════════════

-- LinkedIn Profiles
CREATE TABLE IF NOT EXISTS linkedin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  public_url TEXT,
  headline TEXT,
  summary TEXT,
  location TEXT,
  industry TEXT,
  connections_count INTEGER,
  experience JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  score INTEGER CHECK (score >= 0 AND score <= 100),
  imported_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LinkedIn Analyses
CREATE TABLE IF NOT EXISTS linkedin_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES linkedin_profiles(id) ON DELETE CASCADE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  sections JSONB,  -- Score per section
  recommendations JSONB,  -- Array of recommendations
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_linkedin_analyses_user ON linkedin_analyses(user_id, analyzed_at DESC);

-- LinkedIn Action Plans (30 days)
CREATE TABLE IF NOT EXISTS linkedin_action_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_id UUID REFERENCES linkedin_analyses(id) ON DELETE SET NULL,
  days JSONB NOT NULL,  -- Array of 30 days with tasks
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  current_day INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE linkedin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_action_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own LinkedIn profile" ON linkedin_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own LinkedIn analyses" ON linkedin_analyses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own action plans" ON linkedin_action_plans
  FOR ALL USING (auth.uid() = user_id);

-- Function: Update network pillar
CREATE OR REPLACE FUNCTION update_network_pillar()
RETURNS TRIGGER AS $$
DECLARE
  v_score INTEGER;
BEGIN
  IF NEW.score IS NOT NULL THEN
    v_score := NEW.score;
  ELSE
    v_score := 20; -- Just having imported = 20 points
  END IF;
  
  UPDATE career_scores
  SET pillar_network = v_score, updated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  PERFORM compute_career_score(NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_linkedin_profile_update
  AFTER INSERT OR UPDATE ON linkedin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_network_pillar();
