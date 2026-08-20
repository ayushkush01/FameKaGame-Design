export function SalesChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  const width = 720;
  const height = 260;
  const padding = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const points = values.map((value, index) => {
    const x = padding + (index / Math.max(1, values.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);

    return { x, y };
  });
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points.at(-1)?.x ?? width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div className="h-[260px] w-full">
      <svg aria-label="Monthly sales trend chart" className="h-full w-full" role="img" viewBox={`0 0 ${width} ${height}`}>
        {[0, 1, 2, 3].map((line) => {
          const y = padding + line * ((height - padding * 2) / 3);

          return (
            <line
              key={line}
              stroke="var(--separator)"
              strokeDasharray="4 8"
              strokeWidth="1"
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
            />
          );
        })}
        <path d={areaPath} fill="color-mix(in oklab, var(--accent) 14%, transparent)" />
        <path d={linePath} fill="none" stroke="var(--accent)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        {points.map((point, index) => (
          <g key={`${point.x}-${point.y}`}>
            <circle cx={point.x} cy={point.y} fill="var(--surface)" r="6" stroke="var(--accent)" strokeWidth="3" />
            {index % 2 === 0 && (
              <text fill="var(--muted)" fontSize="12" textAnchor="middle" x={point.x} y={height - 6}>
                {labels[index]}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
