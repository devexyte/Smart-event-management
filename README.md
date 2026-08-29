# EventFlow — Smart Event Management Platform 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

# EventFlow — Smart Event Management Platform

> **One unified workspace for registration, check-in, team formation, announcements, submissions, judging, and live event intelligence.**

EventFlow is a Smart Event Management Platform designed to simplify the management of large-scale hackathons, technical conferences, tech summits, and innovation challenges.

The platform brings the complete event lifecycle into a single interactive experience for **Participants, Judges, and Organizers**, replacing fragmented workflows with one connected event workspace.

The prototype is demonstrated through **TechNova 2026**, a fictional technology event based in Mumbai, India, taking place on **August 29–30, 2026**.

---

## 1. Challenge / Problem

Large-scale events often require organizers and participants to use multiple disconnected tools for:

* Registration
* Attendee verification
* QR-based check-in
* Team formation
* Event announcements
* Project submissions
* Judging
* Score management
* Leaderboards
* Attendance tracking
* Analytics

This fragmented workflow increases administrative overhead and makes it difficult for participants, judges, and organizers to maintain a consistent view of the event.

EventFlow addresses this problem by connecting these activities through a single shared event state.

---

## 2. Chosen Challenge Vertical

### Smart Event Management

EventFlow focuses on the event-management persona and the operational challenges involved in running hackathons, technical events, conferences, and innovation competitions.

The platform is designed around three primary users:

### Participant

Needs to:

* Complete registration
* Access a digital QR pass
* Check in to the event
* Find compatible teammates
* Manage a team
* Submit a project
* Receive announcements
* Monitor the leaderboard

### Judge

Needs to:

* View assigned submissions
* Review project information
* Evaluate projects against a structured rubric
* Provide qualitative feedback
* Track judging progress
* Submit scores consistently

### Organizer

Needs to:

* Monitor registrations and attendance
* Verify participants
* Manage teams and submissions
* Broadcast announcements
* Monitor judging progress
* Analyze event activity
* Track the leaderboard
* Finalize winners

---

# 3. Solution Overview

EventFlow provides a role-based event workspace where all three personas interact with the same event data.

```text
                         TECHNOVA 2026
                               │
                    Shared EventContext
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
     PARTICIPANT             JUDGE              ORGANIZER
          │                    │                    │
     Registration        Submissions          Attendance
     QR Pass             Rubric Scoring       Check-in
     Team Matching       Feedback             Teams
     Team Hub            Judging Progress     Submissions
     Submission                              Announcements
     Announcements                            Analytics
     Leaderboard                              Leaderboard
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ▼
                    LIVE EVENT STATE
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
              Leaderboard             Analytics
              & Rankings             & Activity
```

The important design principle is **cross-module propagation**.

An action performed in one role can immediately affect other parts of the application.

For example:

```text
Organizer checks in participant
            ↓
Attendance state changes
            ↓
Attendance percentage updates
            ↓
Participant status changes
            ↓
Activity feed records the action
            ↓
Toast notification appears
```

Similarly:

```text
Judge submits evaluation
            ↓
Evaluation is stored
            ↓
Team aggregate score recalculates
            ↓
Leaderboard ranking changes
            ↓
Organizer judging statistics update
            ↓
Activity feed records the evaluation
```

---

# 4. Core Features

## 4.1 Registration & Digital QR Check-in

Participants receive a digital event pass containing their profile information and a unique event identifier.

The prototype includes:

* Digital participant pass
* QR code generation
* Check-in status
* Verification state
* Organizer attendee list
* One-click check-in
* QR scanner simulator
* Attendance statistics
* Check-in activity logging

The QR scanner is implemented as an interactive prototype simulator rather than a production camera-based verification service.

---

# 4.2 Smart Team Matchmaking

EventFlow includes a matchmaking system to help individual participants discover suitable teammates.

The matching system uses a transparent heuristic compatibility model based on factors such as:

* Skills
* Desired roles
* Event track
* Availability
* Project interests
* Complementary capabilities

Participants receive a compatibility score from **0–100%** and can filter potential teammates.

Available interactions include:

* Search
* Skill filtering
* Role filtering
* Track filtering
* Availability filtering
* Send request
* Accept request
* Invite to team
* Connection status updates

### Decision Logic

The system prioritizes participants who can complement the current participant's skill or role requirements rather than simply matching identical profiles.

This makes the matchmaking feature useful for hackathon-style team formation where balanced skill sets are important.

---

# 4.3 Team Hub

The Team Hub provides a shared space for team formation and project preparation.

It includes:

* Team identity
* Team members
* Leader information
* Open roles
* Invitations
* Team status
* Linked project submission

---

# 4.4 Project Submission Portal

Participants can prepare and submit their project through a structured submission workflow.

The submission form supports:

* Project title
* Tagline
* Problem statement
* Solution / architecture
* Technology stack
* GitHub repository
* Live demo
* Video pitch
* Presentation slides

Submissions support states such as:

```text
Draft
  ↓
Submitted
  ↓
Under Review
  ↓
Evaluated
```

---

# 4.5 Broadcast & Announcement Center

Organizers can publish event announcements that immediately appear in participant feeds.

Announcements support:

* Priority levels

  * Critical
  * High
  * Normal
* Categories

  * Venue
  * Schedule
  * Submission
  * General
* Timestamp
* Read status
* Pinned notices

Example:

```text
Organizer
   ↓
"Venue Change: Main Auditorium — Stage B"
   ↓
Announcement state updated
   ↓
Participant announcement feed
   ↓
Critical alert displayed
```

This demonstrates the real-time communication workflow required during large events.

---

# 4.6 Interactive Judging Portal

Judges receive an assigned submission queue and can evaluate projects through a structured scoring interface.

The evaluation rubric totals **100 points**:

| Criterion                               | Maximum |
| --------------------------------------- | ------: |
| Innovation & Novelty                    |      20 |
| Technical Implementation & Architecture |      25 |
| Problem & Domain Relevance              |      20 |
| User Experience & Ergonomics            |      15 |
| Impact & Commercial Viability           |      20 |
| **Total**                               | **100** |

The scoring interface provides:

* Individual criterion scoring
* Automatic total calculation
* Qualitative feedback
* Strength highlights
* Improvement recommendations
* Submission evaluation status
* Judging progress tracking

When an evaluation is submitted, the prototype propagates the new score through the shared event state.

---

# 4.7 Live Leaderboard

The leaderboard dynamically derives rankings from aggregate evaluation scores.

It includes:

* Current rank
* Team name
* Aggregate score
* Rank changes
* Track filtering
* Top-three podium
* Winner finalization

When a judge submits a score, the leaderboard is recalculated so that the resulting ranking can be observed immediately.

---

# 4.8 Organizer Command Center

The Organizer Command Center acts as the operational control room for the event.

It provides visibility into:

* Total registrations
* Checked-in participants
* Attendance rate
* Teams
* Submissions
* Active judges
* Judging progress
* Average score
* Broadcast activity
* Live event activity

---

# 4.9 Analytics

The Organizer dashboard includes visual analytics powered by Recharts.

The prototype provides visualizations for:

* Hourly attendance velocity
* Track distribution
* Submission progress
* Participant skill distribution
* Judge scoring distribution

These views help organizers understand the event without manually combining information from separate systems.

---

# 5. Multi-Role User Flow

## Participant Flow

```text
Registration
     ↓
Digital QR Pass
     ↓
Event Check-in
     ↓
Find Teammates
     ↓
Form Team
     ↓
Build Submission
     ↓
Submit Project
     ↓
Receive Announcements
     ↓
Track Leaderboard
```

## Judge Flow

```text
Judge Dashboard
     ↓
Assigned Submissions
     ↓
Review Project
     ↓
Open Rubric
     ↓
Score Criteria
     ↓
Add Feedback
     ↓
Submit Evaluation
     ↓
Leaderboard Updated
```

## Organizer Flow

```text
Command Center
     ↓
Monitor Registration
     ↓
Verify Check-ins
     ↓
Manage Teams
     ↓
Monitor Submissions
     ↓
Broadcast Announcements
     ↓
Monitor Judging
     ↓
Analyze Event Data
     ↓
Finalize Winners
```

---

# 6. Smart / Dynamic Logic

The prototype is designed around shared state rather than isolated static pages.

A centralized `EventContext` manages the event data used across the three role experiences.

The state contains models for:

* Participants
* Teams
* Submissions
* Evaluations
* Announcements
* Activity logs

The prototype uses `localStorage` persistence so that interactions can survive page refreshes during a demonstration.

Initial realistic demo data is provided for TechNova 2026 so the application can be demonstrated immediately without manually creating an entire event.

---

# 7. Cross-Module State Propagation

One of the key capabilities of EventFlow is that actions are connected across modules.

### Check-in Example

```text
Participant
     │
     │ Check-in
     ▼
Organizer Station
     │
     ▼
Shared Event State
     │
     ├── Attendance count updated
     ├── Attendance percentage updated
     ├── Participant status updated
     ├── Activity feed updated
     └── Notification triggered
```

### Judging Example

```text
Judge
     │
     │ Submit evaluation
     ▼
Shared Event State
     │
     ├── Evaluation recorded
     ├── Aggregate score recalculated
     ├── Team rank recalculated
     ├── Leaderboard updated
     ├── Organizer statistics updated
     └── Activity feed updated
```

### Announcement Example

```text
Organizer
     │
     │ Publish announcement
     ▼
Shared Event State
     │
     ▼
Participant Feed
     │
     └── Priority announcement appears
```

This shared-state model allows the prototype to demonstrate the experience of a real-time event platform without requiring a production backend.

---

# 8. Technology Stack

| Technology      | Purpose                   |
| --------------- | ------------------------- |
| Next.js         | Application framework     |
| React           | Interactive UI            |
| TypeScript      | Type safety               |
| Tailwind CSS    | Styling and responsive UI |
| Lucide React    | Interface icons           |
| Recharts        | Analytics visualizations  |
| qrcode.react    | QR code generation        |
| canvas-confetti | Winner celebration effect |
| localStorage    | Prototype persistence     |

### Architecture

The application follows a component-oriented structure:

```text
src/
├── app/
│   ├── dashboard/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── judge/
│   ├── organizer/
│   ├── participant/
│   └── ui/
│
├── context/
│   └── EventContext.tsx
│
├── lib/
│   ├── demoData.ts
│   └── utils.ts
│
└── types/
    └── index.ts
```

This separation keeps role-specific interfaces, shared components, data models, and application state organized independently.

---

# 9. Demo Persona / Role Switching

The prototype includes a role switcher that allows the demonstrator to move between:

```text
Participant
Judge
Organizer
```

without requiring a full authentication system.

This is intentional for the prototype because it allows evaluators to quickly experience the complete event lifecycle.

The role switcher is a **demo mechanism**, not intended to represent production-grade authentication or authorization.

---

# 10. Demo Reset

The application includes a demo reset mechanism that restores the initial TechNova 2026 state.

This allows the complete workflow to be demonstrated repeatedly without manually reversing previous interactions.

---

# 11. Design Approach

EventFlow follows a modern event-operations dashboard approach rather than presenting each requirement as a disconnected page.

The interface emphasizes:

* Clear role separation
* Information hierarchy
* Action-oriented dashboards
* Responsive layouts
* Consistent status indicators
* Live activity feedback
* Data visualization
* Minimal navigation friction
* Accessible interactive controls

The objective is to make important event information understandable at a glance while keeping deeper operations available when required.

---

# 12. Assumptions & Prototype Limitations

EventFlow is an interactive prototype rather than a production event-management backend.

The following assumptions were made to keep the prototype focused and deployable:

### Data Persistence

The prototype uses browser `localStorage` rather than a remote database.

### Authentication

Role switching is used instead of production authentication to make all three personas immediately demonstrable.

### QR Verification

The QR scanner is represented by an interactive scanner simulator. A production implementation would connect the scanner to a secure participant verification service.

### Real-Time Infrastructure

The prototype demonstrates real-time-like cross-module updates through centralized reactive state. A production system would use a backend and technologies such as WebSockets or server-sent events for multi-user synchronization.

### Security

Production deployment would require:

* Authenticated accounts
* Server-side authorization
* Secure session management
* Server-side input validation
* Protected judge scoring
* Database security
* Audit logging
* Rate limiting
* Secure QR verification

These are outside the scope of this prototype.

---

# 13. Testing & Verification

The application was validated through production build and interactive workflow testing.

### Production Build

```bash
npm run build
```

Result:

```text
✓ Compiled successfully
✓ TypeScript check passed
✓ Static page generation completed
✓ 0 build errors
✓ 0 build warnings
```

The verified application routes include:

```text
/
 /dashboard
```

### Local Development

```bash
npm install
npm run dev
```

The application was verified locally at:

```text
http://localhost:3000
```

### Interactive Workflow Checks

The following workflows were designed and tested as part of the prototype:

* Participant → Organizer check-in synchronization
* QR pass and verification state
* Team matchmaking interactions
* Team invitations
* Project submission
* Judge rubric scoring
* Aggregate score calculation
* Leaderboard updates
* Organizer analytics
* Announcement broadcasting
* Role switching
* Demo reset
* Winner celebration

---

# 14. Running Locally

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 15. Production Build

To verify the production build:

```bash
npm run build
```

To start the production server locally:

```bash
npm run start
```

---

# 16. Deployment

EventFlow is designed to be deployed on Vercel.

Deployment flow:

```text
GitHub Repository
       ↓
Vercel
       ↓
Install Dependencies
       ↓
Next.js Production Build
       ↓
Live EventFlow Application
```

The current prototype does not require external database credentials or API keys.

---

# 17. Why EventFlow?

Traditional event management often looks like:

```text
Registration Tool
       +
Spreadsheet
       +
Messaging Platform
       +
Team Finder
       +
Submission Form
       +
Judging System
       +
Leaderboard
       +
Analytics
```

EventFlow brings these workflows together:

```text
                    EVENTFLOW
                        │
          ┌─────────────┼─────────────┐
          │             │             │
     PARTICIPANT       JUDGE       ORGANIZER
          │             │             │
       Register      Evaluate      Monitor
       Check-in      Score         Check-in
       Match         Feedback      Teams
       Submit        Progress      Broadcast
       Announce                    Analytics
       Rank                        Results
          │             │             │
          └─────────────┼─────────────┘
                        │
                 SHARED EVENT STATE
                        │
                 LIVE RANKINGS
                 & ANALYTICS
```

The result is a single event workspace designed to reduce operational fragmentation and provide a better experience for everyone involved.

---

# 18. Future Scope

A production version of EventFlow could extend the prototype with:

* Secure authentication and role-based authorization
* PostgreSQL or other persistent database
* Real multi-user synchronization
* WebSocket-based live updates
* Production QR scanner using device cameras
* Email/SMS/push notifications
* Advanced participant recommendation models
* Automated judge assignment
* Audit logs
* Event creation and configuration
* Multiple simultaneous events
* Cloud file storage for submissions
* Advanced reporting and export capabilities

These features were intentionally kept outside the prototype to focus on demonstrating the complete core event lifecycle.

---

## Project Status

**EventFlow is an interactive prototype demonstrating the complete smart event-management lifecycle for TechNova 2026.**

### Core workflow demonstrated

**Register → Check In → Form Teams → Submit → Judge → Rank**

The project focuses on practical usability, contextual decision-making, connected workflows, maintainable component architecture, and a clear multi-role experience.
