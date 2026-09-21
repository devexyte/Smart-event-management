'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { RegistrationRecord, RegistrationStatus } from '@/types';
import {
  Ticket,
  QrCode,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Star,
  RotateCcw,
  CreditCard,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { QRCodePassModal } from './QRCodePassModal';
import { CertificateModal } from './CertificateModal';
import { FeedbackModal } from './FeedbackModal';

export const MyRegistrations: React.FC = () => {
  const {
    registrations,
    currentUser,
    cancelRegistration,
    generateCertificate,
    certificates,
    addToast,
  } = useEvent();

  const [statusFilter, setStatusFilter] = useState<'all' | RegistrationStatus>('all');
  const [activeQRRegistration, setActiveQRRegistration] = useState<RegistrationRecord | null>(null);
  const [activeCertRegistration, setActiveCertRegistration] = useState<RegistrationRecord | null>(null);
  const [activeFeedbackRegistration, setActiveFeedbackRegistration] = useState<RegistrationRecord | null>(null);
  const [cancellationModalTarget, setCancellationModalTarget] = useState<RegistrationRecord | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Filter registrations for current student
  const userRegistrations = registrations.filter((r) => r.studentId === currentUser.id);

  const filteredRegistrations = userRegistrations.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const handleConfirmCancel = () => {
    if (!cancellationModalTarget) return;
    cancelRegistration(cancellationModalTarget.id, cancelReason);
    setCancellationModalTarget(null);
    setCancelReason('');
  };

  const handleOpenCertificate = (reg: RegistrationRecord) => {
    const cert = generateCertificate(reg.id);
    if (cert) {
      setActiveCertRegistration(reg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Ticket className="w-6 h-6 text-blue-400" />
            <span>My Event Registrations & Passes</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access your scannable digital entrance QR passes, check attendance verification, and claim completion certificates.
          </p>
        </div>

        {/* Status Filter Tabs (FR9) */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 shrink-0 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({userRegistrations.length})
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'confirmed'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'completed'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'cancelled'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Registrations List */}
      {filteredRegistrations.length === 0 ? (
        <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No registrations found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven't registered for any events under this category. Visit the Event Catalogue to discover upcoming campus activities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRegistrations.map((reg) => {
            const isCheckedIn = reg.checkInStatus === 'checked_in';
            const isCompleted = reg.status === 'completed' || isCheckedIn;
            const existingCert = certificates.find((c) => c.registrationId === reg.id);

            return (
              <div
                key={reg.id}
                className={`bg-[#131d31] border rounded-xl p-5 shadow-sm transition-all ${
                  reg.status === 'cancelled'
                    ? 'border-slate-800/60 opacity-75'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Event & Ticket Details */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
                        {reg.eventCategory}
                      </span>

                      {/* Status Badges (FR9) */}
                      {reg.status === 'confirmed' && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Confirmed Registration</span>
                        </span>
                      )}
                      {reg.status === 'completed' && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>Completed Event</span>
                        </span>
                      )}
                      {reg.status === 'cancelled' && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          <span>Cancelled</span>
                        </span>
                      )}

                      {/* Check-In Status Indicator (FR16) */}
                      {isCheckedIn ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center gap-1 font-mono">
                          ✓ Verified at Gate ({new Date(reg.checkInTime || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                        </span>
                      ) : reg.status !== 'cancelled' ? (
                        <span className="text-[11px] text-slate-400 font-mono">
                          Gate Pass Ready
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-base font-bold text-white truncate">
                      {reg.eventTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        {reg.eventDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {reg.eventVenue}
                      </span>
                      <span className="font-mono text-slate-500">
                        Token: {reg.qrToken}
                      </span>
                    </div>

                    {/* Payment status line (FR22) */}
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Payment:{' '}
                        <strong className="text-slate-200 uppercase font-mono">
                          {reg.paymentStatus} {reg.paymentAmount > 0 ? `(₹${reg.paymentAmount})` : '(Free)'}
                        </strong>
                      </span>
                      {reg.transactionRef && (
                        <span className="font-mono text-slate-500">Ref: {reg.transactionRef}</span>
                      )}
                    </div>

                    {reg.cancellationReason && (
                      <p className="text-xs text-rose-300 italic bg-rose-950/20 p-2 rounded-lg border border-rose-900/30">
                        Cancellation reason: {reg.cancellationReason}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Quick Actions (FR10, FR15, FR17, FR18) */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0">
                    {reg.status !== 'cancelled' && (
                      <button
                        onClick={() => setActiveQRRegistration(reg)}
                        className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View QR Pass</span>
                      </button>
                    )}

                    {/* Certificate Action (FR17) - Available if checked-in or completed */}
                    {reg.status !== 'cancelled' && (isCheckedIn || reg.status === 'completed') && (
                      <button
                        onClick={() => handleOpenCertificate(reg)}
                        className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{existingCert ? 'Certificate' : 'Claim Certificate'}</span>
                      </button>
                    )}

                    {/* Feedback Action (FR18) */}
                    {reg.status !== 'cancelled' && (isCheckedIn || reg.status === 'completed') && (
                      <button
                        onClick={() => setActiveFeedbackRegistration(reg)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                          reg.feedbackSubmitted
                            ? 'bg-slate-800 text-amber-400 border-slate-700'
                            : 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" />
                        <span>{reg.feedbackSubmitted ? `Rated (${reg.feedbackRating}★)` : 'Rate Event'}</span>
                      </button>
                    )}

                    {/* Cancellation Action (FR10) */}
                    {reg.status === 'confirmed' && !isCheckedIn && (
                      <button
                        onClick={() => setCancellationModalTarget(reg)}
                        className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-900/50 text-xs font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QR Ticket Modal (FR15) */}
      {activeQRRegistration && (
        <QRCodePassModal
          registration={activeQRRegistration}
          onClose={() => setActiveQRRegistration(null)}
        />
      )}

      {/* Certificate Modal (FR17) */}
      {activeCertRegistration && (
        <CertificateModal
          certificate={
            certificates.find((c) => c.registrationId === activeCertRegistration.id) || {
              id: 'temp',
              certificateNumber: 'RUIA-CERT-2026-9999',
              registrationId: activeCertRegistration.id,
              eventId: activeCertRegistration.eventId,
              eventTitle: activeCertRegistration.eventTitle,
              studentId: currentUser.id,
              studentName: currentUser.name,
              studentIdNumber: currentUser.studentIdNumber || 'RUIA-2026-STU',
              completionDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              issuerName: 'Dr. Anushree Lokur',
              issuerTitle: 'Principal, Ramnarain Ruia Autonomous College',
              verificationCode: 'VERIFIED-RUIA-PRINCIPAL-AUTH',
            }
          }
          onClose={() => setActiveCertRegistration(null)}
        />
      )}

      {/* Feedback Modal (FR18) */}
      {activeFeedbackRegistration && (
        <FeedbackModal
          eventId={activeFeedbackRegistration.eventId}
          eventTitle={activeFeedbackRegistration.eventTitle}
          onClose={() => setActiveFeedbackRegistration(null)}
        />
      )}

      {/* Cancellation Confirmation Modal (FR10) */}
      {cancellationModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131d31] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">Cancel Registration (FR10)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to cancel your registration for{' '}
              <strong className="text-white font-semibold">{cancellationModalTarget.eventTitle}</strong>?
            </p>

            {cancellationModalTarget.paymentAmount > 0 && (
              <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-300">
                <strong>Refund Policy:</strong> A refund of ₹{cancellationModalTarget.paymentAmount} will be automatically credited to your original payment method within 3–5 campus business days.
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Reason for Cancellation (Optional)
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Schedule conflict, academic exam, personal reason..."
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancellationModalTarget(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Keep Registration
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
