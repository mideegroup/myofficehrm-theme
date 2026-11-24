import { ArrowLeft, RotateCw, ShieldAlert, FileQuestion, ServerCrash, type LucideIcon } from "lucide-react";
import { Button } from "../components/ui/button";

const CONTENT: Record<string, { icon: LucideIcon; kicker: string; title: string; description: string; retry?: boolean }> = {
  "403": {
    icon: ShieldAlert,
    kicker: "ACCESS RESTRICTED",
    title: "You don't have access to this page",
    description: "Ask an administrator to grant you the required permission, or switch to a workspace where your role covers it.",
  },
  "404": {
    icon: FileQuestion,
    kicker: "PAGE NOT FOUND",
    title: "This page doesn't exist",
    description: "The link may be out of date, or the page may have moved. Check the address or head back to safety.",
  },
  "500": {
    icon: ServerCrash,
    kicker: "SOMETHING WENT WRONG",
    title: "We hit an unexpected error",
    description: "This is on us, not you. Try again in a moment — if it persists, contact support with what you were doing.",
    retry: true,
  },
};

/** Full-page error inside the app shell — one design covers 403/404/500.
 *  500 carries a retry affordance (reload); 403/404 only route home —
 *  retrying those can't help. */
export default function ErrorPage({ code }: { code: "403" | "404" | "500" }) {
  const { icon: Icon, kicker, title, description, retry } = CONTENT[code];
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-accent-10 text-accent">
        <Icon size={26} />
      </span>
      <span className="text-[11px] font-bold tracking-[0.14em] text-accent">
        {code} · {kicker}
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-2 flex items-center gap-3">
        {retry && (
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            className="font-bold"
          >
            <RotateCw size={15} /> Retry
          </Button>
        )}
        <Button to="/dashboard" className="bg-accent-70 font-bold hover:bg-accent-90">
          <ArrowLeft size={16} /> Back to dashboard
        </Button>
      </div>
    </div>
  );
}
