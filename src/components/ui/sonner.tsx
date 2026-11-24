import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      richColors
      toastOptions={{
        style: {
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
        },
      }}
    />
  );
}

export { toast } from "sonner";
