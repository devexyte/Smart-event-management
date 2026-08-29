'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEvent } from '@/context/EventContext';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';

// Participant Views
import { ParticipantOverview } from '@/components/participant/ParticipantOverview';
import { ParticipantPassQR } from '@/components/participant/ParticipantPassQR';
import { TeammateMatchmaker } from '@/components/participant/TeammateMatchmaker';
import { TeamHub } from '@/components/participant/TeamHub';
import { SubmissionPortal } from '@/components/participant/SubmissionPortal';
import { AnnouncementsFeed } from '@/components/participant/AnnouncementsFeed';
import { LeaderboardView } from '@/components/participant/LeaderboardView';

// Judge Views
import { JudgeOverview } from '@/components/judge/JudgeOverview';
import { AssignedSubmissions } from '@/components/judge/AssignedSubmissions';
import { JudgingProgressMatrix } from '@/components/judge/JudgingProgressMatrix';
import { ScoringStudioModal } from '@/components/judge/ScoringStudioModal';

// Organizer Views
import { OrganizerOverview } from '@/components/organizer/OrganizerOverview';
import { AttendeeCheckInStation } from '@/components/organizer/AttendeeCheckInStation';
import { TeamsManager } from '@/components/organizer/TeamsManager';
import { SubmissionsReview } from '@/components/organizer/SubmissionsReview';
import { JudgingOversight } from '@/components/organizer/JudgingOversight';
import { BroadcastCenter } from '@/components/organizer/BroadcastCenter';
import { AnalyticsSuite } from '@/components/organizer/AnalyticsSuite';
import { OrganizerLeaderboard } from '@/components/organizer/OrganizerLeaderboard';

export default function DashboardPage() {
  const { currentRole } = useEvent();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeJudgeEvaluationId, setActiveJudgeEvaluationId] = useState<string | null>(null);

  // When role switches, ensure activeTab resets cleanly if invalid for new role
  useEffect(() => {
    setActiveTab('overview');
  }, [currentRole]);

  const renderContent = () => {
    // 1. Participant Experience
    if (currentRole === 'participant') {
      switch (activeTab) {
        case 'overview':
          return <ParticipantOverview setActiveTab={setActiveTab} />;
        case 'qr-pass':
          return <ParticipantPassQR />;
        case 'matchmaker':
          return <TeammateMatchmaker />;
        case 'my-team':
          return <TeamHub setActiveTab={setActiveTab} />;
        case 'submission':
          return <SubmissionPortal />;
        case 'announcements':
          return <AnnouncementsFeed />;
        case 'leaderboard':
          return <LeaderboardView />;
        default:
          return <ParticipantOverview setActiveTab={setActiveTab} />;
      }
    }

    // 2. Judge Experience
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

    // 3. Organizer Experience
    if (currentRole === 'organizer') {
      switch (activeTab) {
        case 'overview':
          return <OrganizerOverview setActiveTab={setActiveTab} />;
        case 'check-in':
          return <AttendeeCheckInStation />;
        case 'teams':
          return <TeamsManager />;
        case 'submissions':
          return <SubmissionsReview />;
        case 'judging':
          return <JudgingOversight />;
        case 'broadcast':
          return <BroadcastCenter />;
        case 'analytics':
          return <AnalyticsSuite />;
        case 'leaderboard':
          return <OrganizerLeaderboard />;
        default:
          return <OrganizerOverview setActiveTab={setActiveTab} />;
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c15]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar navigation */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Right Main Content Panel */}
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </main>

      {/* Global Judge Scoring Studio Modal if open */}
      {activeJudgeEvaluationId && (
        <ScoringStudioModal
          submissionId={activeJudgeEvaluationId}
          onClose={() => setActiveJudgeEvaluationId(null)}
        />
      )}
    </div>
  );
}
