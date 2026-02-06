// ============================================================
// CareerCare - Portfolio Types
// ============================================================

export type PortfolioStatus = 'draft' | 'published'
export type SkillCategory = 'hard' | 'soft' | 'tool' | 'language'
export type Visibility = 'public' | 'private'

// Secteurs disponibles
export const SECTORS = [
  { id: 'tech', label: 'Tech & Digital', icon: '💻', color: '#3B82F6' },
  { id: 'marketing', label: 'Marketing & Communication', icon: '📣', color: '#EC4899' },
  { id: 'finance', label: 'Finance & Comptabilité', icon: '💰', color: '#10B981' },
  { id: 'sales', label: 'Commercial & Vente', icon: '🤝', color: '#F59E0B' },
  { id: 'rh', label: 'Ressources Humaines', icon: '👥', color: '#8B5CF6' },
  { id: 'design', label: 'Design & Créatif', icon: '🎨', color: '#F43F5E' },
  { id: 'engineering', label: 'Ingénierie', icon: '⚙️', color: '#6366F1' },
  { id: 'health', label: 'Santé', icon: '🏥', color: '#14B8A6' },
  { id: 'legal', label: 'Juridique', icon: '⚖️', color: '#64748B' },
  { id: 'education', label: 'Éducation & Formation', icon: '📚', color: '#0EA5E9' },
  { id: 'other', label: 'Autre', icon: '📋', color: '#9CA3AF' },
] as const

export type SectorId = typeof SECTORS[number]['id']

// Portfolio principal
export interface Portfolio {
  id: string
  user_id: string | null
  title: string
  tagline: string | null
  sector: SectorId | null
  status: PortfolioStatus
  settings: PortfolioSettings
  created_at: string
  updated_at: string
}

export interface PortfolioSettings {
  theme?: 'light' | 'dark' | 'auto'
  accentColor?: string
  showContact?: boolean
  customDomain?: string
}

// Projet/Réalisation
export interface PortfolioProject {
  id: string
  portfolio_id: string
  title: string
  description: string | null
  role: string | null
  company: string | null
  start_date: string | null
  end_date: string | null
  is_current: boolean
  skills: string[]
  metrics: ProjectMetric[]
  media: ProjectMedia[]
  links: ProjectLink[]
  visibility: Visibility
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProjectMetric {
  label: string
  value: string
  icon?: string
}

export interface ProjectMedia {
  type: 'image' | 'video' | 'document'
  url: string
  caption?: string
  thumbnail?: string
}

export interface ProjectLink {
  label: string
  url: string
  icon?: string
}

// Compétence
export interface PortfolioSkill {
  id: string
  portfolio_id: string
  name: string
  category: SkillCategory
  level: number // 1-5
  years_experience: number | null
  proof_project_ids: string[]
  sort_order: number
  created_at: string
}

// Certification
export interface PortfolioCertification {
  id: string
  portfolio_id: string
  name: string
  issuer: string | null
  issue_date: string | null
  expiry_date: string | null
  credential_id: string | null
  credential_url: string | null
  logo_url: string | null
  sort_order: number
  created_at: string
}

// Témoignage
export interface PortfolioTestimonial {
  id: string
  portfolio_id: string
  author_name: string
  author_title: string | null
  author_company: string | null
  author_photo_url: string | null
  content: string
  rating: number | null
  linkedin_url: string | null
  date: string | null
  sort_order: number
  created_at: string
}

// Formation
export interface PortfolioEducation {
  id: string
  portfolio_id: string
  school: string
  degree: string | null
  field: string | null
  start_date: string | null
  end_date: string | null
  description: string | null
  sort_order: number
  created_at: string
}

// Portfolio complet avec toutes les relations
export interface PortfolioFull extends Portfolio {
  projects: PortfolioProject[]
  skills: PortfolioSkill[]
  certifications: PortfolioCertification[]
  testimonials: PortfolioTestimonial[]
  education: PortfolioEducation[]
}

// Wizard state
export interface PortfolioWizardState {
  step: 'sector' | 'profile' | 'import' | 'review'
  sector: SectorId | null
  title: string
  tagline: string
  importFromCV: boolean
  cvAnalysisId: string | null
}
