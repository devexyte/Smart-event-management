export type UserRole = 'student' | 'organizer' | 'admin' | 'participant' | 'judge';

export type CheckInStatus = 'checked_in' | 'not_checked_in';

export type EventStatus =
  | 'draft'
  | 'pending_approval'
  | 'published'
  | 'ongoing'
  | 'completed'
  | 'archived'
  | 'rejected';

export type EventCategory =
  | 'Technical'
  | 'Workshop'
  | 'Seminar'
  | 'Cultural'
  | 'Sports'
  | 'Academic';

export type RegistrationStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export type PaymentStatus = 'free' | 'paid' | 'pending' | 'refunded' | 'failed';

export type SubmissionStatus = 'not_submitted' | 'draft' | 'submitted' | 'under_review' | 'evaluated';

export type AnnouncementPriority = 'critical' | 'high' | 'normal';
export type AnnouncementCategory = 'general' | 'venue' | 'schedule' | 'submission' | 'mentorship';

export interface ScheduleSession {
  id: string;
  title: string;
  time: string;
  speaker?: string;
  room?: string;
  description?: string;
}

export interface OrganizerContact {
  name: string;
  email: string;
  phone: string;
  department: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  venueId: string;
  venueName: string;
  building: string;
  bannerImage: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  capacity: number;
  registeredCount: number;
  price: number; // 0 = Free
  status: EventStatus;
  organizerId: string;
  organizerName: string;
  organizerContact: OrganizerContact;
  scheduleTimeline: ScheduleSession[];
  tags: string[];
  rejectionReason?: string;
  isHackathon?: boolean;
}

export interface RegistrationRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: EventCategory;
  eventDate: string;
  eventVenue: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentIdNumber: string;
  registrationDate: string;
  status: RegistrationStatus;
  qrToken: string;
  checkInStatus: CheckInStatus;
  checkInTime?: string;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  transactionRef?: string;
  cancellationReason?: string;
  feedbackSubmitted?: boolean;
  feedbackRating?: number;
  feedbackComment?: string;
  certificateId?: string;
  certificateIssuedAt?: string;
  paymentMethod?: string;
  department?: string;
  phone?: string;
  dietaryPreference?: string;
  teamName?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  eventCount: number;
}

export interface VenueItem {
  id: string;
  name: string;
  building: string;
  capacity: number;
  facilities: string[];
  status: 'available' | 'maintenance' | 'booked';
}

export interface VolunteerAssignment {
  id: string;
  eventId: string;
  eventTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  role: 'Registration Desk' | 'Technical Support' | 'Stage & Audio-Visual' | 'Hospitality & Usher' | 'Logistics';
  assignedBy: string;
  assignedAt: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface EventFeedback {
  id: string;
  eventId: string;
  eventTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  rating: number; // 1 to 5
  contentRating: number;
  venueRating: number;
  organizationRating: number;
  reviewText: string;
  submittedAt: string;
}

export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  registrationId: string;
  eventId: string;
  eventTitle: string;
  studentId: string;
  studentName: string;
  studentIdNumber: string;
  completionDate: string;
  issuerName: string;
  issuerTitle: string;
  verificationCode: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer' | 'admin';
  department: string;
  avatar: string;
  status: 'active' | 'suspended';
  phone?: string;
  studentIdNumber?: string;
  bookmarkedEventIds: string[];
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'event_update' | 'registration' | 'reminder' | 'certificate' | 'approval' | 'general';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// ================= Legacy Hackathon Types (Retained for Competition Hub) =================
export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  qrToken: string;
  role: string;
  primaryTrack: string;
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
  connectionRequestsSent: string[];
  connectionRequestsReceived: string[];
  connections: string[];
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
  innovation: number;
  technicalImplementation: number;
  problemRelevance: number;
  userExperience: number;
  impactAndFeasibility: number;
}

export interface Evaluation {
  id: string;
  submissionId: string;
  teamId: string;
  judgeId: string;
  judgeName: string;
  rubric: RubricScores;
  totalScore: number;
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
  type: 'check_in' | 'team_create' | 'team_join' | 'submission' | 'evaluation' | 'announcement' | 'connection' | 'event_create' | 'event_approval' | 'registration';
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
