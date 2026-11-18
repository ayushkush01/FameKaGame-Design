"use client";

import { ChartColumn, ChartLine, Receipt } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import { useMemo, useState } from "react";

import { AppSelect } from "@/components/app-select";
import { ItemCard } from "@/components/item-card";
import { SectionHeader } from "@/components/section-header";
import {
  eventName,
  events,
  formatCurrency,
  formatNumber,
  percent,
  tickets,
  type EventStatus,
  type TicketStatus,
} from "@/lib/fame-ka-game-data";

const eventStatusOptions: Array<EventStatus | "All"> = [
  "All",
  "Published",
  "Scheduled",
  "Draft",
  "Completed",
];
const ticketStatusOptions: Array<TicketStatus | "All"> = ["All", "Active", "Paused", "Sold out"];

export default function ReportsPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [eventStatusFilter, setEventStatusFilter] = useState<EventStatus | "All">("All");
  const [ticketStatusFilter, setTicketStatusFilter] = useState<TicketStatus | "All">("All");

  const categoryOptions = useMemo(
    () => [
      { label: "All categories", value: "All" },
      ...Array.from(new Set(events.map((event) => event.category))).map((category) => ({
        label: category,
        value: category,
      })),
    ],
    [],
  );

  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
        const matchesStatus = eventStatusFilter === "All" || event.status === eventStatusFilter;

        return matchesCategory && matchesStatus;
      }),
    [categoryFilter, eventStatusFilter],
  );

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) => {
        const event = events.find((item) => item.id === ticket.eventId);
        const matchesCategory =
          categoryFilter === "All" || event?.category === categoryFilter;
        const matchesStatus =
          ticketStatusFilter === "All" || ticket.status === ticketStatusFilter;
        const matchesEventStatus =
          eventStatusFilter === "All" || event?.status === eventStatusFilter;

        return matchesCategory && matchesStatus && matchesEventStatus;
      }),
    [categoryFilter, eventStatusFilter, ticketStatusFilter],
  );

  const filteredRevenue = filteredEvents.reduce((sum, event) => sum + event.revenue, 0);
  const filteredSold = filteredTickets.reduce((sum, ticket) => sum + ticket.sold, 0);
  const activeFilterCount = [
    categoryFilter !== "All",
    eventStatusFilter !== "All",
    ticketStatusFilter !== "All",
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <div className="flex gap-2">
            <Button size="sm" variant="tertiary">
              PDF
            </Button>
            <Button size="sm" variant="outline">
              CSV
            </Button>
          </div>
        }
        eyebrow="Analytics"
        title="Sales and attendee performance"
      />

      <div className="grid gap-3 lg:grid-cols-[220px_180px_180px_auto]">
        <AppSelect
          ariaLabel="Filter report by category"
          fullWidth
          onChange={setCategoryFilter}
          options={categoryOptions}
          value={categoryFilter}
        />
        <AppSelect
          ariaLabel="Filter report by event status"
          fullWidth
          onChange={(value) => setEventStatusFilter(value as EventStatus | "All")}
          options={eventStatusOptions.map((status) => ({ label: status, value: status }))}
          value={eventStatusFilter}
        />
        <AppSelect
          ariaLabel="Filter report by ticket status"
          fullWidth
          onChange={(value) => setTicketStatusFilter(value as TicketStatus | "All")}
          options={ticketStatusOptions.map((status) => ({ label: status, value: status }))}
          value={ticketStatusFilter}
        />
        <Button
          isDisabled={activeFilterCount === 0}
          onPress={() => {
            setCategoryFilter("All");
            setEventStatusFilter("All");
            setTicketStatusFilter("All");
          }}
          variant="outline"
        >
          Reset
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Card.Content>
            <span className="text-sm text-muted">Filtered revenue</span>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {formatCurrency(filteredRevenue)}
            </p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <span className="text-sm text-muted">Ticket sales</span>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {formatNumber(filteredSold)}
            </p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <span className="text-sm text-muted">Events in report</span>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {filteredEvents.length}
            </p>
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <Card>
          <Card.Header>
            <Card.Title>Revenue by event</Card.Title>
            <Card.Description>Gross sales versus capacity</Card.Description>
          </Card.Header>
          <Card.Content className="gap-4">
            {filteredEvents.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-sm text-muted">
                No events match the selected filters.
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div className="space-y-3 rounded-2xl bg-surface-secondary p-4" key={event.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{event.name}</p>
                      <p className="text-sm text-muted">
                        {event.category} / {event.status}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">{formatCurrency(event.revenue)}</p>
                  </div>
                  <div className="h-2 rounded-full bg-default">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${percent(event.sold, event.capacity)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </Card.Content>
        </Card>

        <div className="space-y-4">
          <Card>
            <Card.Header>
              <Card.Title>Ticket mix</Card.Title>
              <Card.Description>Sales concentration by pass type</Card.Description>
            </Card.Header>
            <Card.Content className="gap-0">
              {filteredTickets.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm text-muted">
                  No ticket types match the selected filters.
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <ItemCard key={ticket.id} variant="secondary">
                    <ItemCard.Icon>
                      <Receipt className="size-5" />
                    </ItemCard.Icon>
                    <ItemCard.Content>
                      <ItemCard.Title>{ticket.name}</ItemCard.Title>
                      <ItemCard.Description>{eventName(ticket.eventId)}</ItemCard.Description>
                    </ItemCard.Content>
                    <ItemCard.Action>
                      <span className="text-sm font-medium text-foreground">{formatNumber(ticket.sold)}</span>
                    </ItemCard.Action>
                  </ItemCard>
                ))
              )}
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Operational health</Card.Title>
            </Card.Header>
            <Card.Content className="grid grid-cols-2 gap-3">
              {[
                ["Conversion", "7.8%", ChartLine],
                ["Refunds", "2.4%", ChartColumn],
                ["Email opens", "64%", ChartLine],
                ["Gate speed", "18/min", ChartColumn],
              ].map(([label, value, Icon]) => (
                <ItemCard key={label as string} variant="secondary">
                  <ItemCard.Icon>
                    <Icon className="size-5" />
                  </ItemCard.Icon>
                  <ItemCard.Content>
                    <ItemCard.Title>{value as string}</ItemCard.Title>
                    <ItemCard.Description>{label as string}</ItemCard.Description>
                  </ItemCard.Content>
                </ItemCard>
              ))}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
