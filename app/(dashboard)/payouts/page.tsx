"use client";

import { Check, CircleDollar, Magnifier, Receipt } from "@gravity-ui/icons";
import { Button, Input, Table } from "@heroui/react";
import { useMemo, useState } from "react";

import { AppSelect } from "@/components/app-select";
import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { StatusChip } from "@/components/status-chip";
import {
  eventName,
  events,
  formatCurrency,
  payouts,
  totals,
  type PayoutStatus,
} from "@/lib/fame-ka-game-data";

const payoutStatusOptions: Array<PayoutStatus | "All"> = ["All", "Paid", "Pending", "Failed"];

export default function PayoutsPage() {
  const [query, setQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<PayoutStatus | "All">("All");

  const filteredPayouts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return payouts.filter((payout) => {
      const matchesQuery =
        payout.id.toLowerCase().includes(normalized) ||
        payout.method.toLowerCase().includes(normalized) ||
        eventName(payout.eventId).toLowerCase().includes(normalized);
      const matchesEvent = eventFilter === "All" || payout.eventId === eventFilter;
      const matchesStatus = statusFilter === "All" || payout.status === statusFilter;

      return matchesQuery && matchesEvent && matchesStatus;
    });
  }, [eventFilter, query, statusFilter]);

  const paidOut = payouts
    .filter((payout) => payout.status === "Paid")
    .reduce((sum, payout) => sum + payout.amount, 0);
  const totalFees = payouts.reduce((sum, payout) => sum + payout.fee, 0);
  const activeFilterCount = [query.trim(), eventFilter !== "All", statusFilter !== "All"].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button size="sm" variant="outline">
            Export payout report
          </Button>
        }
        eyebrow="Finance"
        title="Balances, settlement, and fees"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          helper="Available after settlement"
          icon={CircleDollar}
          label="Pending payout"
          value={formatCurrency(totals.pendingPayout)}
        />
        <MetricCard helper="Paid payout history" icon={Check} label="Paid out" value={formatCurrency(paidOut)} />
        <MetricCard helper="Platform and processing" icon={Receipt} label="Total fees" value={formatCurrency(totalFees)} />
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_180px_auto]">
        <div className="relative">
          <Magnifier className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            aria-label="Search payouts"
            className="pl-9"
            fullWidth
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search payout, event, or method"
            value={query}
            variant="secondary"
          />
        </div>
        <AppSelect
          ariaLabel="Filter payouts by event"
          fullWidth
          onChange={setEventFilter}
          options={[
            { label: "All events", value: "All" },
            ...events.map((event) => ({ label: event.name, value: event.id })),
          ]}
          value={eventFilter}
        />
        <AppSelect
          ariaLabel="Filter payouts by status"
          fullWidth
          onChange={(value) => setStatusFilter(value as PayoutStatus | "All")}
          options={payoutStatusOptions.map((status) => ({ label: status, value: status }))}
          value={statusFilter}
        />
        <Button
          isDisabled={activeFilterCount === 0}
          onPress={() => {
            setQuery("");
            setEventFilter("All");
            setStatusFilter("All");
          }}
          variant="outline"
        >
          Reset
        </Button>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Payouts" className="min-w-[780px]">
            <Table.Header>
              <Table.Column isRowHeader>Payout</Table.Column>
              <Table.Column>Event</Table.Column>
              <Table.Column>Method</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Fee</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <div className="flex h-40 items-center justify-center text-sm text-muted">
                  No payouts match the selected filters.
                </div>
              )}
            >
              {filteredPayouts.map((payout) => (
                <Table.Row id={payout.id} key={payout.id}>
                  <Table.Cell>
                    <span className="font-medium text-foreground">{payout.id}</span>
                  </Table.Cell>
                  <Table.Cell>{eventName(payout.eventId)}</Table.Cell>
                  <Table.Cell>{payout.method}</Table.Cell>
                  <Table.Cell>{formatCurrency(payout.amount)}</Table.Cell>
                  <Table.Cell>{formatCurrency(payout.fee)}</Table.Cell>
                  <Table.Cell>{payout.date}</Table.Cell>
                  <Table.Cell>
                    <StatusChip status={payout.status} />
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
