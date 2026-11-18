"use client";

import { Bell } from "@gravity-ui/icons";
import { Button, Popover, Separator, buttonVariants } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { notifications } from "@/lib/fame-ka-game-data";

export function NotificationsPopover() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState(
    notifications.filter((notification) => !notification.unread).map((notification) => notification.id),
  );
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !readIds.includes(notification.id)).length,
    [readIds],
  );

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger
        aria-label="Open notifications"
        className={`${buttonVariants({ isIconOnly: true, size: "sm", variant: "outline" })} relative inline-flex items-center justify-center`}
      >
        <Bell className="size-4" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger" />
        )}
      </Popover.Trigger>
      <Popover.Content placement="bottom end" className="rounded-4xl">
        <Popover.Dialog className="w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl bg-surface text-foreground">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Popover.Heading>Notifications</Popover.Heading>
                <p className="text-sm text-muted">{unreadCount} unread updates</p>
              </div>
              <button
                className="mt-1 text-sm font-medium text-accent disabled:cursor-not-allowed disabled:text-muted"
                disabled={unreadCount === 0}
                onClick={() => setReadIds(notifications.map((notification) => notification.id))}
                type="button"
              >
                Mark as read
              </button>
            </div>

            <div className="divide-y divide-default">
              {notifications.map((notification) => {
                const unread = !readIds.includes(notification.id);

                return (
                  <div className="py-3" key={notification.id}>
                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <p
                        className={`truncate text-sm text-foreground ${
                          unread ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {notification.title}
                      </p>
                      {unread && <span className="size-2 shrink-0 rounded-full bg-danger" />}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-muted">{notification.body}</p>
                      <span className="mt-1 block text-xs text-muted">{notification.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />
            <div className="flex justify-end">
              <Button
                onPress={() => {
                  setIsOpen(false);
                  router.push("/notifications");
                }}
                size="sm"
                variant="primary"
              >
                View all
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
