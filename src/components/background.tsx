type Variant = "hero" | "section" | "page";

/**
 * Site-wide ambient background:
 *  - 3 floating gradient orb blobs (purple → indigo → blue)
 *  - Masked grid pattern overlay
 *  - Subtle film noise
 *
 * Render once at the page level (or section level) inside a `relative` parent.
 * It is `absolute inset-0` and always pointer-events-none.
 */
export function Background({ variant = "page" }: { variant?: Variant }) {
  if (variant === "hero") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb orb-purple orb-anim-1 -top-32 -left-24 h-[480px] w-[480px] sm:h-[560px] sm:w-[560px]" />
        <div className="orb orb-blue orb-anim-2 top-12 -right-24 h-[440px] w-[440px] sm:h-[520px] sm:w-[520px]" />
        <div className="orb orb-indigo orb-anim-3 top-[35%] left-[20%] h-[360px] w-[360px] sm:h-[440px] sm:w-[440px] opacity-40" />
        <div className="bg-grid-overlay" />
        <div className="bg-noise" />
      </div>
    );
  }
  if (variant === "section") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb orb-purple orb-anim-1 -top-24 -left-20 h-[360px] w-[360px] opacity-40" />
        <div className="orb orb-blue orb-anim-2 -bottom-32 -right-24 h-[400px] w-[400px] opacity-40" />
        <div className="bg-grid-overlay opacity-60" />
      </div>
    );
  }
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="orb orb-purple orb-anim-1 top-[-15%] left-[-10%] h-[520px] w-[520px] opacity-50" />
      <div className="orb orb-blue orb-anim-2 top-[40%] right-[-10%] h-[480px] w-[480px] opacity-45" />
      <div className="orb orb-indigo orb-anim-3 bottom-[-20%] left-[20%] h-[420px] w-[420px] opacity-35" />
      <div className="bg-grid-overlay" />
      <div className="bg-noise" />
    </div>
  );
}
