# CampusFlow — Smart Collegiate Event Management Platform 🎓

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Institution](https://img.shields.io/badge/Institution-Ramnarain_Ruia_Autonomous_College-blue.svg?style=flat-square)](https://www.ruiacollege.edu/)
[![Accreditation](https://img.shields.io/badge/NAAC-A%2B_Grade_(3.70_CGPA)-emerald.svg?style=flat-square)](https://www.ruiacollege.edu/)

> **Official Smart Event Management & Campus Engagement Portal for Ramnarain Ruia Autonomous College, Matunga (East), Mumbai.**
> A unified platform supporting the complete lifecycle of campus events: from cultural festivals (**Aarohan**) and national hackathons (**TechNova**) to academic symposiums, hands-on lab bootcamps, and inter-collegiate competitions.

---

## 🏛️ Institutional Profile

* **Institution**: S.P. Mandali's Ramnarain Ruia Autonomous College
* **Location**: L. N. Road, Matunga (East), Mumbai 400 019, Maharashtra, India
* **Affiliation & Status**: Autonomous College affiliated with University of Mumbai
* **Accreditation**: NAAC 'A+' Grade with 3.70 CGPA, Star College Status (DBT), College of Excellence (UGC)
* **Leadership**: Dr. Anushree Lokur (Principal), Prof. Rajesh Nair (Academic Administration & Registrar)
* **Domain**: `@ruiacollege.edu`

---

## 🚀 Key User Roles & Workspaces

The platform provides dedicated workspaces for the three core collegiate stakeholder groups:

### 1. 🎓 Student Experience Portal
* **Explore Event Catalogue (FR7)**: Browse upcoming technical hackathons, cultural festivals, seminars, and sports tournaments with real-time keyword search, category filters, and capacity meters.
* **Instant Registration (FR8, FR22)**: Register for events in one click with automated capacity checks, duplicate registration prevention, and deadline enforcement.
* **Digital QR Gate Passes (FR15)**: View and print verifiable high-resolution QR entrance tickets (`RUIA26-EVT...`) for on-site access.
* **Registration & Status Tracking (FR9, FR10)**: Monitor registrations, view payment receipts, or cancel with automatic refund processing.
* **Campus Event Agenda (FR11)**: Interactive calendar timeline displaying dates, session tracks, rooms, and speaker schedules.
* **Verified Digital Certificates (FR17)**: Earn official certificates of participation with verifiable cryptographic reference codes issued under Principal Dr. Anushree Lokur.
* **Post-Event Feedback (FR18)**: Submit 5-star ratings and reviews evaluating content, venue facilities, and event coordination.
* **Bookmarks & Favorites (FR19)**: Save events to a personalized wishlist for quick access.

### 2. 📋 Organizer Operations Suite
* **Operations Hub**: Real-time KPI dashboard tracking total registrations, attendance check-in percentages, and active venue utilization.
* **Event Creation & Agenda Builder (FR3, FR24)**: Draft events with dates, category tags, campus venues, seat quotas, ticket pricing (Free/Paid), and chronological session itineraries.
* **High-Speed QR Check-In Console (FR16)**: On-site attendance desk supporting barcode scanner input or manual pass tokens with audio chimes and duplicate entry prevention.
* **Crew & Volunteer Management (FR20)**: Assign student volunteers to operational posts (Registration Gate, Tech Support, AV, Logistics).
* **Live Broadcast & Notification Center (FR14)**: Broadcast high-priority room relocations, schedule delays, and emergency alerts to student dashboards.
* **Report Hub & CSV Exports (FR23)**: Generate and download authentic browser CSV reports for Attendee Rosters, Gate Check-In Sheets, Feedback Summaries, and Certificate Issuance Logs.

### 3. 🏛️ Principal & Administrative Oversight
* **Dean & Principal Executive Dashboard**: Campus-wide metrics, capacity utilization stats, and active participant engagement graphs.
* **Event Approvals Queue (FR4)**: Review event proposals submitted by student clubs and departments; approve to publish instantly to the student catalogue or reject with mandatory revision notes.
* **Master Categories & Venue Registry (FR21)**: Manage campus infrastructure (Ruia College Auditorium, Dr. S. Radhakrishnan Hall, CS & IT Lab 4, Ruia Quadrangle, DDU Kaushal Kendra, Gymkhana).
* **User & Role Administration (FR25)**: Search students, organizers, and faculty; modify accounts, and toggle user roles dynamically.
* **Institutional Audit Trail**: Chronological event logs tracking registrations, check-ins, approvals, and administrative actions.

---

## 📋 Complete Functional Requirements Matrix (FR1 – FR26)

| Req ID | Functional Requirement | Implementation Component |
|---|---|---|
| **FR1** | **User Authentication** | Built-in persona switcher with credentials for Students, Organizers, and Admins |
| **FR2** | **Role-Based Access Control** | Dynamic workspace routing (`student`, `organizer`, `admin`) via `EventContext` |
| **FR3** | **Event Creation** | `EventCreationModal.tsx` with venue assignment, seat quotas, and agenda schedule |
| **FR4** | **Event Approval / Rejection** | `EventApprovalsQueue.tsx` with approval workflows and rejection feedback reasons |
| **FR5** | **Event Modification** | Edit dialog with automatic notification broadcasts to registered attendees |
| **FR6** | **Event Deletion / Archiving** | Safe deletion for drafts; soft archiving for completed events |
| **FR7** | **Event Listing, Search & Filter** | `EventCatalogue.tsx` with instant keyword search, category, venue, and fee filters |
| **FR8** | **Event Registration** | Registration modal with capacity quota checks and duplicate prevention |
| **FR9** | **Registration Status Tracking** | `MyRegistrations.tsx` displaying status (`Confirmed`, `Completed`, `Cancelled`) |
| **FR10** | **Registration Cancellation & Refund** | Cancellation workflow with refund status tracking (`Free`, `Paid`, `Refunded`) |
| **FR11** | **Calendar & Schedule Timeline** | `EventCalendarView.tsx` with daily schedule breakdown, rooms, and speakers |
| **FR12** | **Notifications & Reminders** | Notification bell dropdown with unread badge counters and timestamps |
| **FR13** | **Organizer Contact Channel** | `EventDetailModal.tsx` with official email, phone, and direct query dispatch form |
| **FR14** | **Live Updates & Announcements** | `BroadcastCenter.tsx` for urgent alerts and room relocation dispatches |
| **FR15** | **QR Pass Generation** | `QRCodePassModal.tsx` rendering SVG QR tickets with attendee metadata |
| **FR16** | **QR Validation & Attendance** | `AttendeeCheckInStation.tsx` with live barcode/token scanning and sound chimes |
| **FR17** | **Digital Certificate Generation** | `CertificateModal.tsx` & `MyCertificatesView.tsx` with verification IDs and print PDF |
| **FR18** | **Post-Event Feedback & Rating** | `FeedbackModal.tsx` multi-criteria 5-star rating system |
| **FR19** | **Bookmark / Favourite Events** | One-click bookmark toggle saved to personal student favorites list |
| **FR20** | **Volunteer Assignment** | `VolunteerManagement.tsx` assigning students to event duties and roles |
| **FR21** | **Category & Venue Management** | `CategoryVenueManager.tsx` managing campus venues and category classifications |
| **FR22** | **Payment Status Tracking** | Payment gateway simulation (`Paid`, `Free`, `Refunded`) with transaction hashes |
| **FR23** | **Report Generation & CSV Exports** | `EventReportsModal.tsx` generating browser-side downloadable CSV rosters |
| **FR24** | **Event Lifecycle Management** | Strict state progression: `draft` $\rightarrow$ `pending_approval` $\rightarrow$ `published` $\rightarrow$ `completed` $\rightarrow$ `archived` |
| **FR25** | **User Account Administration** | `UserAccountManager.tsx` role promotions, user search, and status controls |
| **FR26** | **Dashboard Statistics & Metrics** | Real-time analytics cards across student, organizer, and admin portals |

---

## 🏟️ Authentic Campus Venues

| Venue | Campus Location | Capacity | Key Facilities |
|---|---|---|---|
| **Ruia College Auditorium** | Heritage Main Building, Ground Floor | 600 | Stage Acoustics, Dual Laser Projectors, Central AC, Green Rooms |
| **Dr. S. Radhakrishnan Seminar Hall** | Main Academic Building, 1st Floor | 200 | Smart Podium, Livestream Rig, High-Speed Wi-Fi, Interactive Screen |
| **Computer Science & IT Lab 4** | Science Wing, 3rd Floor | 100 | 100 High-Performance Workstations, Gigabit LAN, Central UPS |
| **Historic Ruia Quadrangle & Open Stage** | Campus Central Quadrangle | 1,500 | Open-Air Stage, Concert PA Console, Floodlighting |
| **DDU Kaushal Kendra & Bio-analytical Lab** | Vocational Block, 2nd Floor | 60 | Bio-Analytical Instruments, Prototyping Workstations, Smart Board |
| **Ruia Sports Academy & Gymkhana** | Gymkhana Complex | 250 | Indoor Badminton & TT Courts, Chess Arena, Stage Sound System |

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (Turbopack App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a bespoke slate palette
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
* **Icons**: [Lucide React](https://lucide.dev/)
* **QR Codes**: [qrcode.react](https://github.com/zpao/qrcode.react)
* **Animations & Effects**: [canvas-confetti](https://github.com/catdad/canvas-confetti) & native Web Audio API chimes

---

## 💻 Running the Project Locally

### Prerequisites
* **Node.js**: v18.18+ or v20.x+ (v20+ recommended)
* **Package Manager**: `npm` (included with Node.js)

### Installation & Execution
```bash
# 1. Clone the repository
git clone https://github.com/devexyte/Smart-event-management.git
cd Smart-event-management

# 2. Install dependencies
npm install

# 3. Start the Next.js development server
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`** to view the application.

### Building for Production
```bash
npm run build
npm run start
```

---

## ☁️ Vercel Deployment Instructions

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```
2. In your [Vercel Dashboard](https://vercel.com/dashboard):
   * Click **Add New...** $\rightarrow$ **Project**
   * Import the **`Smart-event-management`** repository
   * Framework Preset: **Next.js**
   * Root Directory: `./`
   * Click **Deploy**
3. **Note on Production Branch**: Ensure **Settings** $\rightarrow$ **Git** $\rightarrow$ **Production Branch** is set to **`main`** so every push to `main` deploys automatically to your primary production domain.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
