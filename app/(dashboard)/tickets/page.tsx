"use client";

import { Plus, Receipt, Xmark } from "@gravity-ui/icons";
import { Button, Card, Input, Table } from "@heroui/react";
import type { FormEvent } from "react";
import { useState } from "react";

import { AppSelect } from "@/components/app-select";
import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { StatusChip } from "@/components/status-chip";
import {
  eventName,
  events,
  formatCurrency,
  formatNumber,
  percent,
  tickets as ticketData,
  type TicketData,
  type TicketStatus,
} from "@/lib/tixora-data";

const ticketStatusOptions: TicketStatus[] = ["Active", "Paused", "Sold out"];

export default function TicketsPage() {
  const [tickets, setTickets] = useState(ticketData);
  const [isAddingTicket, setIsAddingTicket] = useState(false);

  const toggleTicket = (ticketId: string) => {
    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== ticketId || ticket.status === "Sold out") {
          return ticket;
        }

        return { ...ticket, status: ticket.status === "Active" ? "Paused" : "Active" };
      }),
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button onPress={() => setIsAddingTicket(true)} size="sm" variant="primary">
            <Plus className="size-4" strokeWidth={1.5} />
            Add ticket type
          </Button>
        }
        eyebrow="Ticket builder"
        title="Pricing, quota, and availability"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          helper="Across all ticket types"
          icon={Receipt}
          label="Ticket revenue"
          value={formatCurrency(tickets.reduce((sum, ticket) => sum + ticket.revenue, 0))}
        />
        <MetricCard helper="Active records" icon={Receipt} label="Ticket types" value={String(tickets.length)} />
        <MetricCard
          helper="Across all events"
          icon={Receipt}
          label="Total quota"
          value={formatNumber(events.reduce((sum, event) => sum + event.capacity, 0))}
        />
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Ticket types" className="min-w-[860px]">
            <Table.Header>
              <Table.Column isRowHeader>Ticket</Table.Column>
              <Table.Column>Event</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Quota</Table.Column>
              <Table.Column>Revenue</Table.Column>
              <Table.Column>Window</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {tickets.map((ticket) => (
                <Table.Row id={ticket.id} key={ticket.id}>
                  <Table.Cell>
                    <div className="font-medium text-foreground">{ticket.name}</div>
                    <div className="text-xs text-muted">{ticket.id}</div>
                  </Table.Cell>
                  <Table.Cell>{eventName(ticket.eventId)}</Table.Cell>
                  <Table.Cell>{formatCurrency(ticket.price)}</Table.Cell>
                  <Table.Cell>
                    <div className="min-w-36 space-y-1">
                      <div className="flex justify-between text-xs text-muted">
                        <span>{formatNumber(ticket.sold)}</span>
                        <span>{formatNumber(ticket.quota)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-default">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${percent(ticket.sold, ticket.quota)}%` }}
                        />
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{formatCurrency(ticket.revenue)}</Table.Cell>
                  <Table.Cell>{ticket.window}</Table.Cell>
                  <Table.Cell>
                    <StatusChip status={ticket.status} />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      isDisabled={ticket.status === "Sold out"}
                      onPress={() => toggleTicket(ticket.id)}
                      size="sm"
                      variant="outline"
                    >
                      {ticket.status === "Active" ? "Pause" : "Activate"}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {isAddingTicket && (
        <AddTicketDialog
          onClose={() => setIsAddingTicket(false)}
          onCreate={(ticket) => {
            setTickets((current) => [ticket, ...current]);
            setIsAddingTicket(false);
          }}
        />
      )}
    </div>
  );
}

function AddTicketDialog({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (ticket: TicketData) => void;
}) {
  const [form, setForm] = useState({
    eventId: events[0]?.id ?? "",
    name: "",
    price: "79",
    quota: "500",
    status: "Active" as TicketStatus,
    window: "Now - June 30",
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number(form.price) || 0;

    onCreate({
      eventId: form.eventId,
      id: `tk-${Date.now().toString().slice(-4)}`,
      name: form.name.trim(),
      price,
      quota: Number(form.quota) || 0,
      revenue: 0,
      sold: 0,
      status: form.status,
      window: form.window.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-backdrop px-4">
      <Card className="w-full max-w-lg bg-surface" role="dialog">
        <form onSubmit={submit}>
          <Card.Header className="flex-row items-start justify-between">
            <div>
              <Card.Title>Add ticket type</Card.Title>
              <Card.Description>Create a frontend-only ticket tier for an event.</Card.Description>
            </div>
            <Button isIconOnly onPress={onClose} size="sm" type="button" variant="ghost">
              <Xmark className="size-4" strokeWidth={1.5} />
            </Button>
          </Card.Header>
          <Card.Content className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="text-muted">Ticket name</span>
              <Input
                aria-label="Ticket name"
                fullWidth
                required
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, name: inputEvent.target.value }))
                }
                placeholder="VIP Balcony"
                value={form.name}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Event</span>
              <AppSelect
                ariaLabel="Ticket event"
                fullWidth
                onChange={(value) => setForm((current) => ({ ...current, eventId: value }))}
                options={events.map((event) => ({ label: event.name, value: event.id }))}
                value={form.eventId}
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Status</span>
              <AppSelect
                ariaLabel="Ticket status"
                fullWidth
                onChange={(value) =>
                  setForm((current) => ({ ...current, status: value as TicketStatus }))
                }
                options={ticketStatusOptions.map((status) => ({ label: status, value: status }))}
                value={form.status}
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Price</span>
              <Input
                aria-label="Ticket price"
                fullWidth
                required
                min={0}
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, price: inputEvent.target.value }))
                }
                type="number"
                value={form.price}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Quota</span>
              <Input
                aria-label="Ticket quota"
                fullWidth
                required
                min={1}
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, quota: inputEvent.target.value }))
                }
                type="number"
                value={form.quota}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="text-muted">Sales window</span>
              <Input
                aria-label="Sales window"
                fullWidth
                required
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, window: inputEvent.target.value }))
                }
                placeholder="Now - June 30"
                value={form.window}
                variant="secondary"
              />
            </label>
          </Card.Content>
          <Card.Footer className="justify-end gap-2">
            <Button onPress={onClose} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add ticket
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}
