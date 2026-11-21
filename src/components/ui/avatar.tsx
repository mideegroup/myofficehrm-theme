import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  initials: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "size-7 text-[10px]", md: "size-9 text-xs", lg: "size-11 text-sm" };

export function Avatar({ initials, src, alt = "", size = "md", className, ...props }: Props) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-10 font-medium text-accent",
        sizes[size],
        className,
      )}
      {...props}
    >
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : initials}
    </div>
  );
}
