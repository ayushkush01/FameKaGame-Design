"use client";

import { Calendar, Plus } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import type { FormEvent } from "react";
import { useState } from "react";

import { AppSelect } from "@/components/app-select";
import type { EventData } from "@/lib/tixora-data";

export function CreateEventDrawer({
  onCreate,
  size = "sm",
}: {
  onCreate?: (event: EventData) => void;
  size?: "sm" | "md" | "lg";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    capacity: "1200",
    category: "Conference",
    city: "",
    date: "2026-06-28",
    name: "",
    venue: "",
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextEvent: EventData = {
      capacity: Number(form.capacity) || 1200,
      category: form.category,
      checkIn: 0,
      city: form.city || "New York",
      date: new Date(form.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      id: `ev-${Date.now().toString().slice(-4)}`,
      name: form.name || "Untitled Event",
      revenue: 0,
      sold: 0,
      status: "Draft",
      trend: 0,
      venue: form.venue || "Main Hall",
    };

    onCreate?.(nextEvent);
    setIsOpen(false);
    setForm({
      capacity: "1200",
      category: "Conference",
      city: "",
      date: "2026-06-28",
      name: "",
      venue: "",
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} onPress={() => setIsOpen(true)} size={size} type="button" variant="primary">
        <Plus className="size-4" />
        Create event
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-backdrop">
          <button
            aria-label="Close create event"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <Card className="relative h-full w-full max-w-md rounded-none bg-surface" role="dialog">
            <form className="flex h-full flex-col" onSubmit={submit}>
              <Card.Header className="flex-row items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-default text-muted">
                    <Calendar className="size-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <Card.Title>Create event</Card.Title>
                    <Card.Description>Draft a new event for your ticket catalog.</Card.Description>
                  </div>
                </div>
                <Button isIconOnly onPress={() => setIsOpen(false)} size="sm" variant="ghost">
                  <span aria-hidden="true">x</span>
                </Button>
              </Card.Header>
              <Card.Content className="flex-1 gap-5 overflow-y-auto pt-3">
                <label className="space-y-2 text-sm">
                  <span className="text-muted">Event name</span>
                  <Input
                    aria-label="Event name"
                    fullWidth
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="City Tech Conference"
                    value={form.name}
                    variant="secondary"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted">Category</span>
                  <AppSelect
                    ariaLabel="Category"
                    fullWidth
                    onChange={(value) => setForm((current) => ({ ...current, category: value }))}
                    options={["Conference", "Music Festival", "Sports", "Expo"].map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    value={form.category}
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted">Date</span>
                  <Input
                    aria-label="Date"
                    fullWidth
                    onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                    type="date"
                    value={form.date}
                    variant="secondary"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted">City</span>
                  <Input
                    aria-label="City"
                    fullWidth
                    onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                    placeholder="San Francisco"
                    value={form.city}
                    variant="secondary"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted">Venue</span>
                  <Input
                    aria-label="Venue"
                    fullWidth
                    onChange={(event) => setForm((current) => ({ ...current, venue: event.target.value }))}
                    placeholder="Convention Center"
                    value={form.venue}
                    variant="secondary"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted">Capacity</span>
                  <Input
                    aria-label="Capacity"
                    fullWidth
                    onChange={(event) => setForm((current) => ({ ...current, capacity: event.target.value }))}
                    type="number"
                    value={form.capacity}
                    variant="secondary"
                  />
                </label>
              </Card.Content>
              <Card.Footer className="justify-end gap-2">
                <Button onPress={() => setIsOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Create draft
                </Button>
              </Card.Footer>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
