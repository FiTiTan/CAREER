'use client';

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function ScoreSparkline({ 
  data, 
  color = '#00d4aa', 
  width = 120, 
  height = 32 
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Générer les points SVG
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((val - min) / range) * (height - 4) - 2,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  // Gradient fill sous la ligne
  const fillD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  const delta = data[data.length - 1] - data[0];
  const deltaText = delta >= 0 ? `+${delta} pts ce mois` : `${delta} pts ce mois`;
  const deltaColor = delta >= 0 ? color : '#ef4444';

  return (
    <div className="flex items-center gap-3">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#sparkGrad)" />
        <path 
          d={pathD} 
          fill="none" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Point final */}
        <circle 
          cx={points[points.length - 1].x} 
          cy={points[points.length - 1].y} 
          r="3" 
          fill={color} 
        />
      </svg>
      <span className="text-xs font-medium" style={{ color: deltaColor }}>
        {deltaText}
      </span>
    </div>
  );
}

export default ScoreSparkline;
