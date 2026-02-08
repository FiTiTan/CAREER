'use client';

import Link from 'next/link';
import { ScoreRing } from '@/components/ui/score-ring';
import { TrendIcon, MODULE_COLORS } from '@/components/ui/module-icon';
import { PILLAR_CONFIG, PillarKey, CareerScore, RecommendedAction } from '@/types/score';
import {
  FileText,
  Palette,
  Target,
  Linkedin,
  Lock,
  Globe,
  LucideIcon,
} from 'lucide-react';

// Mapping pilier -> icône Lucide
const PILLAR_ICONS: Record<PillarKey, LucideIcon> = {
  documents: FileText,
  visibility: Palette,
  network: Linkedin,
  dynamique: Target,
  organisation: Lock,
  presence: Globe,
};

interface ScoreDashboardProps {
  score: CareerScore;
}

export function ScoreDashboard({ score }: ScoreDashboardProps) {
  const pillars = Object.entries(PILLAR_CONFIG) as [PillarKey, typeof PILLAR_CONFIG[PillarKey]][];

  return (
    <div className="space-y-6">
      {/* Hero Section - Score Ring */}
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 overflow-visible">
        <div className="flex-shrink-0">
          <ScoreRing
            total={score.total}
            pillars={{
              documents: score.pillars.documents.value,
              visibility: score.pillars.visibility.value,
              network: score.pillars.network.value,
              dynamique: score.pillars.dynamique.value,
              organisation: score.pillars.organisation.value,
              presence: score.pillars.presence.value,
            }}
            size={180}
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Votre CareerScore
          </h1>
          <p className="text-[var(--calm-text-secondary)] mb-4">
            {getScoreMessage(score.total)}
          </p>
          {score.recommended_action && (
            <ActionCard action={score.recommended_action} />
          )}
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map(([key, config]) => {
          const pillarScore = score.pillars[key];
          const Icon = PILLAR_ICONS[key];
          const stat = getPillarStat(key);
          
          return (
            <Link
              key={key}
              href={config.route}
              className="bg-[var(--calm-bg-card)] border border-[var(--calm-border)] rounded-[14px] p-5 transition-all hover:border-[var(--calm-border-hover)] hover:-translate-y-0.5 hover:shadow-sm group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Icône SVG dans cercle arrondi */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}15` }}
                  >
                    <Icon size={20} style={{ color: config.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{config.label}</h3>
                    <p className="text-sm text-[var(--calm-text-muted)]">{config.module}</p>
                  </div>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: config.color }}
                >
                  {pillarScore.value}
                </span>
              </div>
              
              {/* Progress bar + trend */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-1.5 rounded-full bg-[var(--calm-border)]">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pillarScore.value}%`, background: config.color }}
                  />
                </div>
                <TrendIcon trend={pillarScore.trend} />
              </div>
              
              {/* Stat + poids */}
              <div className="flex items-center justify-between text-xs text-[var(--calm-text-muted)]">
                <span>{stat}</span>
                <span>Poids: {Math.round(pillarScore.weight * 100)}%</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Action Card Component
function ActionCard({ action }: { action: RecommendedAction }) {
  const config = PILLAR_CONFIG[action.pillar];
  const Icon = PILLAR_ICONS[action.pillar];

  // Mapping action → label bouton
  const ctaLabels: Record<string, string> = {
    '/hub/linkedin/import': 'Importer maintenant',
    '/hub/cv-coach/new': 'Analyser mon CV',
    '/hub/portfolio/wizard': 'Créer mon portfolio',
    '/hub/e-reputation/scan': 'Lancer un scan',
    '/hub/job-match/preferences': 'Définir mes critères',
    '/hub/vault': 'Ajouter des fichiers',
  };
  const ctaLabel = ctaLabels[action.module_route] || 'Commencer';

  return (
    <div 
      className="p-5 rounded-xl border border-[var(--calm-border)]"
      style={{
        borderLeft: `3px solid ${config.color}`,
        background: `${config.color}08`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${config.color}15` }}
        >
          <Icon size={20} style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPriorityBadgeClass(action.priority)}`}>
              {action.priority === 'high' ? 'Prioritaire' : action.priority === 'medium' ? 'Recommandé' : 'Optionnel'}
            </span>
            <span className="text-sm font-semibold" style={{ color: config.color }}>
              +{action.potential_gain} pts
            </span>
          </div>
          <h4 className="font-semibold mb-1">{action.title}</h4>
          <p className="text-sm text-[var(--calm-text-secondary)] mb-4">{action.description}</p>
          
          {/* CTA Button */}
          <Link
            href={action.module_route}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:-translate-y-0.5"
            style={{
              background: config.color,
              boxShadow: `0 2px 8px ${config.color}40`,
            }}
          >
            {ctaLabel}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getScoreMessage(score: number): string {
  if (score >= 80) return 'Excellent ! Votre profil professionnel est optimisé.';
  if (score >= 60) return 'Bon travail ! Quelques améliorations pour atteindre l\'excellence.';
  if (score >= 40) return 'Des opportunités d\'amélioration vous attendent.';
  return 'Commencez par les actions recommandées pour booster votre carrière.';
}

function getPrimaryTrend(score: CareerScore): 'up' | 'down' | 'stable' {
  const trends = Object.values(score.pillars).map(p => p.trend);
  const ups = trends.filter(t => t === 'up').length;
  const downs = trends.filter(t => t === 'down').length;
  if (ups > downs) return 'up';
  if (downs > ups) return 'down';
  return 'stable';
}

function getPriorityBadgeClass(priority: 'high' | 'medium' | 'low'): string {
  return priority === 'high'
    ? 'bg-[rgba(239,68,68,0.15)] text-[var(--calm-error)]'
    : priority === 'medium'
    ? 'bg-[rgba(245,158,11,0.15)] text-[var(--calm-warning)]'
    : 'bg-[var(--calm-primary-light)] text-[var(--calm-primary)]';
}

function getPillarStat(pillarKey: string): string {
  // Stats statiques pour le moment - à connecter à l'API plus tard
  const stats: Record<string, string> = {
    documents: '3 CV analysés',
    visibility: '1 portfolio publié',
    network: 'Profil non importé',
    dynamique: '12 offres · 5 candidatures',
    organisation: '0 fichiers',
    presence: 'Dernier scan: il y a 3j',
  };
  return stats[pillarKey] || '';
}
