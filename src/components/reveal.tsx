"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Render unstyled wrapper if the user has reduced motion. */
  once?: boolean;
  style?: CSSProperties;
};

/**
 * Scroll-triggered fade + lift. Mounted lazily via IntersectionObserver,
 * so it works for hundreds of elements without measurable JS cost.
 */
export function Reveal({
  as: As = "div",
  children,
  className = "",
  delay = 0,
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-revealed");
            if (once) io.unobserve(e.target);
          } else if (!once) {
            (e.target as HTMLElement).classList.remove("is-revealed");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  const delayClass = delay ? `reveal-delay-${delay}` : "";
  return (
    <As
      ref={ref as never}
      className={`reveal ${delayClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </As>
  );
}
