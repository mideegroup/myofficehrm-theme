/**
 * Brand illustration figures — flat geometric people bound to the theme tokens.
 * These are hand-built vector assets; they can be swapped for generated art
 * later without touching the hero composition.
 */

const INK = "#34332E";
const OFFWHITE = "#FBFAF6";
const WARM_GRAY = "#7B776D";

type FigProps = { className?: string };

export function HrLeadFigure({ className = "" }: FigProps) {
  return (
    <svg viewBox="0 0 200 300" className={className} role="img" aria-label="HR lead using the platform">
      {/* hair */}
      <circle cx="100" cy="42" r="26" fill={INK} />
      {/* face */}
      <circle cx="100" cy="54" r="22" fill="#B57A44" />
      <circle cx="93" cy="52" r="2.2" fill={INK} />
      <circle cx="107" cy="52" r="2.2" fill={INK} />
      <path d="M95 61 q5 4 10 0" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* neck + blazer */}
      <rect x="94" y="74" width="12" height="12" fill="#B57A44" />
      <path d="M70 88 q30 -12 60 0 q8 34 4 68 l-68 0 q-4 -34 4 -68z" fill="var(--accent)" />
      <path d="M93 88 l7 22 7 -22 z" fill={OFFWHITE} />
      {/* left arm relaxed */}
      <path d="M74 94 q-16 26 -12 54" stroke="var(--accent)" strokeWidth="13" fill="none" strokeLinecap="round" />
      <circle cx="63" cy="150" r="6.5" fill="#B57A44" />
      {/* right arm to tablet */}
      <path d="M126 94 q18 18 15 44" stroke="var(--accent)" strokeWidth="13" fill="none" strokeLinecap="round" />
      <circle cx="140" cy="140" r="6.5" fill="#B57A44" />
      {/* tablet with accent screen + checkmark */}
      <rect x="132" y="98" width="32" height="44" rx="5" fill={INK} />
      <rect x="136" y="102" width="24" height="30" rx="2" fill="var(--accent)" />
      <path d="M143 116 l5 5 9 -10" stroke={OFFWHITE} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* trousers */}
      <path d="M72 156 l56 0 q4 36 0 56 l-60 0 q-2 -26 4 -56z" fill={WARM_GRAY} />
      {/* legs + shoes */}
      <rect x="82" y="212" width="14" height="76" rx="7" fill={INK} />
      <rect x="106" y="212" width="14" height="76" rx="7" fill={INK} />
      <ellipse cx="89" cy="290" rx="13" ry="6" fill={INK} />
      <ellipse cx="113" cy="290" rx="13" ry="6" fill={INK} />
    </svg>
  );
}

export function PayrollAdminFigure({ className = "" }: FigProps) {
  return (
    <svg viewBox="0 0 200 300" className={className} role="img" aria-label="Payroll administrator reviewing a run">
      {/* short hair */}
      <path d="M76 48 a24 24 0 0 1 48 0 l0 -8 q-24 -18 -48 0 z" fill={INK} />
      {/* face + glasses */}
      <circle cx="100" cy="54" r="22" fill="#8D5524" />
      <circle cx="92" cy="54" r="6" fill="none" stroke={INK} strokeWidth="1.8" />
      <circle cx="108" cy="54" r="6" fill="none" stroke={INK} strokeWidth="1.8" />
      <path d="M98 54 l4 0" stroke={INK} strokeWidth="1.8" />
      <circle cx="92" cy="54" r="1.8" fill={INK} />
      <circle cx="108" cy="54" r="1.8" fill={INK} />
      {/* neck + shirt */}
      <rect x="94" y="74" width="12" height="12" fill="#8D5524" />
      <path d="M70 88 q30 -12 60 0 q8 34 4 68 l-68 0 q-4 -34 4 -68z" fill={OFFWHITE} />
      <path d="M97 88 l3 0 0 34 -3 4 -3 -4 z" fill="var(--accent-2)" />
      {/* left arm bent holding payslip */}
      <path d="M74 94 q-14 26 -6 50" stroke={OFFWHITE} strokeWidth="13" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="148" r="6.5" fill="#8D5524" />
      {/* right arm down with documents */}
      <path d="M126 94 q16 28 12 58" stroke={OFFWHITE} strokeWidth="13" fill="none" strokeLinecap="round" />
      <circle cx="138" cy="156" r="6.5" fill="#8D5524" />
      {/* payslip document */}
      <g transform="rotate(-6 142 178)">
        <rect x="126" y="158" width="32" height="42" rx="3" fill={OFFWHITE} stroke={WARM_GRAY} strokeWidth="1.2" />
        <rect x="131" y="166" width="22" height="3" rx="1.5" fill="var(--accent-2)" />
        <rect x="131" y="174" width="16" height="2.4" rx="1.2" fill={WARM_GRAY} />
        <rect x="131" y="181" width="19" height="2.4" rx="1.2" fill={WARM_GRAY} />
        <rect x="131" y="188" width="12" height="2.4" rx="1.2" fill="var(--accent-2)" />
      </g>
      {/* trousers */}
      <path d="M72 156 l56 0 q4 36 0 56 l-60 0 q-2 -26 4 -56z" fill={INK} />
      {/* legs + shoes */}
      <rect x="82" y="212" width="14" height="76" rx="7" fill={INK} />
      <rect x="106" y="212" width="14" height="76" rx="7" fill={INK} />
      <ellipse cx="89" cy="290" rx="13" ry="6" fill={INK} />
      <ellipse cx="113" cy="290" rx="13" ry="6" fill={INK} />
    </svg>
  );
}

export function EmployeeFigure({ className = "" }: FigProps) {
  return (
    <svg viewBox="0 0 200 300" className={className} role="img" aria-label="Employee checking the self-service app">
      {/* bun hair */}
      <circle cx="100" cy="40" r="25" fill={INK} />
      <circle cx="100" cy="18" r="9" fill={INK} />
      {/* face */}
      <circle cx="100" cy="54" r="22" fill="#F1C27D" />
      <circle cx="93" cy="52" r="2.2" fill={INK} />
      <circle cx="107" cy="52" r="2.2" fill={INK} />
      <path d="M95 61 q5 4 10 0" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* neck + sweater */}
      <rect x="94" y="74" width="12" height="12" fill="#F1C27D" />
      <path d="M70 88 q30 -12 60 0 q8 34 4 68 l-68 0 q-4 -34 4 -68z" fill="var(--accent-2)" />
      {/* left arm relaxed */}
      <path d="M74 94 q-16 26 -12 54" stroke="var(--accent-2)" strokeWidth="13" fill="none" strokeLinecap="round" />
      <circle cx="63" cy="150" r="6.5" fill="#F1C27D" />
      {/* right arm raised with phone */}
      <path d="M126 94 q20 6 24 -18" stroke="var(--accent-2)" strokeWidth="13" fill="none" strokeLinecap="round" />
      <circle cx="150" cy="72" r="6.5" fill="#F1C27D" />
      {/* phone with accent screen */}
      <rect x="146" y="40" width="20" height="34" rx="4" fill={INK} />
      <rect x="149" y="44" width="14" height="22" rx="1.5" fill="var(--accent)" />
      {/* trousers */}
      <path d="M72 156 l56 0 q4 36 0 56 l-60 0 q-2 -26 4 -56z" fill={INK} />
      {/* legs + shoes */}
      <rect x="82" y="212" width="14" height="76" rx="7" fill={INK} />
      <rect x="106" y="212" width="14" height="76" rx="7" fill={INK} />
      <ellipse cx="89" cy="290" rx="13" ry="6" fill={INK} />
      <ellipse cx="113" cy="290" rx="13" ry="6" fill={INK} />
    </svg>
  );
}

/** Faint org-chart connector lines from the figures to their product scenes. */
export function ConnectorLines({ className = "" }: FigProps) {
  return (
    <svg
      viewBox="0 0 1152 640"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M110 320 C 160 280, 200 260, 255 265"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="3 6"
        strokeLinecap="round"
      />
      <path
        d="M1045 340 C 995 300, 950 285, 895 300"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="3 6"
        strokeLinecap="round"
      />
      <path
        d="M960 580 C 935 545, 915 520, 885 500"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="3 6"
        strokeLinecap="round"
      />
    </svg>
  );
}
