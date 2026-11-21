import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

type FieldProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export function Field({ label, htmlFor, description, error, required, children, className, ...props }: FieldProps) {
  const descId = htmlFor ? `${htmlFor}-desc` : undefined;
  const errId = htmlFor ? `${htmlFor}-err` : undefined;
  return (
    <div className={cn("grid gap-1.5", className)} {...props}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>}
      </Label>
      {children}
      {error ? (
        <p id={errId} role="alert" className="text-xs font-medium text-destructive">{error}</p>
      ) : description ? (
        <p id={descId} className="text-xs text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
