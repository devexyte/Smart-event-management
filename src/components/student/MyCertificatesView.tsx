'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { CertificateRecord } from '@/types';
import { Award, ShieldCheck, Printer, Calendar, ExternalLink } from 'lucide-react';
import { CertificateModal } from './CertificateModal';

export const MyCertificatesView: React.FC = () => {
  const { certificates, currentUser, registrations } = useEvent();
  const [activeCert, setActiveCert] = useState<CertificateRecord | null>(null);

  // Filter certificates belonging to current student
  const studentCerts = certificates.filter((c) => c.studentId === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-emerald-400" />
            <span>My Verified Digital Certificates (FR17)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official verifiable credentials issued by Ramnarain Ruia Autonomous College for attended and completed campus events.
          </p>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {studentCerts.length} Verified Certificate{studentCerts.length === 1 ? '' : 's'}
        </span>
      </div>

      {studentCerts.length === 0 ? (
        <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Award className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No certificates earned yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Certificates are issued automatically upon gate check-in and completion of eligible campus events and workshops.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studentCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#131d31] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-amber-400 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {cert.certificateNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Credential</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {cert.eventTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Issued to: <strong className="text-slate-200">{cert.studentName}</strong> (ID: {cert.studentIdNumber})
                  </p>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Issued By:</span>
                    <span className="text-slate-200 font-semibold">{cert.issuerName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date of Completion:</span>
                    <span className="text-slate-200">{cert.completionDate}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    <span>Verification Key:</span>
                    <span>{cert.verificationCode}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Official Institutional PDF</span>
                <button
                  onClick={() => setActiveCert(cert)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View & Print</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {activeCert && (
        <CertificateModal
          certificate={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
};
