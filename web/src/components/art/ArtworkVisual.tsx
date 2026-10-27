import type { Artwork } from "@/lib/data/art";

/** Small deterministic generator, so each artwork always gets the same composition. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

type ArtworkVisualProps = {
  artwork: Pick<Artwork, "id" | "title" | "ratio" | "palette">;
  className?: string;
};

/**
 * Abstract placeholder drawn from the artwork palette, until real images exist.
 * It is decorative, not a reproduction of the work.
 */
export function ArtworkVisual({ artwork, className = "" }: ArtworkVisualProps) {
  const [w, h] = artwork.ratio;
  const width = 100 * w;
  const height = 100 * h;
  const rand = seeded(artwork.id);
  const [background, ...colors] = artwork.palette;
  const shapes = Array.from({ length: 7 }, (_, i) => ({
    circle: rand() > 0.45,
    x: rand() * width,
    y: rand() * height,
    size: (0.18 + rand() * 0.45) * Math.min(width, height),
    color: colors[i % colors.length],
    opacity: 0.55 + rand() * 0.4,
  }));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Aperçu provisoire de « ${artwork.title} »`}
      className={className}
    >
      <rect width={width} height={height} fill={background} />
      {shapes.map((s, i) =>
        s.circle ? (
          <circle key={i} cx={s.x} cy={s.y} r={s.size / 2} fill={s.color} opacity={s.opacity} />
        ) : (
          <rect key={i} x={s.x - s.size / 2} y={s.y - s.size / 3} width={s.size} height={s.size / 1.5} fill={s.color} opacity={s.opacity} />
        ),
      )}
    </svg>
  );
}
