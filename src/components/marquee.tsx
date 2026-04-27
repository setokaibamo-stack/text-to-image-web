"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  children: ReactNode;
  /** RTL layouts should reverse direction so the visual flow still feels natural. */
  rtl?: boolean;
  className?: string;
};

/**
 * Infinite marquee. Children are rendered twice (with `aria-hidden` on the
 * duplicate) so the strip can translateX(-50%) and seamlessly loop.
 * Hover pauses the animation for readability.
 */
export function Marquee({ children, rtl = false, className = "" }: Props) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={`relative overflow-hidden ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`marquee-track ${paused ? "marquee-paused" : ""}`}
        data-rtl={rtl ? "true" : "false"}
      >
        <div className="flex shrink-0 items-stretch gap-5 pe-5">{children}</div>
        <div className="flex shrink-0 items-stretch gap-5 pe-5" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
