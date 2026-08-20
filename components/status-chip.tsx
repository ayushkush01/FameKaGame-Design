import { Chip } from "@heroui/react";

import type {
  EventStatus,
  OrderStatus,
  PayoutStatus,
  PromoStatus,
  TicketStatus,
} from "@/lib/tixora-data";

type Status = EventStatus | OrderStatus | TicketStatus | PayoutStatus | PromoStatus;
type ChipColor = "accent" | "success" | "warning" | "danger" | "default";

const statusColor: Record<Status, ChipColor> = {
  Active: "success",
  Completed: "default",
  Draft: "default",
  Expired: "default",
  Failed: "danger",
  Paid: "success",
  Paused: "warning",
  Pending: "warning",
  Published: "success",
  Refunded: "default",
  Scheduled: "warning",
  "Sold out": "danger",
};

export function StatusChip({ status }: { status: Status }) {
  if (status === "Completed") {
    return (
      <Chip
        className="bg-blue-500/15 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300"
        color="default"
        size="sm"
        variant="soft"
      >
        {status}
      </Chip>
    );
  }

  return (
    <Chip color={statusColor[status]} size="sm" variant="soft">
      {status}
    </Chip>
  );
}
