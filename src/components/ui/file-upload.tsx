import { useRef, useState, type DragEvent, type ReactNode } from "react";
import { FileText, FileImage, FileSpreadsheet, File as FileIcon, UploadCloud, X } from "lucide-react";
import { toast } from "./sonner";
import { cn } from "../../lib/utils";

function iconFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return FileImage;
  if (["csv", "xls", "xlsx"].includes(ext)) return FileSpreadsheet;
  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) return FileText;
  return FileIcon;
}

const fmtSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/** File upload — click-to-browse or drag-and-drop dropzone + file list with
 *  remove. Controlled via `files`/`onFilesChange`; `accept` and `maxSizeMB`
 *  gate what lands (rejections report via toast). */
export function FileUpload({
  files,
  onFilesChange,
  accept,
  maxSizeMB,
  multiple = true,
  hint,
}: {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  hint?: ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const add = (incoming: FileList | File[]) => {
    const next = [...files];
    for (const f of Array.from(incoming)) {
      if (maxSizeMB && f.size > maxSizeMB * 1024 * 1024) {
        toast.error(`${f.name} is too large`, { description: `Maximum size is ${maxSizeMB} MB.` });
        continue;
      }
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
      next.push(f);
      if (!multiple) break;
    }
    onFilesChange(multiple ? next : next.slice(-1));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    add(e.dataTransfer.files);
  };

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          dragging ? "border-accent bg-accent-10" : "border-border bg-muted/40 hover:border-accent-30 hover:bg-muted/70",
        )}
      >
        <span className={cn("grid size-10 place-items-center rounded-xl", dragging ? "bg-accent text-primary-foreground" : "bg-accent-10 text-accent")}>
          <UploadCloud size={20} />
        </span>
        <b className="text-sm font-semibold">
          {dragging ? "Drop to upload" : "Drag files here, or browse"}
        </b>
        <span className="text-xs text-muted-foreground">
          {hint ?? `${accept ? `${accept} · ` : ""}${maxSizeMB ? `Up to ${maxSizeMB} MB` : "Any size"}${multiple ? " · multiple files" : ""}`}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => { if (e.target.files) add(e.target.files); e.target.value = ""; }}
      />

      {files.map((f) => {
        const Icon = iconFor(f.name);
        return (
          <div key={`${f.name}-${f.size}`} className="flex items-center gap-3 rounded-lg border border-border px-3.5 py-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Icon size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">{f.name}</p>
              <p className="text-xs text-muted-foreground">{fmtSize(f.size)}</p>
            </div>
            <button
              type="button"
              aria-label={`Remove ${f.name}`}
              onClick={() => onFilesChange(files.filter((x) => x !== f))}
              className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
