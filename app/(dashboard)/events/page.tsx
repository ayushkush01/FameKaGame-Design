"use client";

import { Calendar, Check, Pencil, QrCode, Receipt, TrashBin, Xmark } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import type { FormEvent } from "react";
import { useState } from "react";

import { AppSelect } from "@/components/app-select";
import { CreateEventDrawer } from "@/components/create-event-drawer";
import { LinkButton } from "@/components/link-button";
import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { StatusChip } from "@/components/status-chip";
import {
  events as initialEvents,
  formatCurrency,
  formatNumber,
  percent,
  type EventData,
  type EventStatus,
} from "@/lib/fame-ka-game-data";

const categoryOptions = Array.from(new Set(initialEvents.map((event) => event.category))).map(
  (item) => ({
    label: item,
    value: item,
  }),
);

const statusOptions: EventStatus[] = ["Published", "Draft", "Scheduled", "Completed"];
const statusSelectOptions = statusOptions.map((item) => ({ label: item, value: item }));

function toDateInput(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toISOString().slice(0, 10);
}

function formatEventDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<EventData | null>(null);

  const checkedEvents = events.filter((event) => event.checkIn > 0);
  const averageCheckIn = checkedEvents.length
    ? Math.round(checkedEvents.reduce((sum, event) => sum + event.checkIn, 0) / checkedEvents.length)
    : 0;

  const updateEvent = (updatedEvent: EventData) => {
    setEvents((current) =>
      current.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)),
    );
    setEditingEvent(null);
  };

  const deleteEvent = (eventId: string) => {
    setEvents((current) => current.filter((event) => event.id !== eventId));
    setDeletingEvent(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        action={<CreateEventDrawer onCreate={(event) => setEvents((current) => [event, ...current])} />}
        eyebrow="Event manager"
        title="Plan, publish, and review events"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          helper="Published, scheduled, and drafts"
          icon={Calendar}
          label="Total events"
          value={String(events.length)}
        />
        <MetricCard
          helper="Across all live event pages"
          icon={Receipt}
          label="Tickets sold"
          value={formatNumber(events.reduce((sum, event) => sum + event.sold, 0))}
        />
        <MetricCard
          helper="Events with gate activity"
          icon={Check}
          label="Avg check-in"
          value={`${averageCheckIn}%`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <Card.Header>
              <div className="flex w-full items-start justify-between gap-3">
                <div className="min-w-0">
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Description>
                    {event.category} - {event.city}
                  </Card.Description>
                  <p className="mt-1 text-xs text-muted">
                    {event.date} · {event.venue}
                  </p>
                </div>
                <StatusChip status={event.status} />
              </div>
            </Card.Header>
            <Card.Content className="gap-4">
              <p className="text-sm text-muted">{event.description}</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-muted">Revenue</p>
                  <p className="font-medium text-foreground">{formatCurrency(event.revenue)}</p>
                </div>
                <div>
                  <p className="text-muted">Sold</p>
                  <p className="font-medium text-foreground">{formatNumber(event.sold)}</p>
                </div>
                <div>
                  <p className="text-muted">Check-in</p>
                  <p className="font-medium text-foreground">{event.checkIn}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Capacity</span>
                  <span className="text-foreground">{percent(event.sold, event.capacity)}%</span>
                </div>
                <div className="h-2 rounded-full bg-default">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${percent(event.sold, event.capacity)}%` }}
                  />
                </div>
              </div>
            </Card.Content>
            <Card.Footer className="flex-wrap gap-2">
              <LinkButton href="/tickets" size="sm" variant="tertiary">
                <Receipt className="size-4" />
                Tickets
              </LinkButton>
              <LinkButton href="/check-in" size="sm" variant="outline">
                <QrCode className="size-4" />
                Check-in
              </LinkButton>
              <Button onPress={() => setEditingEvent(event)} size="sm" variant="tertiary">
                <Pencil className="size-4" strokeWidth={1.5} />
                Edit
              </Button>
              <Button onPress={() => setDeletingEvent(event)} size="sm" variant="danger-soft">
                <TrashBin className="size-4" strokeWidth={1.5} />
                Delete
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>

      {editingEvent && (
        <EditEventDialog
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={updateEvent}
        />
      )}

      {deletingEvent && (
        <DeleteEventDialog
          event={deletingEvent}
          onCancel={() => setDeletingEvent(null)}
          onDelete={() => deleteEvent(deletingEvent.id)}
        />
      )}
    </div>
  );
}

function EditEventDialog({
  event,
  onClose,
  onSave,
}: {
  event: EventData;
  onClose: () => void;
  onSave: (event: EventData) => void;
}) {
  const [form, setForm] = useState({
    capacity: String(event.capacity),
    category: event.category,
    city: event.city,
    date: toDateInput(event.date),
    name: event.name,
    status: event.status,
    venue: event.venue,
  });

  const submit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    onSave({
      ...event,
      capacity: Number(form.capacity) || event.capacity,
      category: form.category,
      city: form.city || event.city,
      date: form.date ? formatEventDate(form.date) : event.date,
      name: form.name || event.name,
      status: form.status as EventStatus,
      venue: form.venue || event.venue,
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-backdrop px-4">
      <Card className="w-full max-w-lg bg-surface" role="dialog">
        <form onSubmit={submit}>
          <Card.Header className="flex-row items-start justify-between">
            <div>
              <Card.Title>Edit event</Card.Title>
              <Card.Description>Update the event record in this frontend template.</Card.Description>
            </div>
            <Button isIconOnly onPress={onClose} size="sm" type="button" variant="ghost">
              <Xmark className="size-4" strokeWidth={1.5} />
            </Button>
          </Card.Header>
          <Card.Content className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="text-muted">Event name</span>
              <Input
                aria-label="Event name"
                fullWidth
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, name: inputEvent.target.value }))
                }
                value={form.name}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Category</span>
              <AppSelect
                ariaLabel="Event category"
                fullWidth
                onChange={(value) => setForm((current) => ({ ...current, category: value }))}
                options={categoryOptions}
                value={form.category}
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Status</span>
              <AppSelect
                ariaLabel="Event status"
                fullWidth
                onChange={(value) =>
                  setForm((current) => ({ ...current, status: value as EventStatus }))
                }
                options={statusSelectOptions}
                value={form.status}
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Date</span>
              <Input
                aria-label="Event date"
                fullWidth
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, date: inputEvent.target.value }))
                }
                type="date"
                value={form.date}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Capacity</span>
              <Input
                aria-label="Event capacity"
                fullWidth
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, capacity: inputEvent.target.value }))
                }
                type="number"
                value={form.capacity}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">City</span>
              <Input
                aria-label="Event city"
                fullWidth
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, city: inputEvent.target.value }))
                }
                value={form.city}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Venue</span>
              <Input
                aria-label="Event venue"
                fullWidth
                onChange={(inputEvent) =>
                  setForm((current) => ({ ...current, venue: inputEvent.target.value }))
                }
                value={form.venue}
                variant="secondary"
              />
            </label>
          </Card.Content>
          <Card.Footer className="justify-end gap-2">
            <Button onPress={onClose} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}

function DeleteEventDialog({
  event,
  onCancel,
  onDelete,
}: {
  event: EventData;
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-backdrop px-4">
      <Card className="w-full max-w-md bg-surface" role="alertdialog">
        <Card.Header>
          <Card.Title>Delete event</Card.Title>
          <Card.Description>
            Remove {event.name} from the current dummy dataset.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-muted">
            This only updates the frontend state for the template preview.
          </p>
        </Card.Content>
        <Card.Footer className="justify-end gap-2">
          <Button onPress={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onPress={onDelete} variant="danger-soft">
            Delete event
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
