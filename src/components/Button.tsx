import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/85",
  accent: "bg-accent text-primary-foreground hover:bg-accent/85",
  secondary: "border border-border bg-background text-text hover:bg-surface",
  ghost: "text-text hover:bg-surface",
};
const sizes: Record<Size, string> = { md: "h-9 px-3.5 text-sm", lg: "h-11 px-5 text-base" };

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({ variant = "primary", size = "md", className = "", children, to, href, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href)
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  return <button className={cls} {...rest}>{children}</button>;
}
