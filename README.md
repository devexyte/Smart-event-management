# EventFlow — Smart Event Management Platform 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

> **EventFlow** is a unified, hackathon-ready Smart Event Management Platform designed for large-scale hackathons, technical conferences, and innovation challenges. Built around **TechNova 2026** (Mumbai, India), EventFlow consolidates registration, digital QR check-in, intelligent teammate matchmaking, project submissions, structured rubric judging, and live dynamic leaderboards into a single synchronized operating system.

---

## 🌟 The Core Problem & Solution

Traditional hackathons suffer from fragmented tooling: organizers juggle Google Forms for registrations, spreadsheets for check-ins, Discord/Slack for team finding, external portals for submissions, and disconnected grading sheets for judges.

**EventFlow solves this with a unified workflow:**
```
Register ➔ Check In (QR) ➔ Form Teams (AI Matchmaker) ➔ Broadcasts ➔ Submit Project ➔ Judge (Rubric) ➔ Live Leaderboard ➔ Real-time Analytics
```

---

## 🎭 Three Unified Experiences (Role-Switchable)

The platform provides 3 distinct role experiences powered by a shared reactive state engine:

### 1. 🧑‍💻 Participant Experience
* **Digital Pass & QR Badge**: Unique cryptographic QR code token (`TN26-P001-...`) with instant check-in verification status.
* **Smart Teammate Matchmaker**: Match compatibility score algorithm (0–100%) calculating skill complementarities, track alignment, and role needs (e.g. AI Engineer looking for UI/UX Designer).
* **Team Hub**: Roster management, leadership badges, open slot invites, and submission status preview.
* **Project Submission Portal**: Complete project intake form with problem statement, architecture notes, tech stack chips, GitHub repository, live demo, video pitch, and presentation slides.
* **Live Broadcast Feed**: Priority-coded announcements (`critical`, `high`, `normal`) with instant visual indicators for venue changes and schedule milestones.

### 2. ⚖️ Judge Portal
* **Assigned Submissions Queue**: Filterable submission view by assigned track with live status chips (`Pending` / `Scored`).
* **Interactive Scoring Studio**: 5-part normalized rubric totaling 100 points:
  1. **Innovation & Novelty** (/20)
  2. **Technical Implementation & Architecture** (/25)
  3. **Problem & Domain Relevance** (/20)
  4. **User Experience & Interface Ergonomics** (/15)
  5. **Impact & Commercial Viability** (/20)
* **Instant Recalculation**: Submitting an evaluation immediately recalculates team aggregate scores, shifts live leaderboard ranks, and logs directly into the organizer command stream.
* **Judging Progress Matrix**: Real-time cross-grid of all judges vs projects.

### 3. 🛡️ Organizer Command Center
* **8-Metric Command HQ**: Total registrations, checked-in attendees, attendance velocity %, formed teams, submissions count, active judges, judging progress %, and average score.
* **Attendee & QR Check-In Station**: Searchable attendee roster with 1-click check-in and an **Interactive QR Scanner Simulator** with camera viewfinder and audio feedback.
* **Broadcast Center**: Dispatch priority broadcasts (`critical`, `high`, `normal`) with target categories.
* **Deep Analytics Suite**: Visual charts powered by Recharts (Hourly Attendance Velocity, Track Breakdown Donut, Participant Skill Distribution, Judge Score Histogram).
* **Live Leaderboard & Ceremonies**: Top 3 podium (Gold/Silver/Bronze), rank movement indicators (▲ / ▼), CSV data export, and "Finalize & Reveal Winners" celebratory confetti cannon!

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Glassmorphism and dark modern SaaS aesthetic
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Analytics**: [Recharts](https://recharts.org/)
- **QR Code Engine**: `qrcode.react` (High-definition SVG)
- **Effects & Audio**: `canvas-confetti` + Synthesized Web Audio API chimes
- **State Management**: Centralized React Context with LocalStorage sync & pristine demo reset

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/devexyte/Smart-event-management.git
cd Smart-event-management

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000 (Landing Page)
# http://localhost:3000/dashboard (Interactive Platform)
```

### Production Build
```bash
# Verify typecheck and production build
npm run build

# Start production server
npm start
```

---

## ☁️ Deployment to Vercel

The application is zero-config and optimized for immediate deployment to Vercel:

1. Push your code to your GitHub repository.
2. Import the repository on [Vercel](https://vercel.com/new).
3. Framework Preset: **Next.js**.
4. Click **Deploy**. (No external environment variables or databases required for the core demo).

---

## 🏆 Demo Event Context: TechNova 2026

* **Event**: TechNova 2026 — National Hackathon & Technology Summit
* **Location**: Jio World Convention Centre, Mumbai, India
* **Dates**: August 29–30, 2026
* **Tracks**:
  1. *AI & Intelligent Systems*
  2. *Web3 & Fintech*
  3. *Healthcare & Biotech*
  4. *Sustainable Tech*
* **Prize Bounty**: ₹25,00,000 (~$30,000 USD)

---

## 📄 License

MIT License © 2026 EventFlow Team.
