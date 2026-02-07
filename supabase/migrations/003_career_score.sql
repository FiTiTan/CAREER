-- ══════════════════════════════════════════
-- CareerScore — Tables
-- ══════════════════════════════════════════

-- Score courant (1 row par user)
CREATE TABLE IF NOT EXISTS career_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total INTEGER DEFAULT 0 CHECK (total >= 0 AND total <= 100),
  pillar_documents INTEGER DEFAULT 0 CHECK (pillar_documents >= 0 AND pillar_documents <= 100),
  pillar_visibility INTEGER DEFAULT 0 CHECK (pillar_visibility >= 0 AND pillar_visibility <= 100),
  pillar_network INTEGER DEFAULT 0 CHECK (pillar_network >= 0 AND pillar_network <= 100),
  pillar_dynamique INTEGER DEFAULT 0 CHECK (pillar_dynamique >= 0 AND pillar_dynamique <= 100),
  pillar_organisation INTEGER DEFAULT 0 CHECK (pillar_organisation >= 0 AND pillar_organisation <= 100),
  pillar_presence INTEGER DEFAULT 0 CHECK (pillar_presence >= 0 AND pillar_presence <= 100),
  recommended_action JSONB,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Historique (1 row par snapshot, cron quotidien)
CREATE TABLE IF NOT EXISTS score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total INTEGER,
  pillar_documents INTEGER,
  pillar_visibility INTEGER,
  pillar_network INTEGER,
  pillar_dynamique INTEGER,
  pillar_organisation INTEGER,
  pillar_presence INTEGER,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_score_history_user ON score_history(user_id, recorded_at DESC);

-- Objectifs
CREATE TABLE IF NOT EXISTS score_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  target_score INTEGER CHECK (target_score > 0 AND target_score <= 100),
  target_pillar TEXT,  -- null = score global
  deadline TIMESTAMPTZ,
  achieved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE career_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own score" ON career_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users update own score" ON career_scores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users insert own score" ON career_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users see own history" ON score_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own goals" ON score_goals
  FOR ALL USING (auth.uid() = user_id);

-- Fonction : recalculer le score (appelée après chaque action module)
CREATE OR REPLACE FUNCTION compute_career_score(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_total INTEGER;
  v_rec career_scores%ROWTYPE;
BEGIN
  SELECT * INTO v_rec FROM career_scores WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    INSERT INTO career_scores (user_id) VALUES (p_user_id);
    RETURN 0;
  END IF;

  v_total := ROUND(
    v_rec.pillar_documents * 0.20 +
    v_rec.pillar_visibility * 0.20 +
    v_rec.pillar_network * 0.20 +
    v_rec.pillar_dynamique * 0.15 +
    v_rec.pillar_organisation * 0.10 +
    v_rec.pillar_presence * 0.15
  );

  UPDATE career_scores
  SET total = v_total,
      computed_at = NOW(),
      updated_at = NOW()
  WHERE user_id = p_user_id;

  RETURN v_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction : enregistrer un snapshot quotidien
CREATE OR REPLACE FUNCTION record_score_snapshot(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_rec career_scores%ROWTYPE;
BEGIN
  SELECT * INTO v_rec FROM career_scores WHERE user_id = p_user_id;
  
  IF FOUND THEN
    INSERT INTO score_history (
      user_id, total,
      pillar_documents, pillar_visibility, pillar_network,
      pillar_dynamique, pillar_organisation, pillar_presence
    ) VALUES (
      v_rec.user_id, v_rec.total,
      v_rec.pillar_documents, v_rec.pillar_visibility, v_rec.pillar_network,
      v_rec.pillar_dynamique, v_rec.pillar_organisation, v_rec.pillar_presence
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction : score decay (appelée par cron quotidien)
CREATE OR REPLACE FUNCTION apply_score_decay()
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER := 0;
  v_rec RECORD;
BEGIN
  FOR v_rec IN 
    SELECT id, user_id, total, last_activity_at
    FROM career_scores
    WHERE last_activity_at < NOW() - INTERVAL '7 days'
      AND total > 10
  LOOP
    -- Decay rate: -1 pt/day after 7 days, -2 pts/day after 30 days
    DECLARE
      v_days_inactive INTEGER;
      v_decay INTEGER;
    BEGIN
      v_days_inactive := EXTRACT(DAY FROM NOW() - v_rec.last_activity_at);
      
      IF v_days_inactive >= 30 THEN
        v_decay := 2;
      ELSE
        v_decay := 1;
      END IF;
      
      UPDATE career_scores
      SET total = GREATEST(10, total - v_decay),
          updated_at = NOW()
      WHERE id = v_rec.id;
      
      v_count := v_count + 1;
    END;
  END LOOP;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
