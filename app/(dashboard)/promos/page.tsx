"use client";

import { Pencil, Plus, Xmark } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { AppSelect } from "@/components/app-select";
import { SectionHeader } from "@/components/section-header";
import { StatusChip } from "@/components/status-chip";
import {
  eventName,
  events,
  percent,
  promos as promoData,
  type PromoData,
  type PromoStatus,
} from "@/lib/tixora-data";

const promoStatusOptions: PromoStatus[] = ["Active", "Scheduled", "Expired"];

function formatPromoDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toDateInput(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "2026-06-30";
  }

  return parsed.toISOString().slice(0, 10);
}

export default function PromosPage() {
  const [promos, setPromos] = useState(promoData);
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);
  const [editingPromo, setEditingPromo] = useState<PromoData | null>(null);
  const [form, setForm] = useState({
    code: "",
    discount: "15%",
    ends: "2026-06-30",
    eventId: events[0]?.id ?? "",
    limit: "100",
    status: "Scheduled" as PromoStatus,
  });
  const [formError, setFormError] = useState("");

  const activePromos = promos.filter((promo) => promo.status !== "Expired");
  const redeemedCount = promos.reduce((sum, promo) => sum + promo.usage, 0);
  const totalLimit = promos.reduce((sum, promo) => sum + promo.limit, 0);
  const eventOptions = events.map((event) => ({ label: event.name, value: event.id }));
  const statusOptions = promoStatusOptions.map((status) => ({ label: status, value: status }));

  const sortedPromos = useMemo(
    () => [...promos].sort((a, b) => Number(a.status === "Expired") - Number(b.status === "Expired")),
    [promos],
  );

  const resetForm = () => {
    setForm({
      code: "",
      discount: "15%",
      ends: "2026-06-30",
      eventId: events[0]?.id ?? "",
      limit: "100",
      status: "Scheduled",
    });
    setFormError("");
  };

  const addPromo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = form.code.trim().toUpperCase();

    if (!code || !form.discount.trim() || !form.ends || !form.limit) {
      setFormError("Complete the required promo fields first.");
      return;
    }

    if (promos.some((promo) => promo.code.toLowerCase() === code.toLowerCase())) {
      setFormError("That promo code already exists.");
      return;
    }

    const nextPromo: PromoData = {
      code,
      discount: form.discount.trim(),
      ends: formatPromoDate(form.ends),
      eventId: form.eventId,
      id: `PR-${String(promos.length + 1).padStart(2, "0")}`,
      limit: Number(form.limit) || 100,
      status: form.status,
      usage: 0,
    };

    setPromos((current) => [nextPromo, ...current]);
    resetForm();
  };

  const copyPromo = (promo: PromoData) => {
    void navigator.clipboard?.writeText(promo.code);
    setCopiedPromoId(promo.id);
  };

  const updatePromo = (updatedPromo: PromoData) => {
    setPromos((current) =>
      current.map((promo) => (promo.id === updatedPromo.id ? updatedPromo : promo)),
    );
    setEditingPromo(null);
  };

  const togglePromoStatus = (promoId: string) => {
    setPromos((current) =>
      current.map((promo) =>
        promo.id === promoId
          ? { ...promo, status: promo.status === "Expired" ? "Active" : "Expired" }
          : promo,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Discount studio" title="Promo code campaigns" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Card.Content>
            <span className="text-sm text-muted">Active promos</span>
            <p className="mt-3 text-2xl font-semibold text-foreground">{activePromos.length}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <span className="text-sm text-muted">Total redemptions</span>
            <p className="mt-3 text-2xl font-semibold text-foreground">{redeemedCount}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <span className="text-sm text-muted">Capacity used</span>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {percent(redeemedCount, totalLimit)}%
            </p>
          </Card.Content>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <Card.Title>Create promo</Card.Title>
          <Card.Description>Required fields keep the campaign preview realistic.</Card.Description>
        </Card.Header>
        <form onSubmit={addPromo}>
          <Card.Content className="grid gap-4 md:grid-cols-6">
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-muted">Promo code</span>
              <Input
                aria-label="Promo code"
                fullWidth
                required
                onChange={(event) => {
                  setForm((current) => ({ ...current, code: event.target.value.toUpperCase() }));
                  setFormError("");
                }}
                placeholder="SUMMER15"
                value={form.code}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-muted">Event</span>
              <AppSelect
                ariaLabel="Promo event"
                fullWidth
                onChange={(value) => setForm((current) => ({ ...current, eventId: value }))}
                options={eventOptions}
                value={form.eventId}
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-muted">Status</span>
              <AppSelect
                ariaLabel="Promo status"
                fullWidth
                onChange={(value) =>
                  setForm((current) => ({ ...current, status: value as PromoStatus }))
                }
                options={statusOptions}
                value={form.status}
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-muted">Discount</span>
              <Input
                aria-label="Discount"
                fullWidth
                required
                onChange={(event) =>
                  setForm((current) => ({ ...current, discount: event.target.value }))
                }
                placeholder="15%"
                value={form.discount}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-muted">Usage limit</span>
              <Input
                aria-label="Usage limit"
                fullWidth
                required
                min={1}
                onChange={(event) => setForm((current) => ({ ...current, limit: event.target.value }))}
                type="number"
                value={form.limit}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-muted">End date</span>
              <Input
                aria-label="End date"
                fullWidth
                required
                onChange={(event) => setForm((current) => ({ ...current, ends: event.target.value }))}
                type="date"
                value={form.ends}
                variant="secondary"
              />
            </label>
            {formError && (
              <p className="text-sm text-danger md:col-span-6">{formError}</p>
            )}
          </Card.Content>
          <Card.Footer className="mt-4 justify-end gap-2">
            <Button onPress={resetForm} type="button" variant="outline">
              Reset
            </Button>
            <Button type="submit" variant="primary">
              <Plus className="size-4" strokeWidth={1.5} />
              Add promo
            </Button>
          </Card.Footer>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedPromos.map((promo) => (
          <Card key={promo.id}>
            <Card.Header>
              <div className="flex w-full items-start justify-between gap-3">
                <div>
                  <Card.Title>{promo.code}</Card.Title>
                  <Card.Description>{eventName(promo.eventId)}</Card.Description>
                </div>
                <StatusChip status={promo.status} />
              </div>
            </Card.Header>
            <Card.Content>
              <div className="divide-y divide-default">
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-muted">Discount</span>
                  <span className="font-medium text-foreground">{promo.discount}</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-muted">Ends</span>
                  <span className="font-medium text-foreground">{promo.ends}</span>
                </div>
                <div className="py-3">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted">Usage</span>
                    <span className="text-foreground">
                      {promo.usage} / {promo.limit}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-default">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${percent(promo.usage, promo.limit)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card.Content>
            <Card.Footer className="flex-wrap gap-2">
              <Button onPress={() => copyPromo(promo)} size="sm" variant="outline">
                {copiedPromoId === promo.id ? "Copied" : "Copy code"}
              </Button>
              <Button onPress={() => setEditingPromo(promo)} size="sm" variant="tertiary">
                <Pencil className="size-4" strokeWidth={1.5} />
                Edit
              </Button>
              <Button onPress={() => togglePromoStatus(promo.id)} size="sm" variant="outline">
                {promo.status === "Expired" ? "Restore" : "Expire"}
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>

      {editingPromo && (
        <EditPromoDialog
          eventOptions={eventOptions}
          onClose={() => setEditingPromo(null)}
          onSave={updatePromo}
          promo={editingPromo}
          statusOptions={statusOptions}
        />
      )}
    </div>
  );
}

function EditPromoDialog({
  eventOptions,
  onClose,
  onSave,
  promo,
  statusOptions,
}: {
  eventOptions: Array<{ label: string; value: string }>;
  onClose: () => void;
  onSave: (promo: PromoData) => void;
  promo: PromoData;
  statusOptions: Array<{ label: string; value: string }>;
}) {
  const [form, setForm] = useState({
    code: promo.code,
    discount: promo.discount,
    ends: toDateInput(promo.ends),
    eventId: promo.eventId,
    limit: String(promo.limit),
    status: promo.status,
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave({
      ...promo,
      code: form.code.trim().toUpperCase() || promo.code,
      discount: form.discount.trim() || promo.discount,
      ends: formatPromoDate(form.ends),
      eventId: form.eventId,
      limit: Number(form.limit) || promo.limit,
      status: form.status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-backdrop px-4">
      <Card className="w-full max-w-lg bg-surface" role="dialog">
        <form onSubmit={submit}>
          <Card.Header className="flex-row items-start justify-between">
            <div>
              <Card.Title>Edit promo</Card.Title>
              <Card.Description>Keep usage data while updating campaign rules.</Card.Description>
            </div>
            <Button isIconOnly onPress={onClose} size="sm" type="button" variant="ghost">
              <Xmark className="size-4" strokeWidth={1.5} />
            </Button>
          </Card.Header>
          <Card.Content className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-muted">Promo code</span>
              <Input
                aria-label="Edit promo code"
                fullWidth
                required
                onChange={(event) =>
                  setForm((current) => ({ ...current, code: event.target.value.toUpperCase() }))
                }
                value={form.code}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Discount</span>
              <Input
                aria-label="Edit discount"
                fullWidth
                required
                onChange={(event) =>
                  setForm((current) => ({ ...current, discount: event.target.value }))
                }
                value={form.discount}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Event</span>
              <AppSelect
                ariaLabel="Edit promo event"
                fullWidth
                onChange={(value) => setForm((current) => ({ ...current, eventId: value }))}
                options={eventOptions}
                value={form.eventId}
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Status</span>
              <AppSelect
                ariaLabel="Edit promo status"
                fullWidth
                onChange={(value) =>
                  setForm((current) => ({ ...current, status: value as PromoStatus }))
                }
                options={statusOptions}
                value={form.status}
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">Usage limit</span>
              <Input
                aria-label="Edit usage limit"
                fullWidth
                required
                min={1}
                onChange={(event) =>
                  setForm((current) => ({ ...current, limit: event.target.value }))
                }
                type="number"
                value={form.limit}
                variant="secondary"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-muted">End date</span>
              <Input
                aria-label="Edit end date"
                fullWidth
                required
                onChange={(event) => setForm((current) => ({ ...current, ends: event.target.value }))}
                type="date"
                value={form.ends}
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
