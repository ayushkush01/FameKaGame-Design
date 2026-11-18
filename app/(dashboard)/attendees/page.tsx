"use client";

import { Check, Magnifier, Persons, QrCode } from "@gravity-ui/icons";
import { Avatar, Button, Chip, Input, Table } from "@heroui/react";
import { useMemo, useState } from "react";

import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { attendees, eventName, gateSeries } from "@/lib/fame-ka-game-data";

export default function AttendeesPage() {
  const [query, setQuery] = useState("");

  const filteredAttendees = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return attendees.filter(
      (attendee) =>
        attendee.name.toLowerCase().includes(normalized) ||
        attendee.email.toLowerCase().includes(normalized) ||
        attendee.ticketCode.toLowerCase().includes(normalized) ||
        eventName(attendee.eventId).toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button size="sm" variant="outline">
            Export list
          </Button>
        }
        eyebrow="Buyer CRM"
        title="Attendees, ticket owners, and groups"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          helper="Ticket owners on record"
          icon={Persons}
          label="Total attendees"
          value={String(attendees.length)}
        />
        <MetricCard
          helper="Currently arrived"
          icon={Check}
          label="Checked in"
          value={String(attendees.filter((attendee) => attendee.checkedIn).length)}
        />
        <MetricCard
          helper="Manual and QR flow"
          icon={QrCode}
          label="Open gates"
          value={String(gateSeries.length)}
        />
      </div>

      <div className="relative">
        <Magnifier className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <Input
          aria-label="Search attendees"
          className="pl-9"
          fullWidth
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search attendee, email, ticket code, or event"
          value={query}
          variant="secondary"
        />
      </div>

      <Table className="min-h-[260px]">
        <Table.ScrollContainer>
          <Table.Content aria-label="Attendees" className="min-w-[840px]">
            <Table.Header>
              <Table.Column isRowHeader>Attendee</Table.Column>
              <Table.Column>Event</Table.Column>
              <Table.Column>Ticket</Table.Column>
              <Table.Column>Code</Table.Column>
              <Table.Column>Group</Table.Column>
              <Table.Column>Gate</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <div className="flex h-40 items-center justify-center text-sm text-muted">
                  No attendees found.
                </div>
              )}
            >
              {filteredAttendees.map((attendee) => (
                <Table.Row id={attendee.id} key={attendee.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Fallback>
                          {attendee.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{attendee.name}</div>
                        <div className="text-xs text-muted">{attendee.email}</div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{eventName(attendee.eventId)}</Table.Cell>
                  <Table.Cell>{attendee.ticket}</Table.Cell>
                  <Table.Cell>{attendee.ticketCode}</Table.Cell>
                  <Table.Cell>{attendee.group}</Table.Cell>
                  <Table.Cell>{attendee.gate}</Table.Cell>
                  <Table.Cell>
                    <Chip color={attendee.checkedIn ? "success" : "warning"} size="sm" variant="soft">
                      {attendee.checkedIn ? "Checked in" : "Not arrived"}
                    </Chip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
