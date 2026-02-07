-- ══════════════════════════════════════════
-- CV Coach Module
-- ══════════════════════════════════════════

-- CV Analyses
CREATE TABLE IF NOT EXISTS cv_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  extracted_text TEXT,
  anonymized_text TEXT,
  anonymization_map JSONB,  -- Mapping for de-anonymization
  analysis_result JSONB,    -- Full AI analysis
  suggestions JSONB,        -- Array of suggestions
  keywords JSONB,           -- Extracted keywords
  ats_compatibility JSONB,  -- ATS score breakdown
  error_message TEXT,
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cv_analyses_user ON cv_analyses(user_id, created_at DESC);
CREATE INDEX idx_cv_analyses_status ON cv_analyses(status);

-- CV Suggestions tracking
CREATE TABLE IF NOT EXISTS cv_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES cv_analyses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,  -- 'format', 'content', 'keywords', 'structure'
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('high', 'medium', 'low')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  original_text TEXT,
  suggested_text TEXT,
  applied BOOLEAN DEFAULT FALSE,
  applied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cv_suggestions_analysis ON cv_suggestions(analysis_id);

-- RLS
ALTER TABLE cv_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own CV analyses" ON cv_analyses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own CV suggestions" ON cv_suggestions
  FOR ALL USING (auth.uid() = user_id);

-- Function: Update documents pillar after CV analysis
CREATE OR REPLACE FUNCTION update_documents_pillar()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.score IS NOT NULL THEN
    UPDATE career_scores
    SET pillar_documents = NEW.score,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;
    
    PERFORM compute_career_score(NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_cv_analysis_complete
  AFTER UPDATE ON cv_analyses
  FOR EACH ROW
  WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
  EXECUTE FUNCTION update_documents_pillar();
