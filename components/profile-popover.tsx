"use client";

import { ArrowRightFromSquare, Gear, Person } from "@gravity-ui/icons";
import { Avatar, Popover, Separator, buttonVariants } from "@heroui/react";
import Link from "next/link";

export function ProfilePopover() {
  return (
    <Popover>
      <Popover.Trigger
        aria-label="Open account menu"
        className="inline-flex size-10 items-center justify-center rounded-full border border-default bg-surface text-sm font-semibold leading-none text-foreground transition hover:bg-default"
      >
        OP
      </Popover.Trigger>
      <Popover.Content placement="bottom end">
        <Popover.Dialog className="w-[280px] max-w-[calc(100vw-2rem)] bg-surface rounded-3xl text-foreground">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <Avatar.Fallback>OP</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">Omi Pradana</p>
                <p className="truncate text-xs text-muted">omi@tixora.co</p>
              </div>
            </div>

            <div className="rounded-xl bg-default p-3">
              <p className="text-xs text-muted">Workspace</p>
              <p className="mt-1 text-sm font-medium text-foreground">Tixora Events Co.</p>
            </div>

            <Separator />

            <div className="space-y-1">
              <Link
                className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-foreground hover:bg-default"
                href="/profile"
              >
                <Person className="size-4" strokeWidth={1.5} />
                Profile
              </Link>
              <Link
                className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-foreground hover:bg-default"
                href="/settings"
              >
                <Gear className="size-4" strokeWidth={1.5} />
                Account settings
              </Link>
            </div>

            <Link
              className={buttonVariants({ fullWidth: true, size: "sm", variant: "outline" })}
              href="/auth"
            >
              <ArrowRightFromSquare className="size-4" strokeWidth={1.5} />
              Sign out
            </Link>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
