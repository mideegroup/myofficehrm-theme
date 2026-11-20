import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

export const h2Class = "text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-5xl";

const toneClass = {
  default: "",
  surface: "border-y border-border bg-surface",
  inverse: "bg-primary text-primary-foreground",
};

export function Section({
  id,
  children,
  tone = "default",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: keyof typeof toneClass;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-14 py-24 md:py-32 ${toneClass[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{children}</p>;
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-14 max-w-2xl md:mb-20">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={h2Class}>{title}</h2>
      {sub && <p className="mt-4 text-pretty text-base leading-relaxed text-text-muted md:text-lg">{sub}</p>}
    </div>
  );
}

export function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-card">
      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
