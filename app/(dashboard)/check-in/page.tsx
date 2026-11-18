"use client";

import { Check, Clock, Persons, QrCode } from "@gravity-ui/icons";
import { Button, Card, Chip, Input } from "@heroui/react";
import { useMemo, useState } from "react";

import { AppSelect } from "@/components/app-select";
import { ItemCard } from "@/components/item-card";
import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { attendees, events, gateSeries } from "@/lib/fame-ka-game-data";

export default function CheckInPage() {
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [scanCode, setScanCode] = useState("FKG-1002");
  const [checkedCodes, setCheckedCodes] = useState(
    attendees.filter((attendee) => attendee.checkedIn).map((attendee) => attendee.ticketCode),
  );
  const [scanResult, setScanResult] = useState<{
    message: string;
    tone: "success" | "warning" | "danger";
  } | null>(null);

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? events[0];
  const selectedAttendees = useMemo(
    () => attendees.filter((attendee) => attendee.eventId === selectedEventId),
    [selectedEventId],
  );
  const selectedChecked = selectedAttendees.filter((attendee) =>
    checkedCodes.includes(attendee.ticketCode),
  );

  const runCheckIn = () => {
    const normalized = scanCode.trim().toUpperCase();
    const attendee = attendees.find((item) => item.ticketCode === normalized);

    if (!attendee) {
      setScanResult({ message: "Ticket code not found", tone: "danger" });
      return;
    }

    if (checkedCodes.includes(attendee.ticketCode)) {
      setScanResult({ message: `${attendee.name} is already checked in`, tone: "warning" });
      return;
    }

    setCheckedCodes((current) => [attendee.ticketCode, ...current]);
    setScanResult({ message: `${attendee.name} checked in at ${attendee.gate}`, tone: "success" });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <AppSelect
            ariaLabel="Select event"
            className="w-full sm:w-72"
            onChange={setSelectedEventId}
            options={events.map((event) => ({
              label: event.name,
              value: event.id,
            }))}
            value={selectedEventId}
          />
        }
        eyebrow="Gate operations"
        title="QR scan and manual check-in"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Card>
          <Card.Header>
            <Card.Title>Ticket scanner</Card.Title>
            <Card.Description>{selectedEvent.name}</Card.Description>
          </Card.Header>
          <Card.Content className="gap-4">
            <div className="grid aspect-square place-items-center rounded-3xl bg-default">
              <div className="grid size-48 place-items-center rounded-3xl bg-surface">
                <QrCode className="size-24 text-muted" />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                aria-label="Ticket code"
                fullWidth
                onChange={(event) => setScanCode(event.target.value.toUpperCase())}
                placeholder="FKG-1002"
                value={scanCode}
                variant="secondary"
              />
              <Button onPress={runCheckIn} variant="primary">
                <Check className="size-4" />
                Check
              </Button>
            </div>
            {scanResult && (
              <Chip
                color={
                  scanResult.tone === "success"
                    ? "success"
                    : scanResult.tone === "warning"
                      ? "warning"
                      : "danger"
                }
                variant="soft"
              >
                {scanResult.message}
              </Chip>
            )}
          </Card.Content>
        </Card>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              helper="Selected event"
              icon={Persons}
              label="Expected"
              value={String(selectedAttendees.length)}
            />
            <MetricCard
              helper="Arrived attendees"
              icon={Check}
              label="Checked in"
              value={String(selectedChecked.length)}
            />
            <MetricCard
              helper="Remaining queue"
              icon={Clock}
              label="Pending"
              value={String(selectedAttendees.length - selectedChecked.length)}
            />
          </div>

          <Card>
            <Card.Header>
              <Card.Title>Gate load</Card.Title>
              <Card.Description>Current scan distribution</Card.Description>
            </Card.Header>
            <Card.Content className="gap-0">
              {gateSeries.map((gate) => (
                <ItemCard key={gate.gate} variant="secondary">
                  <ItemCard.Icon>
                    <QrCode className="size-5" />
                  </ItemCard.Icon>
                  <ItemCard.Content>
                    <ItemCard.Title>{gate.gate}</ItemCard.Title>
                    <ItemCard.Description>{gate.value}% of current traffic</ItemCard.Description>
                  </ItemCard.Content>
                  <ItemCard.Action>
                    <Chip size="sm" variant="soft">
                      {gate.value}%
                    </Chip>
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
