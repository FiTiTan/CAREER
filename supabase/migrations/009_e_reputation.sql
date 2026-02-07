-- ══════════════════════════════════════════
-- E-Réputation Module
-- ══════════════════════════════════════════

-- Reputation Scans
CREATE TABLE IF NOT EXISTS reputation_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  platforms JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reputation_scans_user ON reputation_scans(user_id, created_at DESC);

-- Mentions found during scans
CREATE TABLE IF NOT EXISTS reputation_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID REFERENCES reputation_scans(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  snippet TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  date TIMESTAMPTZ,
  relevance INTEGER CHECK (relevance >= 0 AND relevance <= 100),
  flagged BOOLEAN DEFAULT FALSE,
  reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reputation_mentions_scan ON reputation_mentions(scan_id);
CREATE INDEX idx_reputation_mentions_sentiment ON reputation_mentions(user_id, sentiment);

-- Reputation Alerts
CREATE TABLE IF NOT EXISTS reputation_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  keywords TEXT[] DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('instant', 'daily', 'weekly')),
  enabled BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE reputation_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own scans" ON reputation_scans
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own mentions" ON reputation_mentions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own alerts" ON reputation_alerts
  FOR ALL USING (auth.uid() = user_id);

-- Function: Update presence pillar
CREATE OR REPLACE FUNCTION update_presence_pillar()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.overall_score IS NOT NULL THEN
    UPDATE career_scores
    SET pillar_presence = NEW.overall_score, updated_at = NOW()
    WHERE user_id = NEW.user_id;
    
    PERFORM compute_career_score(NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_reputation_scan_complete
  AFTER UPDATE ON reputation_scans
  FOR EACH ROW
  WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
  EXECUTE FUNCTION update_presence_pillar();
