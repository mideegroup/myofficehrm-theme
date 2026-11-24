import { Link } from "react-router-dom";

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        myOffice<span className="text-accent">HRM</span>
        <span className="ml-2 text-lg font-medium text-muted-foreground sm:text-xl">&amp; payroll</span>
      </span>
      <span className="mt-1.5 text-xs font-medium tracking-wide text-muted-foreground">by MiDee</span>
    </span>
  );
}

export function LogoWordmark({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="myOfficeHRM home"
      className={`rounded text-lg font-bold tracking-tight ${inverse ? "text-primary-foreground" : "text-foreground"} ${className}`}
    >
      myOffice<span className={inverse ? "text-accent-30" : "text-accent"}>HRM</span>
      <span className={inverse ? "text-accent-30" : "text-accent"}>.</span>
    </Link>
  );
}

export function LogoIcon({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="myOfficeHRM">
      <rect width="32" height="32" rx="7" fill="var(--foreground)" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="var(--background)"
      >
        m<tspan fill="var(--accent)">H</tspan>
      </text>
    </svg>
  );
}
