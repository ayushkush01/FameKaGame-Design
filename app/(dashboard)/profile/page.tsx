import { Bell, CreditCard, Gear, Person, ShieldCheck } from "@gravity-ui/icons";
import { Avatar, Button, Card, Chip } from "@heroui/react";

import { SectionHeader } from "@/components/section-header";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button size="sm" variant="outline">
            Edit profile
          </Button>
        }
        eyebrow="Account"
        title="Profile and workspace access"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card>
          <Card.Content className="items-center text-center">
            <Avatar className="size-20">
              <Avatar.Fallback>OP</Avatar.Fallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold text-foreground">Omi Pradana</h2>
            <p className="text-sm text-muted">omi@tixora.co</p>
            <Chip className="mt-4" color="accent" size="sm" variant="soft">
              Template owner
            </Chip>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Account information</Card.Title>
            <Card.Description>Static profile details for the UI template.</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="divide-y divide-default">
              {[
                ["Workspace", "Tixora Events Co.", Person],
                ["Role", "Owner / Admin", ShieldCheck],
                ["Billing", "Pro plan preview", CreditCard],
                ["Notifications", "Email and in-app alerts enabled", Bell],
              ].map(([label, value, Icon]) => (
                <div className="flex items-center justify-between gap-4 py-4" key={label as string}>
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-default text-muted">
                      <Icon className="size-4" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">{label as string}</span>
                      <span className="block truncate text-sm text-muted">{value as string}</span>
                    </span>
                  </div>
                  <Gear className="size-4 shrink-0 text-muted" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Card.Header>
            <Card.Title>Security</Card.Title>
            <Card.Description>Password updated 14 days ago</Card.Description>
          </Card.Header>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Session</Card.Title>
            <Card.Description>Signed in from Safari on macOS</Card.Description>
          </Card.Header>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Support</Card.Title>
            <Card.Description>support@tixora.co</Card.Description>
          </Card.Header>
        </Card>
      </div>
    </div>
  );
}
