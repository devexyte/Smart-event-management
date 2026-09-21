'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ActivityLog,
  Announcement,
  CategoryItem,
  CertificateRecord,
  Evaluation,
  EventFeedback,
  EventInfo,
  EventItem,
  Judge,
  NotificationItem,
  Participant,
  PaymentStatus,
  ProjectSubmission,
  RegistrationRecord,
  Team,
  UserAccount,
  UserRole,
  VenueItem,
  VolunteerAssignment,
} from '@/types';
import {
  INITIAL_ACTIVITY_LOGS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CATEGORIES,
  INITIAL_CERTIFICATES,
  INITIAL_EVALUATIONS,
  INITIAL_EVENT_INFO,
  INITIAL_EVENTS,
  INITIAL_FEEDBACK,
  INITIAL_JUDGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PARTICIPANTS,
  INITIAL_REGISTRATIONS,
  INITIAL_SUBMISSIONS,
  INITIAL_TEAMS,
  INITIAL_USERS,
  INITIAL_VENUES,
  INITIAL_VOLUNTEERS,
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
  currentUser: UserAccount;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  users: UserAccount[];
  updateUserRole: (userId: string, newRole: 'student' | 'organizer' | 'admin') => void;
  toggleUserStatus: (userId: string) => void;

  // Master Data & Events
  events: EventItem[];
  categories: CategoryItem[];
  venues: VenueItem[];
  createDraftEvent: (data: Partial<EventItem> & { title: string; category: EventItem['category'] }) => string;
  submitEventForApproval: (eventId: string) => void;
  approveEvent: (eventId: string) => void;
  rejectEvent: (eventId: string, reason: string) => void;
  updateEvent: (eventId: string, data: Partial<EventItem>) => void;
  deleteEvent: (eventId: string) => void;
  archiveEvent: (eventId: string) => void;
  createOrUpdateVenue: (venue: VenueItem) => void;
  deleteVenue: (venueId: string) => void;
  createOrUpdateCategory: (category: CategoryItem) => void;
  deleteCategory: (categoryId: string) => void;

  // Student Registrations & QR Check-in
  registrations: RegistrationRecord[];
  registerForEvent: (eventId: string, extra?: { studentIdNumber?: string }) => { success: boolean; message: string };
  cancelRegistration: (registrationId: string, reason?: string) => void;
  updatePaymentStatus: (registrationId: string, status: PaymentStatus) => void;
  checkInWithQR: (qrToken: string, eventId?: string) => { success: boolean; message: string; registration?: RegistrationRecord };

  // Certificates & Feedback
  certificates: CertificateRecord[];
  generateCertificate: (registrationId: string) => CertificateRecord | undefined;
  feedbacks: EventFeedback[];
  submitFeedback: (
    eventId: string,
    feedback: { rating: number; contentRating: number; venueRating: number; organizationRating: number; reviewText: string }
  ) => void;

  // Bookmarks & Volunteers
  toggleBookmark: (eventId: string) => void;
  volunteers: VolunteerAssignment[];
  assignVolunteer: (eventId: string, studentId: string, role: VolunteerAssignment['role']) => void;
  removeVolunteer: (assignmentId: string) => void;

  // Announcements & Notifications
  announcements: Announcement[];
  publishAnnouncement: (data: Omit<Announcement, 'id' | 'timestamp'>) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Toasts & Diagnostics
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetToDemoData: () => void;

  // Computed Operational Statistics (FR26)
  stats: {
    totalEvents: number;
    publishedEvents: number;
    pendingApprovalsCount: number;
    totalRegistrations: number;
    checkedInAttendees: number;
    checkInPercentage: number;
    totalRevenue: number;
    unreadNotificationsCount: number;
    // Legacy metrics
    totalRegistered: number;
    checkedInCount: number;
    teamsCount: number;
    submissionsCount: number;
    judgesCount: number;
    totalEvaluations: number;
    judgingProgressPercentage: number;
    averageScore: number;
  };

  // Legacy Hackathon compatibility
  eventInfo: EventInfo;
  participants: Participant[];
  teams: Team[];
  submissions: ProjectSubmission[];
  judges: Judge[];
  evaluations: Evaluation[];
  activityLogs: ActivityLog[];
  currentParticipantId: string;
  setCurrentParticipantId: (id: string) => void;
  currentJudgeId: string;
  setCurrentJudgeId: (id: string) => void;
  currentParticipant: Participant | undefined;
  currentJudge: Judge | undefined;
  checkInParticipant: (participantId: string) => void;
  sendConnectionRequest: (targetId: string) => void;
  acceptConnectionRequest: (senderId: string) => void;
  createOrUpdateTeam: (teamData: Partial<Team> & { name: string; track: string }) => void;
  submitProject: (submissionData: Partial<ProjectSubmission> & { title: string; track: string }) => void;
  submitEvaluation: (evaluationData: Omit<Evaluation, 'id' | 'evaluatedAt'>) => void;
}

const STORAGE_KEY = 'eventflow_ruia_college_state_v3';

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  // Identity state
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUserId, setCurrentUserId] = useState<string>('usr-student-1');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');

  // Master Data
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [venues, setVenues] = useState<VenueItem[]>(INITIAL_VENUES);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(INITIAL_REGISTRATIONS);
  const [volunteers, setVolunteers] = useState<VolunteerAssignment[]>(INITIAL_VOLUNTEERS);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(INITIAL_CERTIFICATES);
  const [feedbacks, setFeedbacks] = useState<EventFeedback[]>(INITIAL_FEEDBACK);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Legacy Hackathon State
  const [eventInfo, setEventInfo] = useState<EventInfo>(INITIAL_EVENT_INFO);
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(INITIAL_SUBMISSIONS);
  const [judges, setJudges] = useState<Judge[]>(INITIAL_JUDGES);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(INITIAL_EVALUATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [currentParticipantId, setCurrentParticipantId] = useState<string>('p-1');
  const [currentJudgeId, setCurrentJudgeId] = useState<string>('j-1');

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        if (p.users) setUsers(p.users);
        if (p.currentUserId) setCurrentUserId(p.currentUserId);
        if (p.currentRole) setCurrentRole(p.currentRole);
        if (p.events) setEvents(p.events);
        if (p.categories) setCategories(p.categories);
        if (p.venues) setVenues(p.venues);
        if (p.registrations) setRegistrations(p.registrations);
        if (p.volunteers) setVolunteers(p.volunteers);
        if (p.certificates) setCertificates(p.certificates);
        if (p.feedbacks) setFeedbacks(p.feedbacks);
        if (p.notifications) setNotifications(p.notifications);
        if (p.announcements) setAnnouncements(p.announcements);
        if (p.teams) setTeams(p.teams);
        if (p.submissions) setSubmissions(p.submissions);
        if (p.evaluations) setEvaluations(p.evaluations);
      }
    } catch (e) {
      console.warn('Failed to parse saved state, using defaults', e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to local storage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const payload = {
        users,
        currentUserId,
        currentRole,
        events,
        categories,
        venues,
        registrations,
        volunteers,
        certificates,
        feedbacks,
        notifications,
        announcements,
        teams,
        submissions,
        evaluations,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to persist state', e);
    }
  }, [
    users,
    currentUserId,
    currentRole,
    events,
    categories,
    venues,
    registrations,
    volunteers,
    certificates,
    feedbacks,
    notifications,
    announcements,
    teams,
    submissions,
    evaluations,
    isLoaded,
  ]);

  // Current user object
  const currentUser = users.find((u) => u.id === currentUserId) || users[0];

  // Switch persona user
  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;
    setCurrentUserId(target.id);
    setCurrentRole(target.role);
    addToast('Persona Switched', `Logged in as ${target.name} (${target.role.toUpperCase()})`, 'info');
  };

  // Toast Helper
  const addToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, title, message, type, timestamp: Date.now() };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // -------------------------------------------------------------
  // FR1 & FR25: USER & ACCOUNT MANAGEMENT
  // -------------------------------------------------------------
  const updateUserRole = (userId: string, newRole: 'student' | 'organizer' | 'admin') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (userId === currentUserId) {
      setCurrentRole(newRole);
    }
    addToast('User Role Updated', `Role updated to ${newRole.toUpperCase()}.`, 'success');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          addToast('Account Status Changed', `${u.name} is now ${newStatus}.`, 'info');
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // -------------------------------------------------------------
  // FR3, FR4, FR5, FR6, FR24: EVENT LIFECYCLE & MASTER DATA
  // -------------------------------------------------------------
  const createDraftEvent = (
    data: Partial<EventItem> & { title: string; category: EventItem['category'] }
  ): string => {
    const id = `evt-${Date.now()}`;
    const selectedVenue = venues.find((v) => v.id === data.venueId) || venues[0];

    const newEvent: EventItem = {
      id,
      title: data.title,
      description: data.description || 'No description provided.',
      category: data.category,
      venueId: selectedVenue.id,
      venueName: selectedVenue.name,
      building: selectedVenue.building,
      bannerImage:
        data.bannerImage ||
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      startDate: data.startDate || new Date(Date.now() + 7 * 86400000).toISOString(),
      endDate: data.endDate || new Date(Date.now() + 8 * 86400000).toISOString(),
      registrationDeadline: data.registrationDeadline || new Date(Date.now() + 5 * 86400000).toISOString(),
      capacity: data.capacity || 100,
      registeredCount: 0,
      price: data.price || 0,
      status: 'draft',
      organizerId: currentUser.id,
      organizerName: currentUser.name,
      organizerContact: {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '+91 98000 00000',
        department: currentUser.department,
      },
      scheduleTimeline: data.scheduleTimeline || [
        { id: 'sch-1', time: '10:00 AM', title: 'Opening & Welcome', room: selectedVenue.name },
      ],
      tags: data.tags || ['Campus Event'],
      isHackathon: data.isHackathon || false,
    };

    setEvents((prev) => [newEvent, ...prev]);

    // Update Category count
    setCategories((prev) =>
      prev.map((c) => (c.name === newEvent.category ? { ...c, eventCount: c.eventCount + 1 } : c))
    );

    addToast('Draft Event Created', `"${newEvent.title}" saved in Draft status.`, 'success');
    return id;
  };

  const submitEventForApproval = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status: 'pending_approval' } : e))
    );

    // Notify admins
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Event Submitted for Approval',
      message: `An event has been submitted for Dean review.`,
      type: 'approval',
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('Submitted for Approval', 'Event submitted to Dean/Admin for publication approval.', 'info');
  };

  const approveEvent = (eventId: string) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;

    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status: 'published', rejectionReason: undefined } : e))
    );

    // Create notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Event Approved & Published',
      message: `"${target.title}" was approved and is now live in the student event catalogue.`,
      type: 'event_update',
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    playChime('celebrate');
    addToast('Event Approved! 🎉', `"${target.title}" is now published and open for registrations.`, 'success');
  };

  const rejectEvent = (eventId: string, reason: string) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;

    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status: 'rejected', rejectionReason: reason } : e))
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Event Returned for Revision',
      message: `"${target.title}" was rejected: ${reason}`,
      type: 'approval',
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('Event Rejected', 'Rejection feedback sent back to organizer.', 'warning');
  };

  const updateEvent = (eventId: string, data: Partial<EventItem>) => {
    const current = events.find((e) => e.id === eventId);
    if (!current) return;

    // Check if material venue or date change occurred to notify registered students (FR5, FR14)
    const venueChanged = data.venueName && data.venueName !== current.venueName;
    const dateChanged = data.startDate && data.startDate !== current.startDate;

    if (venueChanged || dateChanged) {
      const changeMsg = venueChanged
        ? `Venue changed to ${data.venueName}`
        : `Event dates rescheduled`;

      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Schedule Notice: ${current.title}`,
        message: `${changeMsg}. Please check your updated ticket details.`,
        type: 'event_update',
        timestamp: new Date().toISOString(),
        read: false,
      };
      setNotifications((prev) => [notif, ...prev]);
    }

    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, ...data } : e))
    );

    addToast('Event Updated', `Changes to "${current.title}" have been saved.`, 'success');
  };

  const deleteEvent = (eventId: string) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;

    if (target.status === 'published' && target.registeredCount > 0) {
      addToast('Cannot Delete', 'Cannot delete an active published event with registered attendees. Please archive it instead.', 'error');
      return;
    }

    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    addToast('Event Deleted', `"${target.title}" has been permanently removed.`, 'info');
  };

  const archiveEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status: 'archived' } : e))
    );
    addToast('Event Archived', 'Event has been archived and hidden from public catalogue.', 'info');
  };

  // FR21: Category & Venue master data management
  const createOrUpdateVenue = (venue: VenueItem) => {
    setVenues((prev) => {
      const exists = prev.some((v) => v.id === venue.id);
      if (exists) {
        return prev.map((v) => (v.id === venue.id ? venue : v));
      }
      return [...prev, venue];
    });
    addToast('Venue Saved', `Venue "${venue.name}" updated successfully.`, 'success');
  };

  const deleteVenue = (venueId: string) => {
    setVenues((prev) => prev.filter((v) => v.id !== venueId));
    addToast('Venue Removed', 'Venue deleted from master registry.', 'info');
  };

  const createOrUpdateCategory = (category: CategoryItem) => {
    setCategories((prev) => {
      const exists = prev.some((c) => c.id === category.id);
      if (exists) {
        return prev.map((c) => (c.id === category.id ? category : c));
      }
      return [...prev, category];
    });
    addToast('Category Saved', `Category "${category.name}" saved.`, 'success');
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    addToast('Category Removed', 'Category removed from master registry.', 'info');
  };

  // -------------------------------------------------------------
  // FR8, FR9, FR10, FR15, FR16, FR22: STUDENT REGISTRATION & CHECK-IN
  // -------------------------------------------------------------
  const registerForEvent = (
    eventId: string,
    extra?: { studentIdNumber?: string }
  ): { success: boolean; message: string } => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found.' };

    if (event.status !== 'published') {
      return { success: false, message: 'Registration is not open for this event.' };
    }

    if (event.registeredCount >= event.capacity) {
      return { success: false, message: 'Event capacity limit reached. Registration closed.' };
    }

    // Check duplicate registration
    const existing = registrations.find(
      (r) => r.eventId === eventId && r.studentId === currentUser.id && r.status !== 'cancelled'
    );
    if (existing) {
      return { success: false, message: 'You are already registered for this event.' };
    }

    const regId = `reg-${Date.now()}`;
    const studentIdNumber = extra?.studentIdNumber || currentUser.studentIdNumber || 'RUIA-2026-STU';
    const qrToken = `RUIA26-${event.id.toUpperCase()}-${currentUser.name.split(' ')[0].toUpperCase()}-${studentIdNumber}`;

    const newRegistration: RegistrationRecord = {
      id: regId,
      eventId: event.id,
      eventTitle: event.title,
      eventCategory: event.category,
      eventDate: new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      eventVenue: event.venueName,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentIdNumber,
      registrationDate: new Date().toISOString(),
      status: 'confirmed',
      qrToken,
      checkInStatus: 'not_checked_in',
      paymentStatus: event.price > 0 ? 'paid' : 'free',
      paymentAmount: event.price,
      transactionRef: event.price > 0 ? `TXN-${Math.floor(100000000 + Math.random() * 900000000)}-PAY` : undefined,
    };

    setRegistrations((prev) => [newRegistration, ...prev]);

    // Increment event registeredCount
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e))
    );

    // Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Registration Confirmed',
      message: `Your registration for "${event.title}" is confirmed. Your digital QR pass is ready!`,
      type: 'registration',
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    playChime('success');
    addToast('Registration Confirmed! 🎉', `You are registered for "${event.title}". Access your pass in My Registrations.`, 'success');
    return { success: true, message: 'Registration successful!' };
  };

  const cancelRegistration = (registrationId: string, reason?: string) => {
    const reg = registrations.find((r) => r.id === registrationId);
    if (!reg) return;

    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === registrationId) {
          return {
            ...r,
            status: 'cancelled',
            cancellationReason: reason || 'Cancelled by student request.',
            paymentStatus: r.paymentAmount > 0 ? 'refunded' : r.paymentStatus,
          };
        }
        return r;
      })
    );

    // Decrement event registeredCount
    setEvents((prev) =>
      prev.map((e) => (e.id === reg.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e))
    );

    addToast('Registration Cancelled', `Your ticket for "${reg.eventTitle}" was cancelled.${reg.paymentAmount > 0 ? ' Refund initiated.' : ''}`, 'info');
  };

  const updatePaymentStatus = (registrationId: string, status: PaymentStatus) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, paymentStatus: status } : r))
    );
    addToast('Payment Status Updated', `Status changed to ${status.toUpperCase()}.`, 'info');
  };

  // FR16: QR Validation and Attendance Check-In
  const checkInWithQR = (
    qrToken: string,
    eventId?: string
  ): { success: boolean; message: string; registration?: RegistrationRecord } => {
    const cleanToken = qrToken.trim().toUpperCase();

    // Locate registration by token
    const target = registrations.find(
      (r) => r.qrToken.toUpperCase() === cleanToken && (eventId ? r.eventId === eventId : true)
    );

    if (!target) {
      return { success: false, message: 'Invalid QR Token. No matching registration found.' };
    }

    if (target.status === 'cancelled') {
      return { success: false, message: `Access Denied: Registration for ${target.studentName} was cancelled.` };
    }

    if (target.checkInStatus === 'checked_in') {
      return {
        success: false,
        message: `Already Checked In: ${target.studentName} checked in earlier at ${new Date(target.checkInTime || '').toLocaleTimeString()}.`,
        registration: target,
      };
    }

    const checkInTime = new Date().toISOString();
    setRegistrations((prev) =>
      prev.map((r) => (r.id === target.id ? { ...r, checkInStatus: 'checked_in', checkInTime } : r))
    );

    // Also update legacy participant if matched
    setParticipants((prev) =>
      prev.map((p) => (p.email === target.studentEmail ? { ...p, checkInStatus: 'checked_in', checkInTime } : p))
    );

    playChime('scan');
    addToast('Attendee Verified! ✓', `${target.studentName} (${target.studentIdNumber}) checked in for ${target.eventTitle}`, 'success');

    return {
      success: true,
      message: `Verified: ${target.studentName} has been checked in successfully!`,
      registration: { ...target, checkInStatus: 'checked_in', checkInTime },
    };
  };

  // -------------------------------------------------------------
  // FR17 & FR18: CERTIFICATES & FEEDBACK
  // -------------------------------------------------------------
  const generateCertificate = (registrationId: string): CertificateRecord | undefined => {
    const reg = registrations.find((r) => r.id === registrationId);
    if (!reg) return undefined;

    // Check if certificate already exists
    const existing = certificates.find((c) => c.registrationId === registrationId);
    if (existing) return existing;

    const certId = `cert-${Date.now()}`;
    const certNumber = `RUIA-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCert: CertificateRecord = {
      id: certId,
      certificateNumber: certNumber,
      registrationId: reg.id,
      eventId: reg.eventId,
      eventTitle: reg.eventTitle,
      studentId: reg.studentId,
      studentName: reg.studentName,
      studentIdNumber: reg.studentIdNumber,
      completionDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      issuerName: 'Dr. Anushree Lokur',
      issuerTitle: 'Principal, Ramnarain Ruia Autonomous College',
      verificationCode: `VERIFY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-RUIA`,
    };

    setCertificates((prev) => [newCert, ...prev]);

    // Update registration with certificateId
    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, certificateId: certId, certificateIssuedAt: new Date().toISOString() } : r))
    );

    playChime('celebrate');
    addToast('Certificate Issued! 🎓', `Official certificate ${certNumber} generated for ${reg.studentName}.`, 'success');
    return newCert;
  };

  const submitFeedback = (
    eventId: string,
    feedbackData: { rating: number; contentRating: number; venueRating: number; organizationRating: number; reviewText: string }
  ) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const newFb: EventFeedback = {
      id: `fb-${Date.now()}`,
      eventId,
      eventTitle: event.title,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      ...feedbackData,
      submittedAt: new Date().toISOString(),
    };

    setFeedbacks((prev) => [newFb, ...prev]);

    // Mark registration as feedback submitted
    setRegistrations((prev) =>
      prev.map((r) => (r.eventId === eventId && r.studentId === currentUser.id ? { ...r, feedbackSubmitted: true, feedbackRating: feedbackData.rating, feedbackComment: feedbackData.reviewText } : r))
    );

    addToast('Feedback Submitted', 'Thank you for rating this campus event!', 'success');
  };

  // -------------------------------------------------------------
  // FR19 & FR20: BOOKMARKS & VOLUNTEERS
  // -------------------------------------------------------------
  const toggleBookmark = (eventId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          const exists = u.bookmarkedEventIds.includes(eventId);
          const updated = exists
            ? u.bookmarkedEventIds.filter((id) => id !== eventId)
            : [...u.bookmarkedEventIds, eventId];

          addToast(exists ? 'Bookmark Removed' : 'Saved to Bookmarks', '', 'info');
          return { ...u, bookmarkedEventIds: updated };
        }
        return u;
      })
    );
  };

  const assignVolunteer = (eventId: string, studentId: string, role: VolunteerAssignment['role']) => {
    const event = events.find((e) => e.id === eventId);
    const student = users.find((u) => u.id === studentId);
    if (!event || !student) return;

    const newAssignment: VolunteerAssignment = {
      id: `vol-${Date.now()}`,
      eventId,
      eventTitle: event.title,
      studentId,
      studentName: student.name,
      studentEmail: student.email,
      role,
      assignedBy: currentUser.name,
      assignedAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setVolunteers((prev) => [newAssignment, ...prev]);
    addToast('Volunteer Assigned', `${student.name} assigned as ${role} for ${event.title}.`, 'success');
  };

  const removeVolunteer = (assignmentId: string) => {
    setVolunteers((prev) => prev.filter((v) => v.id !== assignmentId));
    addToast('Assignment Removed', 'Volunteer assignment revoked.', 'info');
  };

  // -------------------------------------------------------------
  // FR12 & FR14: ANNOUNCEMENTS & NOTIFICATIONS
  // -------------------------------------------------------------
  const publishAnnouncement = (data: Omit<Announcement, 'id' | 'timestamp'>) => {
    const newAnn: Announcement = {
      ...data,
      id: `ann-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setAnnouncements((prev) => [newAnn, ...prev]);

    // Create corresponding notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: data.title,
      message: data.message,
      type: 'event_update',
      timestamp: newAnn.timestamp,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    playChime(data.priority === 'critical' ? 'alert' : 'success');
    addToast(
      data.priority === 'critical' ? '🚨 Critical Alert Broadcasted' : '📢 Live Announcement Published',
      data.title,
      data.priority === 'critical' ? 'warning' : 'info'
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  // Reset demo data
  const resetToDemoData = () => {
    setUsers(INITIAL_USERS);
    setCurrentUserId('usr-student-1');
    setCurrentRole('student');
    setEvents(INITIAL_EVENTS);
    setCategories(INITIAL_CATEGORIES);
    setVenues(INITIAL_VENUES);
    setRegistrations(INITIAL_REGISTRATIONS);
    setVolunteers(INITIAL_VOLUNTEERS);
    setCertificates(INITIAL_CERTIFICATES);
    setFeedbacks(INITIAL_FEEDBACK);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setParticipants(INITIAL_PARTICIPANTS);
    setTeams(INITIAL_TEAMS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setJudges(INITIAL_JUDGES);
    setEvaluations(INITIAL_EVALUATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    localStorage.removeItem(STORAGE_KEY);
    addToast('Platform Reset', 'Reset state to official Ramnarain Ruia Autonomous College initial demo.', 'info');
  };

  // -------------------------------------------------------------
  // LEGACY HACKATHON HELPERS (Seamless continuity)
  // -------------------------------------------------------------
  const currentParticipant = participants.find((p) => p.id === currentParticipantId) || participants[0];
  const currentJudge = judges.find((j) => j.id === currentJudgeId) || judges[0];

  const checkInParticipant = (participantId: string) => {
    const target = participants.find((p) => p.id === participantId);
    if (!target) return;
    if (target.checkInStatus === 'checked_in') {
      addToast('Already Checked In', `${target.name} is already checked in.`, 'info');
      return;
    }
    const checkInTime = new Date().toISOString();
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, checkInStatus: 'checked_in', checkInTime } : p))
    );
    playChime('scan');
    addToast('Checked In', `${target.name} checked in successfully!`, 'success');
  };

  const sendConnectionRequest = (targetId: string) => {
    if (!currentParticipant || currentParticipant.id === targetId) return;
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
    addToast('Connection Sent', 'Teammate invite dispatched.', 'success');
  };

  const acceptConnectionRequest = (senderId: string) => {
    if (!currentParticipant) return;
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
    addToast('Connection Accepted', 'Teammates connected!', 'success');
  };

  const createOrUpdateTeam = (teamData: Partial<Team> & { name: string; track: string }) => {
    if (!currentParticipant) return;
    const existing = teams.find((t) => t.id === currentParticipant.teamId);
    if (existing) {
      setTeams((prev) => prev.map((t) => (t.id === existing.id ? { ...t, ...teamData } : t)));
      addToast('Team Updated', `Team "${teamData.name}" updated.`, 'success');
    } else {
      const newTeamId = `team-${Date.now()}`;
      const newTeam: Team = {
        id: newTeamId,
        name: teamData.name,
        tagline: teamData.tagline || 'Building for Ramnarain Ruia Autonomous College Hackathon',
        track: teamData.track,
        leaderId: currentParticipant.id,
        members: [{ participantId: currentParticipant.id, name: currentParticipant.name, role: currentParticipant.role, avatar: currentParticipant.avatar, isLeader: true }],
        maxMembers: 4,
        lookingForRoles: teamData.lookingForRoles || ['Frontend Dev'],
        totalEvaluations: 0,
        rank: teams.length + 1,
      };
      setTeams((prev) => [...prev, newTeam]);
      setParticipants((prev) => prev.map((p) => (p.id === currentParticipant.id ? { ...p, teamId: newTeamId, availability: 'In a Team' } : p)));
      addToast('Team Created', `"${newTeam.name}" is ready!`, 'success');
    }
  };

  const submitProject = (submissionData: Partial<ProjectSubmission> & { title: string; track: string }) => {
    if (!currentParticipant) return;
    const userTeam = teams.find((t) => t.id === currentParticipant.teamId);
    if (!userTeam) {
      addToast('Team Required', 'You must join or form a team first.', 'error');
      return;
    }
    const subId = `sub-${Date.now()}`;
    const newSub: ProjectSubmission = {
      id: subId,
      teamId: userTeam.id,
      teamName: userTeam.name,
      title: submissionData.title,
      tagline: submissionData.tagline || userTeam.tagline,
      track: submissionData.track,
      problemStatement: submissionData.problemStatement || '',
      solution: submissionData.solution || '',
      techStack: submissionData.techStack || ['React', 'TypeScript'],
      repoUrl: submissionData.repoUrl || 'https://github.com',
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      coverImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80',
    };
    setSubmissions((prev) => [newSub, ...prev]);
    setTeams((prev) => prev.map((t) => (t.id === userTeam.id ? { ...t, submissionId: subId } : t)));
    playChime('celebrate');
    addToast('Project Submitted', `"${newSub.title}" is queued for jury evaluation!`, 'success');
  };

  const submitEvaluation = (evaluationData: Omit<Evaluation, 'id' | 'evaluatedAt'>) => {
    const evalId = `eval-${Date.now()}`;
    const newEval: Evaluation = { ...evaluationData, id: evalId, evaluatedAt: new Date().toISOString() };
    setEvaluations((prev) => [...prev, newEval]);
    addToast('Score Submitted', `Awarded ${newEval.totalScore}/100 pts.`, 'success');
  };

  // -------------------------------------------------------------
  // COMPUTED METRICS (FR26)
  // -------------------------------------------------------------
  const totalEvents = events.length;
  const publishedEvents = events.filter((e) => e.status === 'published' || e.status === 'ongoing').length;
  const pendingApprovalsCount = events.filter((e) => e.status === 'pending_approval').length;
  const totalRegistrations = registrations.length;
  const checkedInAttendees = registrations.filter((r) => r.checkInStatus === 'checked_in').length;
  const checkInPercentage = totalRegistrations > 0 ? Math.round((checkedInAttendees / totalRegistrations) * 100) : 0;
  const totalRevenue = registrations.reduce((acc, curr) => acc + (curr.paymentStatus === 'paid' ? curr.paymentAmount : 0), 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const totalRegistered = participants.length;
  const checkedInCount = participants.filter((p) => p.checkInStatus === 'checked_in').length;
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
        currentUser,
        currentRole,
        setRole: setCurrentRole,
        switchUser,
        users,
        updateUserRole,
        toggleUserStatus,
        events,
        categories,
        venues,
        createDraftEvent,
        submitEventForApproval,
        approveEvent,
        rejectEvent,
        updateEvent,
        deleteEvent,
        archiveEvent,
        createOrUpdateVenue,
        deleteVenue,
        createOrUpdateCategory,
        deleteCategory,
        registrations,
        registerForEvent,
        cancelRegistration,
        updatePaymentStatus,
        checkInWithQR,
        certificates,
        generateCertificate,
        feedbacks,
        submitFeedback,
        toggleBookmark,
        volunteers,
        assignVolunteer,
        removeVolunteer,
        announcements,
        publishAnnouncement,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        addToast,
        removeToast,
        resetToDemoData,
        stats: {
          totalEvents,
          publishedEvents,
          pendingApprovalsCount,
          totalRegistrations,
          checkedInAttendees,
          checkInPercentage,
          totalRevenue,
          unreadNotificationsCount,
          totalRegistered,
          checkedInCount,
          teamsCount,
          submissionsCount,
          judgesCount,
          totalEvaluations,
          judgingProgressPercentage,
          averageScore,
        },
        eventInfo,
        participants,
        teams,
        submissions,
        judges,
        evaluations,
        activityLogs,
        currentParticipantId,
        setCurrentParticipantId,
        currentJudgeId,
        setCurrentJudgeId,
        currentParticipant,
        currentJudge,
        checkInParticipant,
        sendConnectionRequest,
        acceptConnectionRequest,
        createOrUpdateTeam,
        submitProject,
        submitEvaluation,
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
