import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/85",
        accent: "bg-accent text-accent-foreground hover:bg-accent-70",
        secondary: "border border-border bg-background text-foreground hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/85",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-8 px-2.5 text-xs rounded-md",
        md: "h-9 px-3.5 text-sm",
        lg: "h-11 px-5 text-base",
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
