type Variant = "generator" | "gallery" | "settings";

type Props = {
  variant: Variant;
  /** -1 (tilt left) | 0 (centered) | 1 (tilt right) */
  tilt?: -1 | 0 | 1;
  className?: string;
  /** Translated labels — kept locale-agnostic via dictionary. */
  labels?: {
    promptLabel: string;
    promptValue: string;
    generate: string;
    galleryTitle: string;
    settingsTitle: string;
    apiLabel: string;
    quotaLabel: string;
    quotaValue: string;
    creditsLabel: string;
    languageLabel: string;
    languageValue: string;
    galleryItems: string[];
  };
};

const FALLBACK_LABELS: NonNullable<Props["labels"]> = {
  promptLabel: "Prompt",
  promptValue: "neon-lit cyberpunk street at midnight, cinematic",
  generate: "Generate",
  galleryTitle: "Gallery",
  settingsTitle: "Settings",
  apiLabel: "Pollinations API",
  quotaLabel: "Daily quota",
  quotaValue: "23 / 50",
  creditsLabel: "Credits",
  languageLabel: "Language",
  languageValue: "English",
  galleryItems: [
    "Cyberpunk skyline",
    "Anime mountain shrine",
    "Brutalist concrete cathedral",
    "Studio portrait, soft light",
  ],
};

/**
 * Stylized phone shell with three swappable fake app screens. Used in the hero
 * trio. SVG-free — pure HTML + Tailwind so it scales fluidly on touch devices.
 */
export function PhoneMockup({ variant, tilt = 0, className = "", labels }: Props) {
  const l = labels ?? FALLBACK_LABELS;
  const tiltStyle =
    tilt === -1
      ? { ["--phone-ry" as string]: "-12deg", ["--phone-rx" as string]: "8deg" }
      : tilt === 1
      ? { ["--phone-ry" as string]: "12deg", ["--phone-rx" as string]: "8deg" }
      : { ["--phone-ry" as string]: "0deg", ["--phone-rx" as string]: "4deg" };

  return (
    <div
      className={`relative ${className}`.trim()}
      style={{ perspective: "1400px" }}
    >
      <div
        className="float-phone relative mx-auto w-[260px] h-[540px] sm:w-[280px] sm:h-[580px]"
        style={{
          ...tiltStyle,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow under phone */}
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[60px] opacity-70 blur-2xl"
          style={{ background: "var(--gradient-radial-purple)" }}
        />

        {/* Phone body */}
        <div className="relative h-full w-full rounded-[44px] border border-white/10 bg-gradient-to-b from-[#1a1a25] to-[#0f0f17] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
          {/* Side buttons (cosmetic) */}
          <span aria-hidden className="absolute -left-0.5 top-24 h-12 w-1 rounded-r bg-white/10" />
          <span aria-hidden className="absolute -left-0.5 top-40 h-16 w-1 rounded-r bg-white/10" />
          <span aria-hidden className="absolute -right-0.5 top-32 h-20 w-1 rounded-l bg-white/10" />

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#0a0a0f]">
            {/* Notch */}
            <div
              aria-hidden
              className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80"
            />

            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-white/80 ltr-nums">
              <span>9:41</span>
              <span className="opacity-60">●●● ●●● ⌬</span>
            </div>

            {variant === "generator" && <GeneratorScreen l={l} />}
            {variant === "gallery" && <GalleryScreen l={l} />}
            {variant === "settings" && <SettingsScreen l={l} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneratorScreen({ l }: { l: NonNullable<Props["labels"]> }) {
  return (
    <div className="flex h-[calc(100%-32px)] flex-col gap-3 px-4 pt-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
        text → image
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <div className="text-[10px] font-medium uppercase tracking-wider text-white/40">
          {l.promptLabel}
        </div>
        <div className="mt-1.5 text-[12px] leading-snug text-white/85">
          {l.promptValue}
        </div>
      </div>

      {/* Preview */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 20%, #7c3aed 0%, #3b82f6 35%, #06b6d4 65%, #0a0a0f 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-50"
          style={{
            background:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 8px)",
          }}
        />
        <div className="relative z-10 flex h-full items-end justify-between p-3 text-[10px] font-medium text-white/85">
          <span className="rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">512×640</span>
          <span className="rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">flux-1</span>
        </div>
      </div>

      {/* Aspect chips */}
      <div className="flex gap-1.5 text-[10px] font-semibold text-white/60">
        <span className="rounded-full bg-white/8 px-2 py-1 ring-1 ring-white/10">1:1</span>
        <span className="rounded-full bg-gradient-to-br from-violet-500 to-blue-500 px-2 py-1 text-white">
          4:5
        </span>
        <span className="rounded-full bg-white/8 px-2 py-1 ring-1 ring-white/10">9:16</span>
      </div>

      {/* CTA */}
      <button
        type="button"
        className="mt-auto rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 py-3 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.45)]"
      >
        {l.generate}
      </button>
    </div>
  );
}

function GalleryScreen({ l }: { l: NonNullable<Props["labels"]> }) {
  const palettes = [
    "linear-gradient(135deg,#7c3aed,#3b82f6)",
    "linear-gradient(135deg,#ec4899,#8b5cf6)",
    "linear-gradient(135deg,#06b6d4,#3b82f6)",
    "linear-gradient(135deg,#f59e0b,#ef4444)",
    "linear-gradient(135deg,#10b981,#06b6d4)",
    "linear-gradient(135deg,#6366f1,#0ea5e9)",
  ];
  return (
    <div className="flex h-[calc(100%-32px)] flex-col gap-3 px-4 pt-6">
      <div className="flex items-baseline justify-between">
        <div className="text-[15px] font-semibold tracking-tight text-white">
          {l.galleryTitle}
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
          24
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {palettes.map((p, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl border border-white/10"
            style={{ background: p }}
          >
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-overlay opacity-40"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 4px)",
              }}
            />
            <div className="absolute bottom-1.5 left-1.5 right-1.5 truncate text-[9px] font-medium text-white/85">
              {l.galleryItems[i % l.galleryItems.length]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen({ l }: { l: NonNullable<Props["labels"]> }) {
  const rows = [
    { label: l.apiLabel, value: "Connected", accent: true },
    { label: l.quotaLabel, value: l.quotaValue },
    { label: l.creditsLabel, value: "373" },
    { label: l.languageLabel, value: l.languageValue },
  ];
  return (
    <div className="flex h-[calc(100%-32px)] flex-col gap-3 px-4 pt-6">
      <div className="text-[15px] font-semibold tracking-tight text-white">
        {l.settingsTitle}
      </div>

      {/* Avatar block */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <div
          aria-hidden
          className="h-10 w-10 rounded-full"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="min-w-0">
          <div className="truncate text-[12px] font-semibold text-white">Seto Kaiba</div>
          <div className="truncate text-[10px] text-white/55">seto@text-to-image.app</div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 divide-y divide-white/5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[11px] text-white/65">{r.label}</span>
            <span
              className={`text-[11px] font-semibold ${
                r.accent ? "text-emerald-400" : "text-white/85"
              }`}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* Theme strip */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <div className="text-[10px] font-medium uppercase tracking-wider text-white/40">
          Theme
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <span className="h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 ring-2 ring-white/40" />
          <span className="h-8 rounded-lg bg-gradient-to-br from-pink-500 to-amber-400" />
          <span className="h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500" />
        </div>
      </div>
    </div>
  );
}
