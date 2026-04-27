import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none transition-[background,color,border,transform,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)]";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow-purple)] hover:-translate-y-px hover:shadow-[var(--shadow-glow-mix)]",
  secondary:
    "bg-white/5 text-[var(--text-primary)] border border-[var(--border-strong)] backdrop-blur hover:bg-white/10 hover:border-[var(--brand-violet)]",
  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]",
};

const sizes: Record<Size, string> = {
  md: "text-[13px] leading-5 font-semibold px-5 py-3 rounded-[var(--radius-md)]",
  lg: "text-[15px] leading-6 font-semibold px-6 py-3.5 rounded-[var(--radius-md)]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    className = "",
    children,
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children ? <span>{children}</span> : null}
      {iconRight ? <span className="shrink-0">{iconRight}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    const {
      variant: _v,
      size: _s,
      icon: _i,
      iconRight: _ir,
      className: _c,
      children: _ch,
      href,
      ...rest
    } = props;
    void _v; void _s; void _i; void _ir; void _c; void _ch;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    icon: _i,
    iconRight: _ir,
    className: _c,
    children: _ch,
    ...rest
  } = props as ButtonAsButton;
  void _v; void _s; void _i; void _ir; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
