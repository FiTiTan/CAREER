'use client';

import { useMemo } from 'react';
import { PILLAR_CONFIG, PILLAR_WEIGHTS, PillarKey } from '@/types/score';

interface ScoreRingProps {
  total: number;
  pillars: Record<string, number>;
  size?: number;
  strokeWidth?: number;
  animated?: boolean;
}

export function ScoreRing({ 
  total, 
  pillars, 
  size = 180, 
  strokeWidth = 12,
  animated = true 
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const gap = 3;

  const segments = useMemo(() => {
    const pillarOrder: PillarKey[] = ['documents', 'visibility', 'network', 'dynamique', 'organisation', 'presence'];
    let currentAngle = -90; // commence en haut

    return pillarOrder.map((key) => {
      const weight = PILLAR_WEIGHTS[key];
      const score = pillars[key] || 0;
      const totalDegrees = weight * 360;
      const filledDegrees = (score / 100) * totalDegrees;
      const config = PILLAR_CONFIG[key];

      const segment = {
        key,
        color: config.color,
        startAngle: currentAngle + (gap / 2),
        filledAngle: Math.max(0, filledDegrees - gap),
        totalAngle: totalDegrees - gap,
      };

      currentAngle += totalDegrees;
      return segment;
    });
  }, [pillars]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg) => (
          <g key={seg.key}>
            {/* Arc gris (fond) */}
            <Arc
              cx={center}
              cy={center}
              r={radius}
              startAngle={seg.startAngle}
              endAngle={seg.startAngle + seg.totalAngle}
              strokeWidth={strokeWidth}
              color="var(--calm-border)"
            />
            {/* Arc coloré (rempli) */}
            {seg.filledAngle > 0 && (
              <Arc
                cx={center}
                cy={center}
                r={radius}
                startAngle={seg.startAngle}
                endAngle={seg.startAngle + seg.filledAngle}
                strokeWidth={strokeWidth}
                color={seg.color}
                animated={animated}
              />
            )}
          </g>
        ))}
      </svg>
      
      {/* Score central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-4xl font-extrabold"
          style={{ color: getScoreColor(total) }}
        >
          {total}
        </span>
        <span className="text-xs text-[var(--calm-text-muted)]">/100 ↑</span>
      </div>
    </div>
  );
}

// Helper : dessiner un arc SVG
function Arc({ 
  cx, cy, r, startAngle, endAngle, strokeWidth, color, animated = false 
}: {
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
  strokeWidth: number;
  color: string;
  animated?: boolean;
}) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  const d = `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;

  return (
    <path 
      d={d} 
      fill="none" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
      className={animated ? 'transition-all duration-1000 ease-out' : ''}
    />
  );
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#00d4aa';
  if (score >= 60) return '#06d6a0';
  if (score >= 40) return '#fbbf24';
  return '#ef4444';
}

// Export pour compatibilité
export default ScoreRing;
