"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Sequence of strings to type / hold / clear / type next. */
  phrases: string[];
  typeMs?: number;
  holdMs?: number;
  className?: string;
  caretClassName?: string;
};

/**
 * Lightweight typewriter — types each phrase character by character,
 * holds, then deletes and continues. Used inside the hero "code box"
 * to give the AI-prompt feel.
 */
export function Typewriter({
  phrases,
  typeMs = 36,
  holdMs = 1400,
  className = "",
  caretClassName = "ml-0.5 h-[1em] align-[-0.18em]",
}: Props) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting">("typing");

  useEffect(() => {
    const phrase = phrases[idx % phrases.length] ?? "";
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < phrase.length) {
        timer = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typeMs);
      } else {
        timer = setTimeout(() => setPhase("hold"), 0);
      }
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("deleting"), holdMs);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), typeMs / 1.6);
      } else {
        setIdx((i) => i + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx, phrases, typeMs, holdMs]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className={`caret ${caretClassName}`.trim()} aria-hidden />
    </span>
  );
}
