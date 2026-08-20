import type { ReactNode } from "react";

export function SectionHeader({
  action,
  eyebrow,
  title,
}: {
  action?: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-muted">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">{title}</h1>
      </div>
      {action}
    </div>
  );
}
