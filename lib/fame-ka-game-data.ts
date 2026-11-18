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
  description: string;
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

/**
 * One record per episode of "Fame Ka Game" – Season 1 (16 episodes).
 * Titles, round format, talent categories and the ₹3,959 registration fee come from
 * the show proposal. Dates and venues are not fixed in the proposal and use
 * "[... TBD]" placeholders. Ticket sales figures are illustrative demo values.
 */
export const events: EventData[] = [
  {
    id: "ep-001",
    name: "Episode 1 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Published",
    revenue: 470000,
    sold: 940,
    capacity: 1200,
    checkIn: 0,
    trend: 12.8,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Singing & Rapping.",
  },
  {
    id: "ep-002",
    name: "Episode 2 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 435000,
    sold: 870,
    capacity: 1200,
    checkIn: 0,
    trend: 8.4,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Dancing & Beatboxing.",
  },
  {
    id: "ep-003",
    name: "Episode 3 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 320000,
    sold: 640,
    capacity: 1200,
    checkIn: 0,
    trend: 6.1,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Stand-up Comedy & Mimicry.",
  },
  {
    id: "ep-004",
    name: "Episode 4 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 260000,
    sold: 520,
    capacity: 1200,
    checkIn: 0,
    trend: 4.2,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Magic Show & Acting.",
  },
  {
    id: "ep-005",
    name: "Episode 5 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 240000,
    sold: 480,
    capacity: 1200,
    checkIn: 0,
    trend: 3.5,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Musical Instrument & Drumming.",
  },
  {
    id: "ep-006",
    name: "Episode 6 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 205000,
    sold: 410,
    capacity: 1200,
    checkIn: 0,
    trend: 2.8,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Folk & Classical Performance.",
  },
  {
    id: "ep-007",
    name: "Episode 7 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 190000,
    sold: 380,
    capacity: 1200,
    checkIn: 0,
    trend: 2.4,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Creative & Visual Arts Performance.",
  },
  {
    id: "ep-008",
    name: "Episode 8 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 175000,
    sold: 350,
    capacity: 1400,
    checkIn: 0,
    trend: 2.0,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Freestyle & Special Talent Acts.",
  },
  {
    id: "ep-009",
    name: "Episode 9 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 150000,
    sold: 300,
    capacity: 1400,
    checkIn: 0,
    trend: 1.6,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Unique Talent Round.",
  },
  {
    id: "ep-010",
    name: "Episode 10 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 130000,
    sold: 260,
    capacity: 1400,
    checkIn: 0,
    trend: 1.4,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Singing & Dancing.",
  },
  {
    id: "ep-011",
    name: "Episode 11 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 120000,
    sold: 240,
    capacity: 1400,
    checkIn: 0,
    trend: 1.2,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Rapping & Beatboxing.",
  },
  {
    id: "ep-012",
    name: "Episode 12 – Audition & Selection Round",
    category: "Audition & Selection",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Scheduled",
    revenue: 105000,
    sold: 210,
    capacity: 1400,
    checkIn: 0,
    trend: 1.0,
    description:
      "30 contestants compete with performances, challenges, and talent-based tasks; the Top 2 advance. Talent focus: Mixed Talent (open category).",
  },
  {
    id: "ep-013",
    name: "Episode 13 – Top 24 Battle",
    category: "Top 24 Battle",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Draft",
    revenue: 90000,
    sold: 180,
    capacity: 2000,
    checkIn: 0,
    trend: 0.8,
    description:
      "Top 24 Battle – the Top 24 contestants compete head-to-head; the Top 12 advance to Episode 14.",
  },
  {
    id: "ep-014",
    name: "Episode 14 – Top 12 Round",
    category: "Top 12 Round",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Draft",
    revenue: 70000,
    sold: 140,
    capacity: 2000,
    checkIn: 0,
    trend: 0.6,
    description:
      "Top 12 Round – the Top 12 face high-level competition and performances; the Top 6 qualify for the Semi-Final.",
  },
  {
    id: "ep-015",
    name: "Episode 15 – Semi-Final",
    category: "Semi-Final",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Draft",
    revenue: 60000,
    sold: 120,
    capacity: 2500,
    checkIn: 0,
    trend: 0.4,
    description:
      "Semi-Final – the Top 6 compete; the Top 2 secure a place in the Grand Finale.",
  },
  {
    id: "ep-016",
    name: "Episode 16 – Grand Finale",
    category: "Grand Finale",
    city: "Bilaspur",
    venue: "[Venue TBD]",
    date: "[Date TBD]",
    status: "Draft",
    revenue: 45000,
    sold: 90,
    capacity: 5000,
    checkIn: 0,
    trend: 0.2,
    description:
      "Grand Finale – the Top 2 finalists compete for the championship title. The winner receives ₹12,00,000 and a brand-new scooter. Ends with a two-day live concert.",
  },
];

export const tickets: TicketData[] = [
  {
    id: "tk-001",
    eventId: "ep-001",
    name: "Contestant Registration",
    price: 3959,
    sold: 360,
    quota: 360,
    revenue: 1425240,
    status: "Sold out",
    window: "Registration Open – [TBD]",
  },
  {
    id: "tk-002",
    eventId: "ep-001",
    name: "Audition Audience Pass",
    price: 499,
    sold: 940,
    quota: 1200,
    revenue: 469060,
    status: "Active",
    window: "Now – [TBD]",
  },
  {
    id: "tk-003",
    eventId: "ep-001",
    name: "Premium Front Row",
    price: 1999,
    sold: 210,
    quota: 300,
    revenue: 419790,
    status: "Active",
    window: "Now – [TBD]",
  },
  {
    id: "tk-004",
    eventId: "ep-013",
    name: "Top 24 Battle Pass",
    price: 799,
    sold: 180,
    quota: 2000,
    revenue: 143820,
    status: "Active",
    window: "Now – [TBD]",
  },
  {
    id: "tk-005",
    eventId: "ep-016",
    name: "Grand Finale 2-Day Concert Pass",
    price: 4999,
    sold: 90,
    quota: 5000,
    revenue: 449910,
    status: "Active",
    window: "Now – [TBD]",
  },
  {
    id: "tk-006",
    eventId: "ep-002",
    name: "Season Pass (16 Episodes)",
    price: 7999,
    sold: 180,
    quota: 1000,
    revenue: 1439820,
    status: "Active",
    window: "Now – [TBD]",
  },
];

export const orders: OrderData[] = [
  {
    id: "ORD-2048",
    buyer: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    eventId: "ep-001",
    ticket: "Audition Audience Pass",
    amount: 998,
    quantity: 2,
    status: "Paid",
    date: "Nov 17, 2026",
    channel: "Website",
  },
  {
    id: "ORD-2047",
    buyer: "Priya Verma",
    email: "priya.verma@example.com",
    eventId: "ep-016",
    ticket: "Grand Finale 2-Day Concert Pass",
    amount: 4999,
    quantity: 1,
    status: "Pending",
    date: "Nov 17, 2026",
    channel: "Instagram",
  },
  {
    id: "ORD-2046",
    buyer: "Rohan Patel",
    email: "rohan.patel@example.com",
    eventId: "ep-002",
    ticket: "Season Pass (16 Episodes)",
    amount: 15998,
    quantity: 2,
    status: "Paid",
    date: "Nov 16, 2026",
    channel: "WhatsApp",
  },
  {
    id: "ORD-2045",
    buyer: "Sneha Iyer",
    email: "sneha.iyer@example.com",
    eventId: "ep-001",
    ticket: "Premium Front Row",
    amount: 1999,
    quantity: 1,
    status: "Refunded",
    date: "Nov 16, 2026",
    channel: "Website",
  },
  {
    id: "ORD-2044",
    buyer: "Kabir Singh",
    email: "kabir.singh@example.com",
    eventId: "ep-013",
    ticket: "Top 24 Battle Pass",
    amount: 799,
    quantity: 1,
    status: "Paid",
    date: "Nov 15, 2026",
    channel: "Box Office",
  },
  {
    id: "ORD-2043",
    buyer: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    eventId: "ep-001",
    ticket: "Audition Audience Pass",
    amount: 499,
    quantity: 1,
    status: "Failed",
    date: "Nov 15, 2026",
    channel: "Website",
  },
];

export const attendees: AttendeeData[] = [
  {
    id: "AT-901",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    eventId: "ep-001",
    ticket: "Audition Audience Pass",
    ticketCode: "FKG-1001",
    orderId: "ORD-2048",
    group: "VIP buyer",
    checkedIn: true,
    gate: "Gate 1",
  },
  {
    id: "AT-902",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    eventId: "ep-001",
    ticket: "Audition Audience Pass",
    ticketCode: "FKG-1002",
    orderId: "ORD-2048",
    group: "Standard",
    checkedIn: false,
    gate: "Gate 2",
  },
  {
    id: "AT-903",
    name: "Rohan Patel",
    email: "rohan.patel@example.com",
    eventId: "ep-002",
    ticket: "Season Pass (16 Episodes)",
    ticketCode: "FKG-2001",
    orderId: "ORD-2046",
    group: "Season pass",
    checkedIn: false,
    gate: "Gate 1",
  },
  {
    id: "AT-904",
    name: "Kabir Singh",
    email: "kabir.singh@example.com",
    eventId: "ep-013",
    ticket: "Top 24 Battle Pass",
    ticketCode: "FKG-3001",
    orderId: "ORD-2044",
    group: "Standard",
    checkedIn: false,
    gate: "Gate 2",
  },
  {
    id: "AT-905",
    name: "Nikhil Rao",
    email: "nikhil.rao@example.com",
    eventId: "ep-001",
    ticket: "Premium Front Row",
    ticketCode: "FKG-1003",
    orderId: "ORD-2045",
    group: "Press",
    checkedIn: true,
    gate: "VIP & Press",
  },
  {
    id: "AT-906",
    name: "Ishita Bose",
    email: "ishita.bose@example.com",
    eventId: "ep-016",
    ticket: "Grand Finale 2-Day Concert Pass",
    ticketCode: "FKG-4001",
    orderId: "ORD-2047",
    group: "VIP buyer",
    checkedIn: false,
    gate: "VIP & Press",
  },
];

export const promos: PromoData[] = [
  {
    id: "PR-01",
    code: "FAMEFIRST",
    discount: "25%",
    eventId: "ep-001",
    usage: 820,
    limit: 1000,
    status: "Active",
    ends: "Nov 30, 2026",
  },
  {
    id: "PR-02",
    code: "SEASON500",
    discount: "₹500",
    eventId: "ep-016",
    usage: 115,
    limit: 250,
    status: "Scheduled",
    ends: "Dec 15, 2026",
  },
  {
    id: "PR-03",
    code: "CAMPUS10",
    discount: "10%",
    eventId: "ep-004",
    usage: 342,
    limit: 400,
    status: "Expired",
    ends: "Oct 31, 2026",
  },
];

export const payouts: PayoutData[] = [
  {
    id: "PO-2031",
    eventId: "ep-004",
    amount: 240000,
    fee: 9600,
    status: "Paid",
    date: "Nov 5, 2026",
    method: "Bank transfer",
  },
  {
    id: "PO-2032",
    eventId: "ep-001",
    amount: 470000,
    fee: 18800,
    status: "Pending",
    date: "Nov 22, 2026",
    method: "UPI",
  },
  {
    id: "PO-2033",
    eventId: "ep-002",
    amount: 435000,
    fee: 17400,
    status: "Pending",
    date: "Nov 24, 2026",
    method: "NEFT",
  },
  {
    id: "PO-2034",
    eventId: "ep-003",
    amount: 320000,
    fee: 12800,
    status: "Failed",
    date: "Nov 10, 2026",
    method: "Bank transfer",
  },
];

export const salesSeries = [
  120000, 180000, 160000, 220000, 260000, 240000, 310000, 340000, 320000, 390000, 430000, 470000,
];

export const gateSeries = [
  { gate: "Gate 1", value: 84 },
  { gate: "Gate 2", value: 67 },
  { gate: "Contestant Entry", value: 52 },
  { gate: "VIP & Press", value: 39 },
];

export const channelSeries = [
  { channel: "Website", value: 58 },
  { channel: "Instagram", value: 18 },
  { channel: "WhatsApp", value: 16 },
  { channel: "Box Office", value: 8 },
];

export const notifications: NotificationData[] = [
  {
    id: "nt-001",
    title: "Registration full",
    body: "All 360 contestant slots for Season 1 are now filled.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "nt-002",
    title: "Episode 1 passes selling fast",
    body: "Audition Audience Passes for Episode 1 are 78% sold.",
    time: "18 min ago",
    unread: true,
  },
  {
    id: "nt-003",
    title: "Refund processed",
    body: "ORD-2045 (Premium Front Row) was moved to refunded.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: "nt-004",
    title: "Payout queued",
    body: "Episode 1 settlement is queued for Nov 22.",
    time: "2 hours ago",
    unread: false,
  },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) => new Intl.NumberFormat("en-IN").format(value);

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
