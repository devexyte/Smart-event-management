export type UserRole = 'participant' | 'judge' | 'organizer';

export type CheckInStatus = 'checked_in' | 'not_checked_in';

export type SubmissionStatus = 'not_submitted' | 'draft' | 'submitted' | 'under_review' | 'evaluated';

export type AnnouncementPriority = 'critical' | 'high' | 'normal';
export type AnnouncementCategory = 'general' | 'venue' | 'schedule' | 'submission' | 'mentorship';

export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  qrToken: string;
  role: string; // e.g. 'AI / ML Engineer', 'Frontend Developer', 'Backend Architect', 'UI/UX Designer', 'Fullstack Developer', 'Data Scientist'
  primaryTrack: string; // 'AI & Intelligent Systems', 'Web3 & Fintech', 'Healthcare & Biotech', 'Sustainable Tech'
  skills: string[];
  interests: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  availability: 'Looking for Team' | 'In a Team' | 'Open to Offers';
  bio: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  checkInStatus: CheckInStatus;
  checkInTime?: string;
  teamId?: string;
  connectionRequestsSent: string[]; // participant IDs
  connectionRequestsReceived: string[]; // participant IDs
  connections: string[]; // confirmed participant IDs
}

export interface TeamMember {
  participantId: string;
  name: string;
  role: string;
  avatar: string;
  isLeader: boolean;
}

export interface Team {
  id: string;
  name: string;
  tagline: string;
  track: string;
  leaderId: string;
  members: TeamMember[];
  maxMembers: number;
  lookingForRoles: string[];
  submissionId?: string;
  aggregateScore?: number;
  totalEvaluations: number;
  rank?: number;
  previousRank?: number;
}

export interface ProjectSubmission {
  id: string;
  teamId: string;
  teamName: string;
  title: string;
  tagline: string;
  track: string;
  problemStatement: string;
  solution: string;
  architectureNotes?: string;
  techStack: string[];
  repoUrl: string;
  demoUrl?: string;
  videoUrl?: string;
  slidesUrl?: string;
  status: SubmissionStatus;
  submittedAt?: string;
  coverImage?: string;
}

export interface RubricScores {
  innovation: number; // Max 20
  technicalImplementation: number; // Max 25
  problemRelevance: number; // Max 20
  userExperience: number; // Max 15
  impactAndFeasibility: number; // Max 20
}

export interface Evaluation {
  id: string;
  submissionId: string;
  teamId: string;
  judgeId: string;
  judgeName: string;
  rubric: RubricScores;
  totalScore: number; // Max 100
  feedback: string;
  strengths: string[];
  improvementAreas: string[];
  evaluatedAt: string;
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  track: string;
  assignedSubmissionIds: string[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: AnnouncementPriority;
  category: AnnouncementCategory;
  timestamp: string;
  author: string;
  actionUrl?: string;
  pinned?: boolean;
}

export interface ActivityLog {
  id: string;
  type: 'check_in' | 'team_create' | 'team_join' | 'submission' | 'evaluation' | 'announcement' | 'connection';
  title: string;
  description: string;
  timestamp: string;
  meta?: Record<string, any>;
}

export interface EventInfo {
  name: string;
  type: string;
  location: string;
  venue: string;
  dates: string;
  currentDay: string;
  status: 'Registration' | 'Check-in Live' | 'Hacking Active' | 'Judging' | 'Finals';
  submissionDeadline: string;
  prizePool: string;
  totalTracks: number;
}
