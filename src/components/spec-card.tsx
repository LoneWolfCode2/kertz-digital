import { cn } from "@/lib/utils";

type SpecCardProps = {
  label: string;
  meta?: string;
  className?: string;
  children: React.ReactNode;
};

export function SpecCard({ label, meta, className, children }: SpecCardProps) {
  return (
    <div className={cn("relative border border-foreground bg-card", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-foreground px-5 py-3">
        <p className="label-mono">{label}</p>
        {meta && <p className="label-mono text-muted-foreground">{meta}</p>}
      </div>

      <div className="p-5 sm:p-6">{children}</div>

      {/* corner registration marks */}
      <span
        aria-hidden
        className="absolute -top-1 -left-1 size-2 bg-foreground"
      />
      <span
        aria-hidden
        className="absolute -top-1 -right-1 size-2 bg-foreground"
      />
      <span
        aria-hidden
        className="absolute -bottom-1 -left-1 size-2 bg-foreground"
      />
      <span
        aria-hidden
        className="absolute -right-1 -bottom-1 size-2 bg-foreground"
      />
    </div>
  );
}
