import { Bell, Check, Clock } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";

import { SectionHeader } from "@/components/section-header";
import { notifications } from "@/lib/tixora-data";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button size="sm" variant="outline">
            Mark all as read
          </Button>
        }
        eyebrow="Inbox"
        title="All notifications"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Card.Content>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Unread</span>
              <Bell className="size-4 text-muted" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-2xl font-semibold">
              {notifications.filter((notification) => notification.unread).length}
            </p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Resolved</span>
              <Check className="size-4 text-muted" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-2xl font-semibold">
              {notifications.filter((notification) => !notification.unread).length}
            </p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Latest</span>
              <Clock className="size-4 text-muted" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-2xl font-semibold">{notifications[0]?.time}</p>
          </Card.Content>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <Card.Title>Notification list</Card.Title>
          <Card.Description>Operational alerts from orders, payouts, tickets, and gates</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="divide-y divide-default">
            {notifications.map((notification) => (
              <div className="py-4" key={notification.id}>
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <p
                    className={`truncate text-foreground ${
                      notification.unread ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {notification.title}
                  </p>
                  {notification.unread && <span className="size-2 shrink-0 rounded-full bg-danger" />}
                </div>
                <div className="min-w-0">
                  <p className="mt-1 text-sm text-muted">{notification.body}</p>
                  <span className="mt-1 block text-xs text-muted">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
