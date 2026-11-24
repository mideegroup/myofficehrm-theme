import { CalendarDays, ShieldCheck, Users, Wallet, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface AppNotification {
  icon: LucideIcon;
  text: string;
  time: string;
  unread?: boolean;
}

export const DEMO_NOTIFICATIONS: AppNotification[] = [
  { icon: Wallet, text: "Payroll review is due in 2 days.", time: "1h ago", unread: true },
  { icon: CalendarDays, text: "3 leave requests need your review.", time: "3h ago", unread: true },
  { icon: ShieldCheck, text: "Two-factor authentication was enabled for the workspace.", time: "Yesterday" },
  { icon: Users, text: "Isabella Chen accepted the invitation and joined.", time: "2d ago" },
];

/** Notification list — shared by the header bell dropdown and the prototype
 *  gallery so both surfaces show identical structure. */
export function NotificationList({ notifications = DEMO_NOTIFICATIONS }: { notifications?: AppNotification[] }) {
  return (
    <div className="grid">
      {notifications.map((n) => (
        <div key={n.text} className="flex items-start gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-muted">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-10 text-accent">
            <n.icon size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] leading-snug">{n.text}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
          </div>
          {n.unread && <i className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
        </div>
      ))}
      <Link
        to="/prototype/notifications"
        className="mt-1 border-t border-border px-2.5 pt-2.5 text-center text-xs font-semibold text-accent hover:underline"
      >
        View all notifications
      </Link>
    </div>
  );
}
