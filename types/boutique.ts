// Boutique Types

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  short_description: string;
  category: ProductCategory;
  price_cents: number;
  currency: 'EUR';
  stripe_price_id: string;
  images: string[];
  features: string[];
  deliverables: ProductDeliverable[];
  requirements: string[];
  active: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProductCategory = 
  | 'cv_review'
  | 'linkedin_audit'
  | 'coaching'
  | 'template'
  | 'training'
  | 'bundle';

export interface ProductDeliverable {
  name: string;
  description: string;
  format: string; // PDF, Video, Call, etc.
  delivery_days: number;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  stripe_payment_intent_id: string;
  status: PurchaseStatus;
  amount_cents: number;
  currency: 'EUR';
  deliverables_sent: boolean;
  notes: string | null;
  purchased_at: string;
  delivered_at: string | null;
  created_at: string;
}

export type PurchaseStatus = 
  | 'pending'
  | 'completed'
  | 'processing'
  | 'delivered'
  | 'refunded'
  | 'failed';

export interface PurchaseDelivery {
  id: string;
  purchase_id: string;
  deliverable_name: string;
  file_path: string | null;
  external_url: string | null;
  message: string | null;
  delivered_at: string;
}
