'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ActivityLog,
  Announcement,
  Evaluation,
  EventInfo,
  Judge,
  Participant,
  ProjectSubmission,
  Team,
  UserRole,
} from '@/types';
import {
  INITIAL_ACTIVITY_LOGS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVALUATIONS,
  INITIAL_EVENT_INFO,
  INITIAL_JUDGES,
  INITIAL_PARTICIPANTS,
  INITIAL_SUBMISSIONS,
  INITIAL_TEAMS,
} from '@/lib/demoData';
import { playChime } from '@/lib/utils';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
}

interface EventContextType {
  // Roles & Identity
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentParticipantId: string;
  setCurrentParticipantId: (id: string) => void;
  currentJudgeId: string;
  setCurrentJudgeId: (id: string) => void;
  currentParticipant: Participant | undefined;
  currentJudge: Judge | undefined;

  // Data
  eventInfo: EventInfo;
  participants: Participant[];
  teams: Team[];
  submissions: ProjectSubmission[];
  judges: Judge[];
  evaluations: Evaluation[];
  announcements: Announcement[];
  activityLogs: ActivityLog[];
  toasts: ToastMessage[];

  // Computed statistics
  stats: {
    totalRegistered: number;
    checkedInCount: number;
    checkInPercentage: number;
    teamsCount: number;
    submissionsCount: number;
    judgesCount: number;
    totalEvaluations: number;
    judgingProgressPercentage: number;
    averageScore: number;
  };

  // Actions
  checkInParticipant: (participantId: string) => void;
  sendConnectionRequest: (targetId: string) => void;
  acceptConnectionRequest: (senderId: string) => void;
  createOrUpdateTeam: (teamData: Partial<Team> & { name: string; track: string }) => void;
  submitProject: (submissionData: Partial<ProjectSubmission> & { title: string; track: string }) => void;
  submitEvaluation: (evaluationData: Omit<Evaluation, 'id' | 'evaluatedAt'>) => void;
  publishAnnouncement: (data: Omit<Announcement, 'id' | 'timestamp'>) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetToDemoData: () => void;
}

const STORAGE_KEY = 'eventflow_technova_2026_state_v1';

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  // Current user / role simulation state
  const [currentRole, setCurrentRole] = useState<UserRole>('participant');
  const [currentParticipantId, setCurrentParticipantId] = useState<string>('p-1');
  const [currentJudgeId, setCurrentJudgeId] = useState<string>('j-1');

  // Core event state
  const [eventInfo, setEventInfo] = useState<EventInfo>(INITIAL_EVENT_INFO);
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(INITIAL_SUBMISSIONS);
  const [judges, setJudges] = useState<Judge[]>(INITIAL_JUDGES);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(INITIAL_EVALUATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted state on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.participants) setParticipants(parsed.participants);
        if (parsed.teams) setTeams(parsed.teams);
        if (parsed.submissions) setSubmissions(parsed.submissions);
        if (parsed.evaluations) setEvaluations(parsed.evaluations);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
        if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
        if (parsed.currentRole) setCurrentRole(parsed.currentRole);
      }
    } catch (e) {
      console.warn('Failed to parse saved state, using defaults', e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const payload = {
        participants,
        teams,
        submissions,
        evaluations,
        announcements,
        activityLogs,
        currentRole,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to persist state', e);
    }
  }, [participants, teams, submissions, evaluations, announcements, activityLogs, currentRole, isLoaded]);

  // Toast Helper
  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, title, message, type, timestamp: Date.now() };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Derived current models
  const currentParticipant = participants.find((p) => p.id === currentParticipantId) || participants[0];
  const currentJudge = judges.find((j) => j.id === currentJudgeId) || judges[0];

  // Helper to recalculate team rankings
  const recalculateLeaderboard = (updatedTeams: Team[], allEvaluations: Evaluation[]) => {
    const scoredTeams = updatedTeams.map((team) => {
      const teamEvals = allEvaluations.filter((e) => e.teamId === team.id);
      if (teamEvals.length === 0) {
        return {
          ...team,
          aggregateScore: team.aggregateScore || 0,
          totalEvaluations: 0,
        };
      }
      const sum = teamEvals.reduce((acc, curr) => acc + curr.totalScore, 0);
      const avg = Number((sum / teamEvals.length).toFixed(1));
      return {
        ...team,
        aggregateScore: avg,
        totalEvaluations: teamEvals.length,
      };
    });

    // Sort by aggregate score descending
    scoredTeams.sort((a, b) => (b.aggregateScore || 0) - (a.aggregateScore || 0));

    return scoredTeams.map((team, idx) => ({
      ...team,
      previousRank: team.rank || idx + 1,
      rank: idx + 1,
    }));
  };

  // 1. Participant Check-in Action
  const checkInParticipant = (participantId: string) => {
    const target = participants.find((p) => p.id === participantId);
    if (!target) return;

    if (target.checkInStatus === 'checked_in') {
      addToast('Already Checked In', `${target.name} is already verified and checked in.`, 'info');
      return;
    }

    const checkInTime = new Date().toISOString();
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, checkInStatus: 'checked_in', checkInTime } : p))
    );

    // Create activity log
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'check_in',
      title: 'Participant Checked In',
      description: `${target.name} verified and checked in at TechNova 2026.`,
      timestamp: checkInTime,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    playChime('scan');
    addToast('Attendee Checked In!', `${target.name} has been successfully verified!`, 'success');
  };

  // 2. Teammate Connection Request Action
  const sendConnectionRequest = (targetId: string) => {
    if (!currentParticipant) return;
    if (currentParticipant.id === targetId) return;

    const target = participants.find((p) => p.id === targetId);
    if (!target) return;

    if (currentParticipant.connectionRequestsSent.includes(targetId)) {
      addToast('Request Pending', `You have already sent a request to ${target.name}.`, 'info');
      return;
    }

    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === currentParticipant.id) {
          return { ...p, connectionRequestsSent: [...p.connectionRequestsSent, targetId] };
        }
        if (p.id === targetId) {
          return { ...p, connectionRequestsReceived: [...p.connectionRequestsReceived, currentParticipant.id] };
        }
        return p;
      })
    );

    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'connection',
      title: 'Connection Requested',
      description: `${currentParticipant.name} sent a teammate invite to ${target.name}`,
      timestamp: new Date().toISOString(),
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    playChime('success');
    addToast('Invitation Sent!', `Teammate connection request sent to ${target.name}.`, 'success');
  };

  // 3. Accept Connection Request Action
  const acceptConnectionRequest = (senderId: string) => {
    if (!currentParticipant) return;
    const sender = participants.find((p) => p.id === senderId);
    if (!sender) return;

    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === currentParticipant.id) {
          return {
            ...p,
            connectionRequestsReceived: p.connectionRequestsReceived.filter((id) => id !== senderId),
            connections: [...p.connections, senderId],
          };
        }
        if (p.id === senderId) {
          return {
            ...p,
            connectionRequestsSent: p.connectionRequestsSent.filter((id) => id !== currentParticipant.id),
            connections: [...p.connections, currentParticipant.id],
          };
        }
        return p;
      })
    );

    addToast('Connection Accepted', `You and ${sender.name} are now connected teammates!`, 'success');
  };

  // 4. Create or Update Team Action
  const createOrUpdateTeam = (teamData: Partial<Team> & { name: string; track: string }) => {
    if (!currentParticipant) return;

    let updatedTeamList: Team[];
    const existingTeam = teams.find((t) => t.id === currentParticipant.teamId);

    if (existingTeam) {
      updatedTeamList = teams.map((t) => (t.id === existingTeam.id ? { ...t, ...teamData } : t));
      addToast('Team Updated', `Team details for "${teamData.name}" have been updated.`, 'success');
    } else {
      const newTeamId = `team-${Date.now()}`;
      const newTeam: Team = {
        id: newTeamId,
        name: teamData.name,
        tagline: teamData.tagline || 'Building innovatively for TechNova 2026',
        track: teamData.track,
        leaderId: currentParticipant.id,
        members: [
          {
            participantId: currentParticipant.id,
            name: currentParticipant.name,
            role: currentParticipant.role,
            avatar: currentParticipant.avatar,
            isLeader: true,
          },
        ],
        maxMembers: 4,
        lookingForRoles: teamData.lookingForRoles || ['Fullstack Dev', 'UI/UX Designer'],
        totalEvaluations: 0,
        rank: teams.length + 1,
      };

      updatedTeamList = [...teams, newTeam];
      // Update participant's teamId
      setParticipants((prev) =>
        prev.map((p) => (p.id === currentParticipant.id ? { ...p, teamId: newTeamId, availability: 'In a Team' } : p))
      );

      const newLog: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'team_create',
        title: 'Team Created',
        description: `Team "${newTeam.name}" was formed by ${currentParticipant.name}`,
        timestamp: new Date().toISOString(),
      };
      setActivityLogs((prev) => [newLog, ...prev]);

      addToast('Team Created!', `"${newTeam.name}" is now ready for hackathon collaboration.`, 'success');
    }

    setTeams(recalculateLeaderboard(updatedTeamList, evaluations));
  };

  // 5. Submit Project Action
  const submitProject = (submissionData: Partial<ProjectSubmission> & { title: string; track: string }) => {
    if (!currentParticipant) return;
    const userTeam = teams.find((t) => t.id === currentParticipant.teamId);
    if (!userTeam) {
      addToast('Team Required', 'You must be part of a team to submit a project.', 'error');
      return;
    }

    const existingSub = submissions.find((s) => s.teamId === userTeam.id);
    const subId = existingSub ? existingSub.id : `sub-${Date.now()}`;
    const submittedAt = new Date().toISOString();

    const newSub: ProjectSubmission = {
      id: subId,
      teamId: userTeam.id,
      teamName: userTeam.name,
      title: submissionData.title,
      tagline: submissionData.tagline || userTeam.tagline,
      track: submissionData.track,
      problemStatement: submissionData.problemStatement || '',
      solution: submissionData.solution || '',
      architectureNotes: submissionData.architectureNotes,
      techStack: submissionData.techStack || ['React', 'Node.js', 'Tailwind CSS'],
      repoUrl: submissionData.repoUrl || 'https://github.com',
      demoUrl: submissionData.demoUrl,
      videoUrl: submissionData.videoUrl,
      slidesUrl: submissionData.slidesUrl,
      status: 'submitted',
      submittedAt,
      coverImage:
        submissionData.coverImage ||
        'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80',
    };

    if (existingSub) {
      setSubmissions((prev) => prev.map((s) => (s.id === existingSub.id ? newSub : s)));
    } else {
      setSubmissions((prev) => [newSub, ...prev]);
    }

    // Update team with submission ID
    setTeams((prev) => prev.map((t) => (t.id === userTeam.id ? { ...t, submissionId: subId } : t)));

    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'submission',
      title: 'Project Submission Received',
      description: `${userTeam.name} submitted "${newSub.title}" for review.`,
      timestamp: submittedAt,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    playChime('celebrate');
    addToast('Project Submitted Successfully! 🚀', `"${newSub.title}" is now queued for judge evaluation.`, 'success');
  };

  // 6. Submit Judge Evaluation Action
  const submitEvaluation = (evaluationData: Omit<Evaluation, 'id' | 'evaluatedAt'>) => {
    const evalId = `eval-${Date.now()}`;
    const evaluatedAt = new Date().toISOString();

    const newEval: Evaluation = {
      ...evaluationData,
      id: evalId,
      evaluatedAt,
    };

    const updatedEvaluations = [...evaluations.filter((e) => !(e.submissionId === newEval.submissionId && e.judgeId === newEval.judgeId)), newEval];
    setEvaluations(updatedEvaluations);

    // Update submission status to 'evaluated'
    setSubmissions((prev) =>
      prev.map((s) => (s.id === newEval.submissionId ? { ...s, status: 'evaluated' } : s))
    );

    // Recalculate leaderboard
    const updatedTeams = recalculateLeaderboard(teams, updatedEvaluations);
    setTeams(updatedTeams);

    const scoredTeam = teams.find((t) => t.id === newEval.teamId);

    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'evaluation',
      title: 'Evaluation Submitted',
      description: `${newEval.judgeName} scored ${scoredTeam?.name || 'Project'}: ${newEval.totalScore}/100 pts`,
      timestamp: evaluatedAt,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    playChime('success');
    addToast('Score Submitted & Leaderboard Updated!', `Awarded ${newEval.totalScore} pts to ${scoredTeam?.name || 'Team'}.`, 'success');
  };

  // 7. Publish Announcement Action
  const publishAnnouncement = (data: Omit<Announcement, 'id' | 'timestamp'>) => {
    const newAnn: Announcement = {
      ...data,
      id: `ann-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setAnnouncements((prev) => [newAnn, ...prev]);

    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'announcement',
      title: 'Broadcast Published',
      description: `Organizer broadcasted: "${newAnn.title}"`,
      timestamp: newAnn.timestamp,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    playChime(data.priority === 'critical' ? 'alert' : 'success');
    addToast(
      data.priority === 'critical' ? '🚨 Critical Broadcast Published!' : '📢 Announcement Broadcasted!',
      newAnn.title,
      data.priority === 'critical' ? 'warning' : 'info'
    );
  };

  // 8. Reset to Default Demo Data
  const resetToDemoData = () => {
    setParticipants(INITIAL_PARTICIPANTS);
    setTeams(INITIAL_TEAMS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setJudges(INITIAL_JUDGES);
    setEvaluations(INITIAL_EVALUATIONS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    localStorage.removeItem(STORAGE_KEY);
    addToast('Demo State Reset', 'Platform restored to initial TechNova 2026 state.', 'info');
  };

  // Computed aggregate stats
  const totalRegistered = participants.length;
  const checkedInCount = participants.filter((p) => p.checkInStatus === 'checked_in').length;
  const checkInPercentage = totalRegistered > 0 ? Math.round((checkedInCount / totalRegistered) * 100) : 0;
  const teamsCount = teams.length;
  const submissionsCount = submissions.filter((s) => s.status !== 'not_submitted' && s.status !== 'draft').length;
  const judgesCount = judges.length;
  const totalEvaluations = evaluations.length;
  const maxPossibleEvaluations = Math.max(1, submissions.length * 2);
  const judgingProgressPercentage = Math.min(100, Math.round((totalEvaluations / maxPossibleEvaluations) * 100));

  const totalScoreSum = evaluations.reduce((sum, e) => sum + e.totalScore, 0);
  const averageScore = evaluations.length > 0 ? Number((totalScoreSum / evaluations.length).toFixed(1)) : 0;

  return (
    <EventContext.Provider
      value={{
        currentRole,
        setRole: setCurrentRole,
        currentParticipantId,
        setCurrentParticipantId,
        currentJudgeId,
        setCurrentJudgeId,
        currentParticipant,
        currentJudge,
        eventInfo,
        participants,
        teams,
        submissions,
        judges,
        evaluations,
        announcements,
        activityLogs,
        toasts,
        stats: {
          totalRegistered,
          checkedInCount,
          checkInPercentage,
          teamsCount,
          submissionsCount,
          judgesCount,
          totalEvaluations,
          judgingProgressPercentage,
          averageScore,
        },
        checkInParticipant,
        sendConnectionRequest,
        acceptConnectionRequest,
        createOrUpdateTeam,
        submitProject,
        submitEvaluation,
        publishAnnouncement,
        addToast,
        removeToast,
        resetToDemoData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}
