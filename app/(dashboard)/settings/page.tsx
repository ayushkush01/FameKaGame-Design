"use client";

import { Bell, CreditCard, Gear, PersonGear } from "@gravity-ui/icons";
import { Button, Card, Chip, Input, Switch } from "@heroui/react";
import { useState } from "react";

import { AppSelect } from "@/components/app-select";
import { ItemCard } from "@/components/item-card";
import { SectionHeader } from "@/components/section-header";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("USD");
  const [settings, setSettings] = useState({
    autoRefundReview: false,
    emailReceipts: true,
    payoutAlerts: true,
  });

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Workspace" title="Organization, team, and preferences" />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Card>
          <Card.Header>
            <Card.Title>Organization profile</Card.Title>
            <Card.Description>Frontend-only editable fields</Card.Description>
          </Card.Header>
          <Card.Content className="gap-4">
            <label className="block space-y-2 text-sm">
              <span className="text-muted">Organization name</span>
              <Input aria-label="Organization name" defaultValue="Tixora Events Co." fullWidth variant="secondary" />
            </label>
            <label className="block space-y-2 text-sm">
              <span className="text-muted">Support email</span>
              <Input aria-label="Support email" defaultValue="support@tixora.co" fullWidth variant="secondary" />
            </label>
            <label className="block space-y-2 text-sm">
              <span className="text-muted">Default currency</span>
              <AppSelect
                ariaLabel="Default currency"
                fullWidth
                onChange={setCurrency}
                options={["USD", "IDR", "SGD"].map((item) => ({ label: item, value: item }))}
                value={currency}
              />
            </label>
          </Card.Content>
          <Card.Footer>
            <Button variant="primary">Save changes</Button>
          </Card.Footer>
        </Card>

        <div className="space-y-4">
          <Card>
            <Card.Header>
              <Card.Title>Team access</Card.Title>
              <Card.Description>Role examples for the UI kit</Card.Description>
            </Card.Header>
            <Card.Content className="gap-0">
              {[
                ["Omi Pradana", "Owner", "Full access"],
                ["Maya Chen", "Event Manager", "Events and orders"],
                ["Rafael Stone", "Gate Staff", "Check-in only"],
              ].map(([name, role, access]) => (
                <ItemCard key={name} variant="secondary">
                  <ItemCard.Icon>
                    <PersonGear className="size-5" />
                  </ItemCard.Icon>
                  <ItemCard.Content>
                    <ItemCard.Title>{name}</ItemCard.Title>
                    <ItemCard.Description>{access}</ItemCard.Description>
                  </ItemCard.Content>
                  <ItemCard.Action>
                    <Chip color={role === "Owner" ? "accent" : "default"} size="sm" variant="soft">
                      {role}
                    </Chip>
                  </ItemCard.Action>
                </ItemCard>
              ))}
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Notification rules</Card.Title>
            </Card.Header>
            <Card.Content className="gap-0">
              {[
                ["emailReceipts", "Email receipts", "Send ticket receipt after every paid order", Bell],
                ["payoutAlerts", "Payout alerts", "Notify finance when payouts settle", CreditCard],
                ["autoRefundReview", "Refund review", "Flag refunds above $250 for approval", Gear],
              ].map(([key, label, body, Icon]) => (
                <ItemCard key={key as string} variant="secondary">
                  <ItemCard.Icon>
                    <Icon className="size-5" />
                  </ItemCard.Icon>
                  <ItemCard.Content>
                    <ItemCard.Title>{label as string}</ItemCard.Title>
                    <ItemCard.Description>{body as string}</ItemCard.Description>
                  </ItemCard.Content>
                  <ItemCard.Action>
                    <Switch
                      aria-label={label as string}
                      isSelected={settings[key as keyof typeof settings]}
                      onChange={() =>
                        setSettings((current) => ({
                          ...current,
                          [key as string]: !current[key as keyof typeof settings],
                        }))
                      }
                    >
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch>
                  </ItemCard.Action>
                </ItemCard>
              ))}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
