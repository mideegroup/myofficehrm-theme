import { Link } from "react-router-dom";
import { LogoFull } from "./Logo";
import { DOCS_URL, GITHUB_URL } from "./Nav";

const col = "text-sm text-text-muted transition-colors hover:text-text";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <LogoFull />
          <p className="mt-4 max-w-xs text-sm text-text-muted">
            Open-source, configurable HRM &amp; Payroll. Built by MiDee Group Pvt Ltd.
          </p>
        </div>
        <nav aria-label="Product" className="flex flex-col gap-2.5">
          <span className="text-sm font-semibold">Project</span>
          <a className={col} href={GITHUB_URL}>GitHub</a>
          <a className={col} href={DOCS_URL}>Docs</a>
          <Link className={col} to="/demo">Demo</Link>
        </nav>
        <nav aria-label="Company" className="flex flex-col gap-2.5">
          <span className="text-sm font-semibold">Company</span>
          <a className={col} href="https://midee.example">MiDee</a>
          <a className={col} href={`${GITHUB_URL}/blob/main/LICENSE`}>AGPL-3.0</a>
          <a className={col} href="/privacy">Privacy</a>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-text-muted sm:px-6">
          © {new Date().getFullYear()} MiDee Group Pvt Ltd. Licensed under AGPL-3.0.
        </p>
      </div>
    </footer>
  );
}
