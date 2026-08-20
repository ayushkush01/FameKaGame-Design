"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";

import {
  Bars,
  Calendar,
  ChartLine,
  CircleDollar,
  CreditCard,
  Gear,
  Headphones,
  House,
  Moon,
  Persons,
  QrCode,
  Receipt,
  Sun,
  Tag,
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NotificationsPopover } from "@/components/notifications-popover";
import { ProfilePopover } from "@/components/profile-popover";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type NavigationItem = { href: string; icon: Icon; label: string };

const navigationGroups: Array<{ items: NavigationItem[]; label: string }> = [
  {
    label: "Overview",
    items: [{ href: "/dashboard", icon: House, label: "Dashboard" }],
  },
  {
    label: "Event setup",
    items: [
      { href: "/events", icon: Calendar, label: "Events" },
      { href: "/tickets", icon: Receipt, label: "Tickets" },
      { href: "/promos", icon: Tag, label: "Promo Codes" },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/orders", icon: CreditCard, label: "Orders" },
      { href: "/attendees", icon: Persons, label: "Attendees" },
      { href: "/check-in", icon: QrCode, label: "Check-in" },
    ],
  },
  {
    label: "Finance",
    items: [{ href: "/payouts", icon: CircleDollar, label: "Payouts" }],
  },
  {
    label: "Workspace",
    items: [
      { href: "/reports", icon: ChartLine, label: "Reports" },
      { href: "/settings", icon: Gear, label: "Settings" },
    ],
  },
];

const navigation = navigationGroups.flatMap((group) => group.items);

const pageTitles: Record<string, string> = {
  "/notifications": "Notifications",
  "/profile": "Profile",
};

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoSrc = isDark ? "/logo-bg-dark.svg" : "/logo-bg-light.svg";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    return () => document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-border bg-surface lg:block">
          <SidebarContent logoSrc={logoSrc} pathname={pathname} />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-backdrop lg:hidden" onClick={() => setMobileOpen(false)}>
            <aside
              className="h-full w-[280px] bg-surface"
              onClick={(event) => event.stopPropagation()}
            >
              <SidebarContent logoSrc={logoSrc} pathname={pathname} />
            </aside>
          </div>
        )}

        <section className="min-w-0">
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  className="lg:hidden"
                  isIconOnly
                  onPress={() => setMobileOpen(true)}
                  size="sm"
                  variant="outline"
                >
                  <Bars className="size-4" />
                </Button>
                <div className="min-w-0">
                  <p className="text-sm text-muted">Tixora Workspace</p>
                  <h1 className="truncate text-lg font-semibold text-foreground">
                    {navigation.find((item) => item.href === pathname)?.label ??
                      pageTitles[pathname] ??
                      "Dashboard"}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <NotificationsPopover />
                <ProfilePopover />
                <Button
                  isIconOnly
                  onPress={() => setIsDark((current) => !current)}
                  size="sm"
                  variant="outline"
                >
                  {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 md:px-6 lg:px-8">{children}</main>
        </section>
      </div>
    </div>
  );
}

function SidebarContent({ logoSrc, pathname }: { logoSrc: string; pathname: string }) {
  return (
    <div className="sticky top-0 flex h-svh flex-col p-4">
      <Link className="flex items-center rounded-2xl px-2 py-2" href="/dashboard">
        <Image alt="Tixora" className="h-10 w-auto" height={40} priority src={logoSrc} width={130} />
      </Link>

      <nav className="mt-6 flex-1 space-y-5 overflow-y-auto pr-1">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wide text-muted">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition ${active ? "bg-default font-medium text-foreground" : "text-muted hover:bg-default"
                      }`}
                    href={item.href}
                    key={item.href}
                  >
                    <Icon className="size-4 shrink-0" strokeWidth={1.5} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-4 space-y-3">
        <div className="rounded-3xl bg-accent p-4 text-center text-accent-foreground">
          <span className="mx-auto -mt-8 mb-3 flex size-12 items-center justify-center rounded-full border-4 border-surface bg-accent">
            <Headphones className="size-5" strokeWidth={1.5} />
          </span>
          <p className="font-semibold">Help & Center</p>
          <p className="mt-2 text-xs opacity-75">
            Having difficulty in ticketing? Contact support for help.
          </p>
          <Link
            className="mt-4 block rounded-2xl bg-accent-foreground px-3 py-2 text-sm font-semibold text-accent"
            href="mailto:support@tixora.co"
          >
            Go to help center
          </Link>
        </div>
      </div>
    </div>
  );
}
