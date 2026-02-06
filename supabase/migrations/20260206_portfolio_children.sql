-- ============================================================
-- CareerCare - Portfolio Child Tables (si portfolios existe déjà)
-- ============================================================

-- 2. PROJECTS (réalisations)
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  role VARCHAR(255),
  company VARCHAR(255),
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  skills TEXT[] DEFAULT '{}',
  metrics JSONB DEFAULT '[]',
  media JSONB DEFAULT '[]',
  links JSONB DEFAULT '[]',
  visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SKILLS (compétences)
CREATE TABLE IF NOT EXISTS portfolio_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) DEFAULT 'hard' CHECK (category IN ('hard', 'soft', 'tool', 'language')),
  level INT DEFAULT 3 CHECK (level >= 1 AND level <= 5),
  years_experience DECIMAL(4,1),
  proof_project_ids UUID[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CERTIFICATIONS
CREATE TABLE IF NOT EXISTS portfolio_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  issuer VARCHAR(255),
  issue_date DATE,
  expiry_date DATE,
  credential_id VARCHAR(255),
  credential_url TEXT,
  logo_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TESTIMONIALS (témoignages)
CREATE TABLE IF NOT EXISTS portfolio_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_title VARCHAR(255),
  author_company VARCHAR(255),
  author_photo_url TEXT,
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  linkedin_url TEXT,
  date DATE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EDUCATION
CREATE TABLE IF NOT EXISTS portfolio_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  school VARCHAR(255) NOT NULL,
  degree VARCHAR(255),
  field VARCHAR(255),
  start_date DATE,
  end_date DATE,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_portfolio_id ON portfolio_projects(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_skills_portfolio_id ON portfolio_skills(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_certifications_portfolio_id ON portfolio_certifications(portfolio_id);

-- Updated_at trigger for projects
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_portfolio_projects_updated_at ON portfolio_projects;
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_education ENABLE ROW LEVEL SECURITY;

-- Policies for child tables
CREATE POLICY "Public read portfolio_projects" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Public insert portfolio_projects" ON portfolio_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update portfolio_projects" ON portfolio_projects FOR UPDATE USING (true);
CREATE POLICY "Public delete portfolio_projects" ON portfolio_projects FOR DELETE USING (true);

CREATE POLICY "Public read portfolio_skills" ON portfolio_skills FOR SELECT USING (true);
CREATE POLICY "Public insert portfolio_skills" ON portfolio_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update portfolio_skills" ON portfolio_skills FOR UPDATE USING (true);
CREATE POLICY "Public delete portfolio_skills" ON portfolio_skills FOR DELETE USING (true);

CREATE POLICY "Public read portfolio_certifications" ON portfolio_certifications FOR SELECT USING (true);
CREATE POLICY "Public insert portfolio_certifications" ON portfolio_certifications FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read portfolio_testimonials" ON portfolio_testimonials FOR SELECT USING (true);
CREATE POLICY "Public insert portfolio_testimonials" ON portfolio_testimonials FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read portfolio_education" ON portfolio_education FOR SELECT USING (true);
CREATE POLICY "Public insert portfolio_education" ON portfolio_education FOR INSERT WITH CHECK (true);
