import { ArrowRight, Calendar, ChartLine, CircleDollar, CreditCard, Receipt } from "@gravity-ui/icons";
import { Card, Chip } from "@heroui/react";

import { CreateEventDrawer } from "@/components/create-event-drawer";
import { ItemCard } from "@/components/item-card";
import { LinkButton } from "@/components/link-button";
import { MetricCard } from "@/components/metric-card";
import { SalesChart } from "@/components/sales-chart";
import { SectionHeader } from "@/components/section-header";
import { StatusChip } from "@/components/status-chip";
import {
  channelSeries,
  eventName,
  events,
  formatCurrency,
  formatNumber,
  orders,
  percent,
  salesSeries,
  totals,
} from "@/lib/tixora-data";

export default function DashboardPage() {
  const selectedEvent = events[0];
  const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <div className="flex flex-wrap gap-2">
            <LinkButton href="/reports" size="sm" variant="outline">
              Export report
            </LinkButton>
            <CreateEventDrawer />
          </div>
        }
        eyebrow="Control center"
        title="Event ticket operations"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          helper="+12.8% from last period"
          icon={CircleDollar}
          label="Gross revenue"
          value={formatCurrency(totals.revenue)}
        />
        <MetricCard
          helper={`${percent(totals.sold, totals.capacity)}% of total capacity`}
          icon={Receipt}
          label="Tickets sold"
          value={formatNumber(totals.sold)}
        />
        <MetricCard
          helper={`${events.filter((event) => event.status !== "Completed").length} active workflows`}
          icon={Calendar}
          label="Managed events"
          value={String(events.length)}
        />
        <MetricCard
          helper="Pending settlement"
          icon={CreditCard}
          label="Payout queue"
          value={formatCurrency(totals.pendingPayout)}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
        <Card>
          <Card.Header className="flex-row items-center justify-between">
            <div>
              <Card.Title>Sales momentum</Card.Title>
              <Card.Description>Monthly gross ticket sales</Card.Description>
            </div>
            <Chip color="success" size="sm" variant="soft">
              +18.6%
            </Chip>
          </Card.Header>
          <Card.Content>
            <SalesChart labels={chartLabels} values={salesSeries} />
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {["Feb", "Mar", "Apr", "May"].map((month, index) => (
                <ItemCard key={month} variant="secondary">
                  <ItemCard.Icon>
                    <ChartLine className="size-5" />
                  </ItemCard.Icon>
                  <ItemCard.Content>
                    <ItemCard.Title>{month}</ItemCard.Title>
                    <ItemCard.Description>
                      {formatCurrency([28400, 37600, 42100, 58300][index])}
                    </ItemCard.Description>
                  </ItemCard.Content>
                </ItemCard>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Featured event</Card.Title>
            <Card.Description>Revenue, capacity, and gate readiness</Card.Description>
          </Card.Header>
          <Card.Content className="gap-4">
            <ItemCard variant="secondary">
              <ItemCard.Icon>
                <Calendar className="size-5" />
              </ItemCard.Icon>
              <ItemCard.Content>
                <ItemCard.Title>{selectedEvent.name}</ItemCard.Title>
                <ItemCard.Description>
                  {selectedEvent.city} - {selectedEvent.date}
                </ItemCard.Description>
              </ItemCard.Content>
              <ItemCard.Action>
                <StatusChip status={selectedEvent.status} />
              </ItemCard.Action>
            </ItemCard>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Sold capacity</span>
                <span className="font-medium text-foreground">
                  {formatNumber(selectedEvent.sold)} / {formatNumber(selectedEvent.capacity)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-default">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${percent(selectedEvent.sold, selectedEvent.capacity)}%` }}
                />
              </div>
            </div>
            <LinkButton href="/events" variant="tertiary">
              Open event workspace
              <ArrowRight className="size-4" />
            </LinkButton>
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <Card.Header className="flex-row items-center justify-between">
            <div>
              <Card.Title>Recent orders</Card.Title>
              <Card.Description>Latest buyer transactions</Card.Description>
            </div>
            <LinkButton href="/orders" size="sm" variant="ghost">
              View all
              <ArrowRight className="size-4" />
            </LinkButton>
          </Card.Header>
          <Card.Content className="gap-0">
            {orders.slice(0, 5).map((order) => (
              <ItemCard key={order.id} variant="secondary">
                <ItemCard.Icon>
                  <Receipt className="size-5" />
                </ItemCard.Icon>
                <ItemCard.Content>
                  <ItemCard.Title>
                    {order.id} - {order.buyer}
                  </ItemCard.Title>
                  <ItemCard.Description>{eventName(order.eventId)}</ItemCard.Description>
                </ItemCard.Content>
                <ItemCard.Action>
                  <StatusChip status={order.status} />
                </ItemCard.Action>
              </ItemCard>
            ))}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Sales channels</Card.Title>
            <Card.Description>Current order attribution</Card.Description>
          </Card.Header>
          <Card.Content className="gap-4">
            {channelSeries.map((item) => (
              <div key={item.channel}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{item.channel}</span>
                  <span className="text-muted">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-default">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
