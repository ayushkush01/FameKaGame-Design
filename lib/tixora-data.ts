export type EventStatus = "Published" | "Draft" | "Scheduled" | "Completed";
export type OrderStatus = "Paid" | "Pending" | "Refunded" | "Failed";
export type TicketStatus = "Active" | "Paused" | "Sold out";
export type PayoutStatus = "Paid" | "Pending" | "Failed";
export type PromoStatus = "Active" | "Scheduled" | "Expired";

export type EventData = {
  id: string;
  name: string;
  category: string;
  city: string;
  venue: string;
  date: string;
  status: EventStatus;
  revenue: number;
  sold: number;
  capacity: number;
  checkIn: number;
  trend: number;
};

export type TicketData = {
  id: string;
  eventId: string;
  name: string;
  price: number;
  sold: number;
  quota: number;
  revenue: number;
  status: TicketStatus;
  window: string;
};

export type OrderData = {
  id: string;
  buyer: string;
  email: string;
  eventId: string;
  ticket: string;
  amount: number;
  quantity: number;
  status: OrderStatus;
  date: string;
  channel: string;
};

export type AttendeeData = {
  id: string;
  name: string;
  email: string;
  eventId: string;
  ticket: string;
  ticketCode: string;
  orderId: string;
  group: string;
  checkedIn: boolean;
  gate: string;
};

export type PromoData = {
  id: string;
  code: string;
  discount: string;
  eventId: string;
  usage: number;
  limit: number;
  status: PromoStatus;
  ends: string;
};

export type PayoutData = {
  id: string;
  eventId: string;
  amount: number;
  fee: number;
  status: PayoutStatus;
  date: string;
  method: string;
};

export type NotificationData = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const events: EventData[] = [
  {
    id: "ev-001",
    name: "Neon Harbor Music Week",
    category: "Music Festival",
    city: "Los Angeles",
    venue: "Harbor Stage",
    date: "May 31, 2026",
    status: "Published",
    revenue: 128400,
    sold: 6420,
    capacity: 8200,
    checkIn: 74,
    trend: 12.8,
  },
  {
    id: "ev-002",
    name: "Founders Summit Asia",
    category: "Conference",
    city: "Singapore",
    venue: "Marina Forum",
    date: "June 12, 2026",
    status: "Scheduled",
    revenue: 87450,
    sold: 1240,
    capacity: 1800,
    checkIn: 0,
    trend: 8.4,
  },
  {
    id: "ev-003",
    name: "Midnight Circuit Run",
    category: "Sports",
    city: "Jakarta",
    venue: "Gelora Track",
    date: "June 21, 2026",
    status: "Draft",
    revenue: 31890,
    sold: 950,
    capacity: 2500,
    checkIn: 0,
    trend: 4.2,
  },
  {
    id: "ev-004",
    name: "Craft Food Market",
    category: "Expo",
    city: "Austin",
    venue: "Market Hall",
    date: "April 18, 2026",
    status: "Completed",
    revenue: 56800,
    sold: 2840,
    capacity: 3000,
    checkIn: 91,
    trend: 19.1,
  },
];

export const tickets: TicketData[] = [
  {
    id: "tk-001",
    eventId: "ev-001",
    name: "Early Bird",
    price: 49,
    sold: 2100,
    quota: 2200,
    revenue: 102900,
    status: "Sold out",
    window: "Feb 1 - Mar 14",
  },
  {
    id: "tk-002",
    eventId: "ev-001",
    name: "General Admission",
    price: 79,
    sold: 3300,
    quota: 4500,
    revenue: 260700,
    status: "Active",
    window: "Mar 15 - May 30",
  },
  {
    id: "tk-003",
    eventId: "ev-001",
    name: "Backstage Pass",
    price: 189,
    sold: 315,
    quota: 400,
    revenue: 59535,
    status: "Active",
    window: "Apr 1 - May 29",
  },
  {
    id: "tk-004",
    eventId: "ev-002",
    name: "Founder Seat",
    price: 159,
    sold: 740,
    quota: 1000,
    revenue: 117660,
    status: "Active",
    window: "Mar 20 - Jun 11",
  },
  {
    id: "tk-005",
    eventId: "ev-003",
    name: "Runner Kit",
    price: 35,
    sold: 950,
    quota: 2500,
    revenue: 33250,
    status: "Paused",
    window: "May 9 - Jun 20",
  },
];

export const orders: OrderData[] = [
  {
    id: "ORD-1048",
    buyer: "Maya Chen",
    email: "maya.chen@example.com",
    eventId: "ev-001",
    ticket: "General Admission",
    amount: 158,
    quantity: 2,
    status: "Paid",
    date: "May 20, 2026",
    channel: "Website",
  },
  {
    id: "ORD-1047",
    buyer: "Rafael Stone",
    email: "rafael.stone@example.com",
    eventId: "ev-002",
    ticket: "Founder Seat",
    amount: 159,
    quantity: 1,
    status: "Pending",
    date: "May 20, 2026",
    channel: "Partner",
  },
  {
    id: "ORD-1046",
    buyer: "Nadia Putri",
    email: "nadia.putri@example.com",
    eventId: "ev-003",
    ticket: "Runner Kit",
    amount: 70,
    quantity: 2,
    status: "Paid",
    date: "May 19, 2026",
    channel: "Instagram",
  },
  {
    id: "ORD-1045",
    buyer: "Jon Bell",
    email: "jon.bell@example.com",
    eventId: "ev-001",
    ticket: "Backstage Pass",
    amount: 189,
    quantity: 1,
    status: "Refunded",
    date: "May 19, 2026",
    channel: "Website",
  },
  {
    id: "ORD-1044",
    buyer: "Amara Lewis",
    email: "amara.lewis@example.com",
    eventId: "ev-004",
    ticket: "Market Day Pass",
    amount: 40,
    quantity: 2,
    status: "Paid",
    date: "May 18, 2026",
    channel: "Website",
  },
  {
    id: "ORD-1043",
    buyer: "Dion Hart",
    email: "dion.hart@example.com",
    eventId: "ev-001",
    ticket: "General Admission",
    amount: 79,
    quantity: 1,
    status: "Failed",
    date: "May 18, 2026",
    channel: "Website",
  },
];

export const attendees: AttendeeData[] = [
  {
    id: "AT-901",
    name: "Maya Chen",
    email: "maya.chen@example.com",
    eventId: "ev-001",
    ticket: "General Admission",
    ticketCode: "TIX-2048",
    orderId: "ORD-1048",
    group: "VIP buyer",
    checkedIn: true,
    gate: "Gate A",
  },
  {
    id: "AT-902",
    name: "Luis Martin",
    email: "luis.martin@example.com",
    eventId: "ev-001",
    ticket: "General Admission",
    ticketCode: "TIX-2049",
    orderId: "ORD-1048",
    group: "Standard",
    checkedIn: false,
    gate: "Gate B",
  },
  {
    id: "AT-903",
    name: "Rafael Stone",
    email: "rafael.stone@example.com",
    eventId: "ev-002",
    ticket: "Founder Seat",
    ticketCode: "TIX-3088",
    orderId: "ORD-1047",
    group: "Speaker guest",
    checkedIn: false,
    gate: "North Desk",
  },
  {
    id: "AT-904",
    name: "Nadia Putri",
    email: "nadia.putri@example.com",
    eventId: "ev-003",
    ticket: "Runner Kit",
    ticketCode: "TIX-4210",
    orderId: "ORD-1046",
    group: "Team runner",
    checkedIn: false,
    gate: "Bib Pickup",
  },
  {
    id: "AT-905",
    name: "Jon Bell",
    email: "jon.bell@example.com",
    eventId: "ev-001",
    ticket: "Backstage Pass",
    ticketCode: "TIX-2050",
    orderId: "ORD-1045",
    group: "Crew",
    checkedIn: true,
    gate: "Gate C",
  },
  {
    id: "AT-906",
    name: "Amara Lewis",
    email: "amara.lewis@example.com",
    eventId: "ev-004",
    ticket: "Market Day Pass",
    ticketCode: "TIX-6110",
    orderId: "ORD-1044",
    group: "Vendor",
    checkedIn: true,
    gate: "Main Hall",
  },
];

export const promos: PromoData[] = [
  {
    id: "PR-01",
    code: "EARLY25",
    discount: "25%",
    eventId: "ev-001",
    usage: 820,
    limit: 1000,
    status: "Active",
    ends: "May 25, 2026",
  },
  {
    id: "PR-02",
    code: "FOUNDER50",
    discount: "$50",
    eventId: "ev-002",
    usage: 115,
    limit: 250,
    status: "Scheduled",
    ends: "June 8, 2026",
  },
  {
    id: "PR-03",
    code: "MARKET10",
    discount: "10%",
    eventId: "ev-004",
    usage: 342,
    limit: 400,
    status: "Expired",
    ends: "April 17, 2026",
  },
];

export const payouts: PayoutData[] = [
  {
    id: "PO-2031",
    eventId: "ev-004",
    amount: 52140,
    fee: 4660,
    status: "Paid",
    date: "April 22, 2026",
    method: "Bank transfer",
  },
  {
    id: "PO-2032",
    eventId: "ev-001",
    amount: 78200,
    fee: 3840,
    status: "Pending",
    date: "May 24, 2026",
    method: "Stripe balance",
  },
  {
    id: "PO-2033",
    eventId: "ev-002",
    amount: 31800,
    fee: 1520,
    status: "Pending",
    date: "June 16, 2026",
    method: "Bank transfer",
  },
  {
    id: "PO-2034",
    eventId: "ev-003",
    amount: 9800,
    fee: 620,
    status: "Failed",
    date: "May 17, 2026",
    method: "Bank transfer",
  },
];

export const salesSeries = [36, 48, 44, 62, 71, 68, 84, 91, 88, 104, 116, 128];

export const gateSeries = [
  { gate: "Gate A", value: 84 },
  { gate: "Gate B", value: 67 },
  { gate: "Gate C", value: 52 },
  { gate: "VIP Desk", value: 39 },
];

export const channelSeries = [
  { channel: "Website", value: 58 },
  { channel: "Partner", value: 18 },
  { channel: "Instagram", value: 16 },
  { channel: "Referral", value: 8 },
];

export const notifications: NotificationData[] = [
  {
    id: "nt-001",
    title: "Payout scheduled",
    body: "Neon Harbor Music Week payout is queued for May 24.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "nt-002",
    title: "Ticket quota alert",
    body: "Early Bird tickets reached sold out status.",
    time: "18 min ago",
    unread: true,
  },
  {
    id: "nt-003",
    title: "Refund request reviewed",
    body: "ORD-1045 was moved to refunded.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: "nt-004",
    title: "Gate check-in spike",
    body: "Gate A is processing 84% of current traffic.",
    time: "2 hours ago",
    unread: false,
  },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

export const percent = (value: number, total: number) =>
  total === 0 ? 0 : Math.min(100, Math.round((value / total) * 100));

export const eventName = (eventId: string) =>
  events.find((event) => event.id === eventId)?.name ?? "Unassigned event";

export const totals = {
  capacity: events.reduce((sum, event) => sum + event.capacity, 0),
  checkedIn: attendees.filter((attendee) => attendee.checkedIn).length,
  pendingPayout: payouts
    .filter((payout) => payout.status === "Pending")
    .reduce((sum, payout) => sum + payout.amount, 0),
  revenue: events.reduce((sum, event) => sum + event.revenue, 0),
  sold: events.reduce((sum, event) => sum + event.sold, 0),
};
