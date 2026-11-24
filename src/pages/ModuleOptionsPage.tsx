import { FileText } from "lucide-react";
import { PageIntro } from "../components/app/PageIntro";
import { SettingsCard } from "../components/app/SettingsCard";
import { EmptyState } from "../components/app/EmptyState";

/** Module sub-page backed by real settings options (moved out of the old
 *  monolithic Settings page). */
export function ModuleOptionsPage({
  eyebrow,
  title,
  description,
  optionKeys,
}: {
  eyebrow: string;
  title: string;
  description: string;
  optionKeys: string[];
}) {
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title} description={description} />
      <SettingsCard title={title} description={description} optionKeys={optionKeys} />
    </>
  );
}

/** Placeholder for module sub-pages whose screens haven't been built yet. */
export function ModulePlaceholder({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title} />
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <EmptyState icon={FileText} title={title} description="This screen isn't part of the demo yet." />
      </div>
    </>
  );
}
