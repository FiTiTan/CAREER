'use client';

import Link from 'next/link';
import { ScoreRing } from '@/components/ui/score-ring';
import { PillarGauge } from '@/components/ui/pillar-gauge';
import { TrendIcon, MODULE_COLORS } from '@/components/ui/module-icon';
import { PILLAR_CONFIG, PillarKey, CareerScore, RecommendedAction } from '@/types/score';
import {
  FileText,
  Palette,
  Target,
  Linkedin,
  Lock,
  Globe,
  Zap,
  BarChart3,
  TrendingUp,
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
          
          return (
            <Link
              key={key}
              href={config.route}
              className="bg-[var(--calm-bg-card)] border border-[var(--calm-border)] rounded-[14px] p-5 transition-all hover:border-[var(--calm-border-hover)] hover:-translate-y-0.5 hover:shadow-sm group"
            >
              <div className="flex items-start justify-between mb-4">
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
                  className="text-xl font-bold"
                  style={{ color: config.color }}
                >
                  {pillarScore.value}
                </span>
              </div>
              <PillarGauge
                pillar={key}
                value={pillarScore.value}
                showLabel={false}
              />
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[var(--calm-text-muted)]">
                  Poids: {Math.round(pillarScore.weight * 100)}%
                </span>
                <TrendIcon trend={pillarScore.trend} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          Icon={FileText}
          color={MODULE_COLORS['cv-coach']}
          label="CV analysés"
          value="3"
        />
        <StatCard
          Icon={Target}
          color={MODULE_COLORS['job-match']}
          label="Offres matchées"
          value="12"
        />
        <StatCard
          Icon={BarChart3}
          color={MODULE_COLORS['portfolio']}
          label="Candidatures"
          value="5"
        />
        <StatCard
          Icon={TrendingUp}
          color="#00d4aa"
          label="Progression"
          value="+8%"
          positive
        />
      </div>
    </div>
  );
}

// Action Card Component
function ActionCard({ action }: { action: RecommendedAction }) {
  const config = PILLAR_CONFIG[action.pillar];
  const Icon = PILLAR_ICONS[action.pillar];

  return (
    <Link
      href={action.module_route}
      className="block p-4 rounded-xl bg-[var(--calm-bg-card)] border border-[var(--calm-border)] hover:border-[var(--calm-border-hover)] transition-colors"
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
            <span className="text-sm text-[var(--calm-primary)]">+{action.potential_gain} pts</span>
          </div>
          <h4 className="font-medium mb-0.5">{action.title}</h4>
          <p className="text-sm text-[var(--calm-text-secondary)] line-clamp-2">{action.description}</p>
        </div>
        <span className="text-[var(--calm-text-muted)]">→</span>
      </div>
    </Link>
  );
}

// Stat Card Component
function StatCard({
  Icon,
  color,
  label,
  value,
  positive,
}: {
  Icon: LucideIcon;
  color: string;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-[var(--calm-bg-card)] border border-[var(--calm-border)] rounded-[14px] p-4 transition-all hover:border-[var(--calm-border-hover)]">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-sm text-[var(--calm-text-muted)]">{label}</p>
          <p className={`text-xl font-bold ${positive ? 'text-[var(--calm-success)]' : ''}`}>
            {value}
          </p>
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
