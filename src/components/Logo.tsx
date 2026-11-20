import { Link } from "react-router-dom";

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
        myOffice<span className="text-accent">HRM</span>
        <span className="ml-2 text-lg font-medium text-text-muted sm:text-xl">&amp; payroll</span>
      </span>
      <span className="mt-1.5 text-xs font-medium tracking-wide text-text-muted">by MiDee</span>
    </span>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="myOfficeHRM home"
      className={`rounded text-lg font-bold tracking-tight text-text ${className}`}
    >
      myOffice<span className="text-accent">HRM</span>
    </Link>
  );
}

export function LogoIcon({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="myOfficeHRM">
      <rect width="32" height="32" rx="7" fill="var(--text)" />
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
