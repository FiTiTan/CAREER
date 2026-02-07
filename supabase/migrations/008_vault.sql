-- ══════════════════════════════════════════
-- Vault (Coffre-Fort) Module
-- ══════════════════════════════════════════

-- Folders
CREATE TABLE IF NOT EXISTS vault_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES vault_folders(id) ON DELETE CASCADE,
  color TEXT,
  icon TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vault_folders_user ON vault_folders(user_id);
CREATE INDEX idx_vault_folders_parent ON vault_folders(parent_id);

-- Files
CREATE TABLE IF NOT EXISTS vault_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES vault_folders(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  file_type TEXT,  -- 'cv', 'cover_letter', 'diploma', 'certificate', 'other'
  metadata JSONB,
  tags TEXT[] DEFAULT '{}',
  starred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vault_files_user ON vault_files(user_id);
CREATE INDEX idx_vault_files_folder ON vault_files(folder_id);
CREATE INDEX idx_vault_files_type ON vault_files(file_type);

-- File Shares
CREATE TABLE IF NOT EXISTS vault_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID REFERENCES vault_files(id) ON DELETE CASCADE,
  shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  password_hash TEXT,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vault_shares_token ON vault_shares(share_token);

-- RLS
ALTER TABLE vault_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own folders" ON vault_folders
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own files" ON vault_files
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own shares" ON vault_shares
  FOR ALL USING (auth.uid() = shared_by);

-- Function: Update organisation pillar
CREATE OR REPLACE FUNCTION update_organisation_pillar()
RETURNS TRIGGER AS $$
DECLARE
  v_score INTEGER;
  v_file_count INTEGER;
  v_folder_count INTEGER;
  v_key_docs INTEGER;
BEGIN
  -- Count files
  SELECT COUNT(*) INTO v_file_count
  FROM vault_files WHERE user_id = NEW.user_id;
  
  -- Count folders
  SELECT COUNT(*) INTO v_folder_count
  FROM vault_folders WHERE user_id = NEW.user_id;
  
  -- Count key documents (CV, diplomas)
  SELECT COUNT(*) INTO v_key_docs
  FROM vault_files 
  WHERE user_id = NEW.user_id 
  AND file_type IN ('cv', 'diploma', 'certificate');
  
  v_score := LEAST(100,
    LEAST(30, v_file_count * 10) +
    LEAST(30, v_folder_count * 15) +
    LEAST(40, v_key_docs * 20)
  );
  
  UPDATE career_scores
  SET pillar_organisation = v_score, updated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  PERFORM compute_career_score(NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_vault_file_change
  AFTER INSERT OR DELETE ON vault_files
  FOR EACH ROW EXECUTE FUNCTION update_organisation_pillar();
