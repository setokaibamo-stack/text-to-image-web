import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const common = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8" />
      <path d="m15.6 15.6 2.8 2.8" />
      <path d="m5.6 18.4 2.8-2.8" />
      <path d="m15.6 8.4 2.8-2.8" />
    </svg>
  );
}

export function PaperclipIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 1 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...common} fill="currentColor" strokeWidth={0} {...props}>
      <path d="M12 2.5l2.9 6.5 7.1.7-5.3 4.8 1.5 7-6.2-3.6L5.8 21.5l1.5-7L2 9.7l7.1-.7z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M4 4l7.5 9.5L4.5 20h2l6-6 4.5 6H20l-7.9-10 6.9-6h-2l-5.9 5.2L8 4z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <rect x={3} y={3} width={18} height={18} rx={3} />
      <path d="M8 10v7" />
      <path d="M8 7.5v.01" />
      <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
      <path d="M12 10v7" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M15 22v-4a3.5 3.5 0 0 0-1-2.7c3 0 6-2 6-5.5a4.8 4.8 0 0 0-1-3.3 4.6 4.6 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C7 3 5.9 3.3 5.9 3.3a4.6 4.6 0 0 0-.1 3.2 4.8 4.8 0 0 0-1 3.3c0 3.5 3 5.5 6 5.5-.4.4-.7.9-.9 1.4-.3.6-.3 1.2-.3 1.8V22" />
      <path d="M9 18c-4 2-5-2-7-2" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <rect x={3} y={3} width={18} height={18} rx={5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17.5} cy={6.5} r={0.5} fill="currentColor" />
    </svg>
  );
}
