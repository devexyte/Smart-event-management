'use client';

import React, { useState, useEffect } from 'react';
import { useEvent } from '@/context/EventContext';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';

// Student Modules (FR7, FR8, FR9, FR10, FR11, FR15, FR17, FR18, FR19)
import { EventCatalogue } from '@/components/student/EventCatalogue';
import { MyRegistrations } from '@/components/student/MyRegistrations';
import { EventCalendarView } from '@/components/student/EventCalendarView';
import { BookmarkedEventsView } from '@/components/student/BookmarkedEventsView';
import { MyCertificatesView } from '@/components/student/MyCertificatesView';
import { EventDetailModal } from '@/components/student/EventDetailModal';
import { EventRegistrationModal } from '@/components/student/EventRegistrationModal';

// Organizer Modules (FR3, FR5, FR6, FR14, FR16, FR20, FR23, FR24, FR26)
import { EventManagementHub } from '@/components/organizer/EventManagementHub';
import { AttendeeCheckInStation } from '@/components/organizer/AttendeeCheckInStation';
import { VolunteerManagement } from '@/components/organizer/VolunteerManagement';
import { BroadcastCenter } from '@/components/organizer/BroadcastCenter';
import { EventReportsModal } from '@/components/organizer/EventReportsModal';
import { OrganizerOverview } from '@/components/organizer/OrganizerOverview';

// Admin Modules (FR4, FR21, FR25, FR26, NFR9)
import { EventApprovalsQueue } from '@/components/admin/EventApprovalsQueue';
import { CategoryVenueManager } from '@/components/admin/CategoryVenueManager';
import { UserAccountManager } from '@/components/admin/UserAccountManager';
import { AdminAuditReports } from '@/components/admin/AdminAuditReports';

// Hackathon Competition Hub (Integrated Sub-suite)
import { ParticipantOverview } from '@/components/participant/ParticipantOverview';
import { TeamHub } from '@/components/participant/TeamHub';
import { TeammateMatchmaker } from '@/components/participant/TeammateMatchmaker';
import { SubmissionPortal } from '@/components/participant/SubmissionPortal';
import { LeaderboardView } from '@/components/participant/LeaderboardView';
import { JudgeOverview } from '@/components/judge/JudgeOverview';
import { AssignedSubmissions } from '@/components/judge/AssignedSubmissions';
import { JudgingProgressMatrix } from '@/components/judge/JudgingProgressMatrix';
import { ScoringStudioModal } from '@/components/judge/ScoringStudioModal';
import { TeamsManager } from '@/components/organizer/TeamsManager';
import { SubmissionsReview } from '@/components/organizer/SubmissionsReview';
import { JudgingOversight } from '@/components/organizer/JudgingOversight';
import { AnnouncementsFeed } from '@/components/participant/AnnouncementsFeed';

export default function DashboardPage() {
  const { currentRole, registerForEvent, registrations, currentUser } = useEvent();
  const [activeTab, setActiveTab] = useState<string>('catalogue');
  const [activeDetailEvent, setActiveDetailEvent] = useState<any | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<any | null>(null);
  const [activeJudgeEvaluationId, setActiveJudgeEvaluationId] = useState<string | null>(null);

  // When role changes, set reasonable default tab
  useEffect(() => {
    if (currentRole === 'student' || currentRole === 'participant') {
      setActiveTab('catalogue');
    } else if (currentRole === 'organizer') {
      setActiveTab('overview');
    } else if (currentRole === 'admin') {
      setActiveTab('overview');
    } else if (currentRole === 'judge') {
      setActiveTab('overview');
    }
  }, [currentRole]);

  const registeredEventIds = new Set(
    registrations
      .filter((r) => r.studentId === currentUser?.id && r.status !== 'cancelled')
      .map((r) => r.eventId)
  );

  const renderContent = () => {
    // -------------------------------------------------------------
    // 1. STUDENT DASHBOARD EXPERIENCE (FR7 - FR13, FR15, FR17 - FR19)
    // -------------------------------------------------------------
    if (currentRole === 'student' || currentRole === 'participant') {
      switch (activeTab) {
        case 'catalogue':
          return <EventCatalogue />;
        case 'notices':
          return <AnnouncementsFeed />;
        case 'registrations':
          return <MyRegistrations />;
        case 'calendar':
          return <EventCalendarView />;
        case 'bookmarks':
          return (
            <BookmarkedEventsView
              onOpenDetails={(evt) => setActiveDetailEvent(evt)}
              onNavigateToCatalogue={() => setActiveTab('catalogue')}
            />
          );
        case 'certificates':
          return <MyCertificatesView />;
        case 'hackathon-hub':
          return <ParticipantOverview setActiveTab={setActiveTab} />;
        case 'matchmaker':
          return <TeammateMatchmaker />;
        case 'my-team':
          return <TeamHub setActiveTab={setActiveTab} />;
        case 'submission':
          return <SubmissionPortal />;
        case 'leaderboard':
          return <LeaderboardView />;
        default:
          return <EventCatalogue />;
      }
    }

    // -------------------------------------------------------------
    // 2. ORGANIZER COMMAND EXPERIENCE (FR3, FR5, FR6, FR14, FR16, FR20, FR23, FR24)
    // -------------------------------------------------------------
    if (currentRole === 'organizer') {
      switch (activeTab) {
        case 'overview':
          return <OrganizerOverview setActiveTab={setActiveTab} />;
        case 'events':
          return <EventManagementHub />;
        case 'check-in':
          return <AttendeeCheckInStation />;
        case 'volunteers':
          return <VolunteerManagement />;
        case 'broadcast':
          return <BroadcastCenter />;
        case 'reports':
          return <EventReportsModal />;
        case 'hackathon-oversight':
          return <JudgingOversight />;
        case 'teams':
          return <TeamsManager />;
        case 'submissions':
          return <SubmissionsReview />;
        default:
          return <OrganizerOverview setActiveTab={setActiveTab} />;
      }
    }

    // -------------------------------------------------------------
    // 3. ADMIN EXECUTIVE EXPERIENCE (FR4, FR21, FR23, FR25, FR26)
    // -------------------------------------------------------------
    if (currentRole === 'admin') {
      switch (activeTab) {
        case 'overview':
          return <AdminAuditReports />;
        case 'approvals':
          return <EventApprovalsQueue />;
        case 'master-data':
          return <CategoryVenueManager />;
        case 'users':
          return <UserAccountManager />;
        case 'audit-reports':
          return <AdminAuditReports />;
        default:
          return <AdminAuditReports />;
      }
    }

    // -------------------------------------------------------------
    // 4. JURY EXPERIENCE (Retained Hackathon Rubric)
    // -------------------------------------------------------------
    if (currentRole === 'judge') {
      switch (activeTab) {
        case 'overview':
          return (
            <JudgeOverview
              setActiveTab={setActiveTab}
              onOpenEvaluation={(id) => setActiveJudgeEvaluationId(id)}
            />
          );
        case 'assigned':
          return <AssignedSubmissions initialSelectedId={activeJudgeEvaluationId} />;
        case 'matrix':
          return <JudgingProgressMatrix />;
        case 'leaderboard':
          return <LeaderboardView />;
        default:
          return (
            <JudgeOverview
              setActiveTab={setActiveTab}
              onOpenEvaluation={(id) => setActiveJudgeEvaluationId(id)}
            />
          );
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Navigation Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Role Content View */}
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </main>

      {/* Global Event Detail Modal when active from bookmarks/calendar */}
      {activeDetailEvent && (
        <EventDetailModal
          event={activeDetailEvent}
          onClose={() => setActiveDetailEvent(null)}
          onRegister={() => setRegisteringEvent(activeDetailEvent)}
          isRegistered={registeredEventIds.has(activeDetailEvent.id)}
        />
      )}

      {/* Event Registration & Payment Modal */}
      <EventRegistrationModal
        event={registeringEvent}
        isOpen={!!registeringEvent}
        onClose={() => setRegisteringEvent(null)}
      />

      {/* Judge Studio Modal */}
      {activeJudgeEvaluationId && (
        <ScoringStudioModal
          submissionId={activeJudgeEvaluationId}
          onClose={() => setActiveJudgeEvaluationId(null)}
        />
      )}
    </div>
  );
}
