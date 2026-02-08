'use client';

import {
  FileText,
  Palette,
  Target,
  Linkedin,
  Lock,
  Globe,
  ShoppingBag,
  Settings,
  Diamond,
  Bell,
  User,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Upload,
  BarChart3,
  LucideIcon,
} from 'lucide-react';

// Mapping des modules vers icônes Lucide
export const MODULE_ICONS: Record<string, LucideIcon> = {
  score: Diamond,
  documents: FileText,
  'cv-coach': FileText,
  visibility: Palette,
  portfolio: Palette,
  network: Linkedin,
  linkedin: Linkedin,
  dynamique: Target,
  'job-match': Target,
  organisation: Lock,
  vault: Lock,
  presence: Globe,
  'e-reputation': Globe,
  boutique: ShoppingBag,
  settings: Settings,
  bell: Bell,
  user: User,
  search: Search,
  upload: Upload,
  stats: BarChart3,
  action: Zap,
};

// Couleurs par module (hex)
export const MODULE_COLORS: Record<string, string> = {
  score: '#fbbf24',
  documents: '#4f8fff',
  'cv-coach': '#4f8fff',
  visibility: '#8b5cf6',
  portfolio: '#8b5cf6',
  network: '#0a66c2',
  linkedin: '#0a66c2',
  dynamique: '#06d6a0',
  'job-match': '#06d6a0',
  organisation: '#ff8c42',
  vault: '#ff8c42',
  presence: '#f472b6',
  'e-reputation': '#f472b6',
  boutique: '#fbbf24',
  settings: '#7580a8',
};

// Tendances
export const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

interface ModuleIconProps {
  module: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ModuleIcon({ module, size = 'md', className = '' }: ModuleIconProps) {
  const Icon = MODULE_ICONS[module] || Diamond;
  const color = MODULE_COLORS[module] || '#00d4aa';

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = { sm: 16, md: 20, lg: 24 };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center ${className}`}
      style={{ backgroundColor: `${color}15` }}
    >
      <Icon size={iconSizes[size]} style={{ color }} />
    </div>
  );
}

// Icône de tendance
interface TrendIconProps {
  trend: 'up' | 'down' | 'stable';
  size?: number;
}

export function TrendIcon({ trend, size = 16 }: TrendIconProps) {
  const Icon = TREND_ICONS[trend];
  const colors = {
    up: 'var(--calm-success)',
    down: 'var(--calm-error)',
    stable: 'var(--calm-text-muted)',
  };

  return <Icon size={size} style={{ color: colors[trend] }} />;
}
