-- ══════════════════════════════════════════
-- Boutique Module
-- ══════════════════════════════════════════

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  category TEXT CHECK (category IN ('cv_review', 'linkedin_audit', 'coaching', 'template', 'training', 'bundle')),
  price_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  stripe_price_id TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  deliverables JSONB DEFAULT '[]',
  requirements TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category) WHERE active = TRUE;
CREATE INDEX idx_products_featured ON products(featured) WHERE active = TRUE;

-- Purchases
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'processing', 'delivered', 'refunded', 'failed')),
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  deliverables_sent BOOLEAN DEFAULT FALSE,
  notes TEXT,
  purchased_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_purchases_user ON purchases(user_id, created_at DESC);
CREATE INDEX idx_purchases_status ON purchases(status);

-- Purchase Deliveries
CREATE TABLE IF NOT EXISTS purchase_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  deliverable_name TEXT NOT NULL,
  file_path TEXT,
  external_url TEXT,
  message TEXT,
  delivered_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_deliveries ENABLE ROW LEVEL SECURITY;

-- Products are public to read
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Users view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users view own deliveries" ON purchase_deliveries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM purchases 
      WHERE purchases.id = purchase_id 
      AND purchases.user_id = auth.uid()
    )
  );

-- Seed some products
INSERT INTO products (slug, name, short_description, category, price_cents, features, active, featured, sort_order) VALUES
  ('cv-review-pro', 'Revue CV Pro', 'Analyse approfondie par un expert RH + rapport détaillé', 'cv_review', 4900, ARRAY['Analyse par expert RH', 'Rapport PDF détaillé', 'Suggestions concrètes', 'Réponse sous 48h'], TRUE, TRUE, 1),
  ('linkedin-audit', 'Audit LinkedIn', 'Optimisation complète de votre profil LinkedIn', 'linkedin_audit', 7900, ARRAY['Audit complet du profil', 'Recommandations personnalisées', 'Headline optimisé', 'Plan d''action 30 jours'], TRUE, TRUE, 2),
  ('coaching-30min', 'Coaching 30min', 'Session individuelle avec un coach carrière', 'coaching', 5900, ARRAY['30min en visio', 'Coach certifié', 'Conseils personnalisés', 'Replay disponible'], TRUE, FALSE, 3),
  ('bundle-job-search', 'Pack Recherche d''emploi', 'CV + LinkedIn + Coaching — Économisez 30%', 'bundle', 14900, ARRAY['Revue CV Pro', 'Audit LinkedIn', 'Coaching 30min', 'Économisez 30%'], TRUE, TRUE, 0)
ON CONFLICT (slug) DO NOTHING;
