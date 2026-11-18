<div align="center">

<img src="public/logo-bg-light.svg" alt="Fame Ka Game Logo" width="400" />

### The Modern Event Ticketing Dashboard

A sleek, fully-featured admin dashboard for managing events, tickets, orders, and payouts — built with Next.js, HeroUI, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://tixora.vercel.app) · [Report Bug](https://github.com/akajdid-mostafa/tixora/issues) · [Request Feature](https://github.com/akajdid-mostafa/tixora/issues)

</div>

---

## About

**Fame Ka Game** is a comprehensive event ticketing management dashboard designed for event organizers, promoters, and venue operators. It provides a complete admin interface to manage the full lifecycle of ticketed events — from creation and promotion to check-in and payout reconciliation.

Built as a modern single-page application with a polished UI, dark/light theme support, and responsive design, Fame Ka Game serves as a production-ready template or a starting point for building real ticketing platforms.

---

## Features

### Dashboard
- Real-time key metrics: gross revenue, tickets sold, managed events, payout queue
- Monthly sales momentum chart (custom SVG — no external charting library)
- Featured event spotlight with revenue, capacity, and gate readiness
- Recent orders feed and sales channel attribution

### Event Management
- Create, edit, and delete events with a sleek drawer and modal UI
- Track revenue, tickets sold, check-in %, and capacity per event
- Filter by category and status

### Order Management
- Searchable and filterable order table
- Status filters: Paid, Pending, Refunded, Failed
- Resend confirmation emails and process refunds

### Check-In & Gate Operations
- QR code scanner interface (simulated ticket validation)
- Real-time ticket validation with success/warning/error feedback
- Event-scoped check-in with metrics: expected, checked-in, pending
- Gate load distribution display

### Promo Code Campaigns
- Create and manage discount codes with event targeting, discount %, usage limits, and expiration
- Copy codes to clipboard, toggle active/expired status
- Usage progress tracking per promo

### Payouts & Finance
- Pending payout, paid out, and total fees metrics
- Filterable payout table by event, status, and search

### Reports & Analytics
- Revenue breakdown by event with visual progress bars
- Ticket mix analysis and operational health metrics
- Filter by category, event status, and ticket status
- Export to PDF/CSV (UI ready)

### Notifications
- Operational alert inbox (payouts, ticket quotas, refunds, gate spikes)
- Unread/resolved counts with mark-all-as-read

### Profile & Settings
- User profile with workspace details, role, and billing info
- Security and session management UI

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router + Turbopack) |
| **UI Library** | [React 19](https://react.dev) |
| **Language** | [TypeScript 5](https://typescriptlang.org) |
| **Component Library** | [HeroUI](https://heroui.com) |
| **Icons** | [Gravity UI Icons](https://gravity-ui.com/icons) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **Color System** | OKLCH CSS custom properties |
| **Fonts** | Inter (via `next/font`) |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/akajdid-mostafa/tixora.git
cd tixora

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app automatically redirects to the dashboard.

### Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
tixora/
├── app/
│   ├── globals.css                 # Global styles, theme variables (light/dark)
│   ├── page.tsx                    # Root redirect to /dashboard
│   └── (dashboard)/                # Route group sharing DashboardShell layout
│       ├── layout.tsx              # Dashboard shell wrapper
│       ├── dashboard/page.tsx      # Main control center
│       ├── events/page.tsx         # Event CRUD management
│       ├── orders/page.tsx         # Order table & management
│       ├── check-in/page.tsx       # QR scanner & check-in
│       ├── promos/page.tsx         # Promo code campaigns
│       ├── payouts/page.tsx        # Finance & payout tracking
│       ├── reports/page.tsx        # Analytics & reports
│       ├── notifications/page.tsx  # Alert inbox
│       └── profile/page.tsx        # User profile
├── components/
│   ├── dashboard-shell.tsx         # App shell: sidebar, header, dark mode toggle
│   ├── sales-chart.tsx             # Custom SVG area/line chart
│   ├── create-event-drawer.tsx     # Slide-in event creation form
│   ├── metric-card.tsx             # KPI display card
│   ├── status-chip.tsx             # Color-coded status badge
│   ├── notifications-popover.tsx   # Bell icon popover
│   ├── profile-popover.tsx         # Avatar dropdown menu
│   └── ...                         # Additional shared components
├── lib/
│   └── fame-ka-game-data.ts       # Mock data + helper functions
├── public/
│   ├── logo-bg-dark.svg           # Dark theme logo
│   └── logo-bg-light.svg          # Light theme logo
└── package.json
```

---

## Design Highlights

- **Light/Dark Theme** — Full theme system using OKLCH color space CSS custom properties
- **Custom SVG Charts** — Hand-built area/line charts with zero external charting dependencies
- **Compound Components** — Flexible `ItemCard` pattern for reusable list item layouts
- **Responsive Design** — Desktop sidebar with mobile hamburger drawer; responsive grids throughout
- **Interactive CRUD** — Working create/edit/delete operations with real-time React state updates

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Author

**Mostafa Akajdid**

[![GitHub](https://img.shields.io/badge/GitHub-akajdid--mostafa-181717?logo=github)](https://github.com/akajdid-mostafa)
[![Portfolio](https://img.shields.io/badge/Portfolio-akajdidm.vercel.app-06B6D4)](https://akajdidm.vercel.app/)

Full-Stack Developer specializing in **React, Next.js, TypeScript, Node.js, and Spring Boot**.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
