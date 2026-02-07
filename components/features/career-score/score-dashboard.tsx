'use client';

import Link from 'next/link';
import { ScoreRing } from '@/components/ui/score-ring';
import { PillarGauge } from '@/components/ui/pillar-gauge';
import { PILLAR_CONFIG, PillarKey, CareerScore, RecommendedAction } from '@/types/score';

interface ScoreDashboardProps {
  score: CareerScore;
}

export function ScoreDashboard({ score }: ScoreDashboardProps) {
  const pillars = Object.entries(PILLAR_CONFIG) as [PillarKey, typeof PILLAR_CONFIG[PillarKey]][];

  return (
    <div className="space-y-6">
      {/* Hero Section - Score Ring */}
      <div className="card flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        <div className="flex-shrink-0">
          <ScoreRing
            score={score.total}
            size="xl"
            trend={getPrimaryTrend(score)}
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Votre CareerScore
          </h1>
          <p className="text-secondary mb-4">
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
          return (
            <Link
              key={key}
              href={config.route}
              className="card card-interactive group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    {config.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold">{config.label}</h3>
                    <p className="text-sm text-muted">{config.module}</p>
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
                <span className="text-muted">
                  Poids: {Math.round(pillarScore.weight * 100)}%
                </span>
                <span className={getTrendClass(pillarScore.trend)}>
                  {getTrendIcon(pillarScore.trend)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="📄"
          label="CV analysés"
          value="3"
        />
        <StatCard
          icon="🎯"
          label="Offres matchées"
          value="12"
        />
        <StatCard
          icon="📊"
          label="Candidatures"
          value="5"
        />
        <StatCard
          icon="📈"
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

  return (
    <Link
      href={action.module_route}
      className="block p-4 rounded-xl bg-primary-light border border-primary/20 hover:border-primary/40 transition-colors"
    >
      <div className="flex items-start gap-3">
        <span
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: `${config.color}30` }}
        >
          {config.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`badge ${getPriorityBadge(action.priority)}`}>
              {action.priority === 'high' ? 'Prioritaire' : action.priority === 'medium' ? 'Recommandé' : 'Optionnel'}
            </span>
            <span className="text-sm text-primary">+{action.potential_gain} pts</span>
          </div>
          <h4 className="font-medium mb-0.5">{action.title}</h4>
          <p className="text-sm text-secondary line-clamp-2">{action.description}</p>
        </div>
        <span className="text-muted">→</span>
      </div>
    </Link>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  positive,
}: {
  icon: string;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className={`text-xl font-bold ${positive ? 'text-success' : ''}`}>
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

function getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
  return trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
}

function getTrendClass(trend: 'up' | 'down' | 'stable'): string {
  return trend === 'up'
    ? 'text-success'
    : trend === 'down'
    ? 'text-error'
    : 'text-muted';
}

function getPriorityBadge(priority: 'high' | 'medium' | 'low'): string {
  return priority === 'high'
    ? 'badge-error'
    : priority === 'medium'
    ? 'badge-warning'
    : 'badge-primary';
}
