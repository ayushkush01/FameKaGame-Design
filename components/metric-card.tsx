import type { ComponentType, SVGProps } from "react";

import { Card } from "@heroui/react";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export function MetricCard({
  helper,
  icon: Icon,
  label,
  value,
}: {
  helper: string;
  icon: Icon;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <Card.Content className="gap-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted">{label}</span>
          <span className="flex size-8 items-center justify-center rounded-xl bg-default text-muted">
            <Icon className="size-4" strokeWidth={1.5} />
          </span>
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted">{helper}</p>
        </div>
      </Card.Content>
    </Card>
  );
}
