'use client';

import { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showLabel?: boolean;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

const sizeConfig = {
  sm: { diameter: 80, ringSize: 70, strokeWidth: 6, fontSize: 'text-lg' },
  md: { diameter: 120, ringSize: 100, strokeWidth: 8, fontSize: 'text-2xl' },
  lg: { diameter: 180, ringSize: 150, strokeWidth: 10, fontSize: 'text-4xl' },
  xl: { diameter: 240, ringSize: 200, strokeWidth: 12, fontSize: 'text-5xl' },
};

export function ScoreRing({
  score,
  size = 'md',
  animated = true,
  showLabel = true,
  trend,
  className = '',
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const config = sizeConfig[size];

  const radius = (config.ringSize - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  // Score color based on value
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'var(--calm-success)';
    if (value >= 60) return 'var(--calm-primary)';
    if (value >= 40) return 'var(--calm-warning)';
    return 'var(--calm-error)';
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  // Animate score counting
  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const stepValue = score / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(stepValue * step), score);
      setDisplayScore(current);

      if (step >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score, animated]);

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-visible ${className}`}
      style={{ width: config.diameter, height: config.diameter }}
    >
      <svg
        width={config.ringSize}
        height={config.ringSize}
        className="transform -rotate-90"
        style={{ overflow: 'visible' }}
      >
        {/* Background circle */}
        <circle
          cx={config.ringSize / 2}
          cy={config.ringSize / 2}
          r={radius}
          fill="none"
          stroke="var(--calm-bg-hover)"
          strokeWidth={config.strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={config.ringSize / 2}
          cy={config.ringSize / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(displayScore)}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={animated ? 'transition-all duration-1000 ease-out' : ''}
          style={{
            filter: `drop-shadow(0 0 6px ${getScoreColor(displayScore)})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-bold ${config.fontSize}`}
          style={{ color: getScoreColor(displayScore) }}
        >
          {displayScore}
        </span>
        {showLabel && (
          <span className="text-xs text-muted mt-1 flex items-center gap-1">
            <span>/100</span>
            {trend && (
              <span
                className={
                  trend === 'up'
                    ? 'text-success'
                    : trend === 'down'
                    ? 'text-error'
                    : 'text-muted'
                }
              >
                {trendIcons[trend]}
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
