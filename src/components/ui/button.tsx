import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-accent-70 hover:shadow-sm",
        accent: "bg-accent text-accent-foreground hover:bg-accent-70 hover:shadow-sm",
        secondary: "border border-border bg-background text-foreground hover:bg-muted hover:border-accent-30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-[color-mix(in_oklab,var(--destructive)_88%,black)] hover:shadow-sm",
        ghost: "text-foreground hover:bg-muted",
        // Hero/login CTA — marketing .button format: 48px, bold, wide gap,
        // hover lifts and swaps to accent. Not for dense app surfaces.
        cta: "h-12 gap-[22px] border border-primary bg-primary px-[19px] text-xs font-bold text-primary-foreground hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-md",
        // Pair for `cta` — marketing .button-secondary: same shape, transparent.
        "cta-secondary":
          "h-12 gap-[22px] border border-border bg-transparent px-[19px] text-xs font-bold text-foreground hover:-translate-y-0.5 hover:border-accent hover:bg-muted hover:shadow-md",
      },
      size: {
        sm: "h-8 gap-1.5 px-2.5 text-[13px] rounded-md",
        md: "h-9 px-3.5 text-sm",
        lg: "h-11 px-5 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({ variant, size, className, children, to, href, ...rest }: Props) {
  const cls = cn(buttonVariants({ variant, size }), className);
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href)
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  return <button className={cls} {...rest}>{children}</button>;
}

export { buttonVariants };
