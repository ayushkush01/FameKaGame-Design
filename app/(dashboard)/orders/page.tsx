"use client";

import { Envelope, Magnifier } from "@gravity-ui/icons";
import { Button, Input, Table } from "@heroui/react";
import { useMemo, useState } from "react";

import { AppSelect } from "@/components/app-select";
import { SectionHeader } from "@/components/section-header";
import { StatusChip } from "@/components/status-chip";
import {
  eventName,
  formatCurrency,
  orders as initialOrders,
  type OrderStatus,
} from "@/lib/fame-ka-game-data";

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OrderStatus | "All">("All");

  const filteredOrders = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesQuery =
        order.id.toLowerCase().includes(normalized) ||
        order.buyer.toLowerCase().includes(normalized) ||
        order.email.toLowerCase().includes(normalized) ||
        eventName(order.eventId).toLowerCase().includes(normalized);
      const matchesStatus = status === "All" || order.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [orders, query, status]);

  const refundOrder = (orderId: string) => {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status: "Refunded" } : order)),
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button size="sm" variant="outline">
            Export orders
          </Button>
        }
        eyebrow="Order desk"
        title="Transactions, refunds, and resend actions"
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Magnifier className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            aria-label="Search orders"
            className="pl-9"
            fullWidth
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search buyer, order, or event"
            value={query}
            variant="secondary"
          />
        </div>
        <AppSelect
          ariaLabel="Filter order status"
          className="md:w-44"
          onChange={(value) => setStatus(value as OrderStatus | "All")}
          options={["All", "Paid", "Pending", "Refunded", "Failed"].map((item) => ({
            label: item,
            value: item,
          }))}
          value={status}
        />
      </div>

      <Table className="min-h-[260px]">
        <Table.ScrollContainer>
          <Table.Content aria-label="Orders" className="min-w-[940px]">
            <Table.Header>
              <Table.Column isRowHeader>Order</Table.Column>
              <Table.Column>Buyer</Table.Column>
              <Table.Column>Event</Table.Column>
              <Table.Column>Ticket</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <div className="flex h-40 items-center justify-center text-sm text-muted">
                  No orders found.
                </div>
              )}
            >
              {filteredOrders.map((order) => (
                <Table.Row id={order.id} key={order.id}>
                  <Table.Cell>
                    <div className="font-medium text-foreground">{order.id}</div>
                    <div className="text-xs text-muted">{order.date}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="font-medium text-foreground">{order.buyer}</div>
                    <div className="text-xs text-muted">{order.email}</div>
                  </Table.Cell>
                  <Table.Cell>{eventName(order.eventId)}</Table.Cell>
                  <Table.Cell>
                    {order.quantity} x {order.ticket}
                  </Table.Cell>
                  <Table.Cell>{formatCurrency(order.amount)}</Table.Cell>
                  <Table.Cell>
                    <StatusChip status={order.status} />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Envelope className="size-4" />
                        Resend
                      </Button>
                      <Button
                        isDisabled={order.status === "Refunded" || order.status === "Failed"}
                        onPress={() => refundOrder(order.id)}
                        size="sm"
                        variant="danger-soft"
                      >
                        Refund
                      </Button>
                    </div>
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
