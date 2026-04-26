import type { Dict } from "@/i18n/dictionaries";

type Item = Dict["portfolio"]["items"][number];

export function ProjectThumb({ item, ratio = "4/3" }: { item: Item; ratio?: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]"
      style={{ aspectRatio: ratio, background: item.color }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px 300px at 20% 20%, rgba(255,255,255,0.15), transparent 60%), radial-gradient(500px 260px at 80% 80%, rgba(255,255,255,0.08), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 grid-dots opacity-20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-caption uppercase tracking-[0.14em] text-white/60">
          {item.category}
        </div>
        <div className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.015em] text-white">
          {item.name}
        </div>
        <div className="mt-3 text-body-sm text-white/70 max-w-[28ch]">
          {item.tagline}
        </div>
      </div>
    </div>
  );
}
