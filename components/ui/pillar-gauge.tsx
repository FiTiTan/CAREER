'use client';

import { PILLAR_CONFIG, PillarKey } from '@/types/score';

interface PillarGaugeProps {
  pillar: PillarKey;
  value: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md';
  animated?: boolean;
}

export function PillarGauge({
  pillar,
  value,
  showLabel = true,
  size = 'md',
  animated = true,
}: PillarGaugeProps) {
  const config = PILLAR_CONFIG[pillar];
  const height = size === 'sm' ? 'h-1.5' : 'h-2';

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{config.icon}</span>
            <span className="text-sm font-medium">{config.label}</span>
          </div>
          <span className="text-sm text-muted">{value}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-hover rounded-full overflow-hidden`}>
        <div
          className={`${height} rounded-full ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{
            width: `${value}%`,
            backgroundColor: config.color,
            boxShadow: `0 0 8px ${config.color}40`,
          }}
        />
      </div>
    </div>
  );
}
