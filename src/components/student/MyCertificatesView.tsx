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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-blue-600" />
            <span>My Verified Digital Certificates</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official verifiable credentials issued by Ramnarain Ruia Autonomous College for attended and completed campus events.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          {studentCerts.length} Verified Certificate{studentCerts.length === 1 ? '' : 's'}
        </span>
      </div>

      {studentCerts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <Award className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">No certificates earned yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Certificates are issued automatically upon gate check-in and completion of eligible campus events and workshops.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studentCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-700 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                    {cert.certificateNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Credential</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {cert.eventTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Issued to: <strong className="text-slate-800">{cert.studentName}</strong> (ID: {cert.studentIdNumber})
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Issued By:</span>
                    <span className="text-slate-800 font-semibold">{cert.issuerName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Date of Completion:</span>
                    <span className="text-slate-800">{cert.completionDate}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 pt-1.5 border-t border-slate-200">
                    <span>Verification Key:</span>
                    <span className="text-slate-700 font-semibold">{cert.verificationCode}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Official Institutional PDF</span>
                <button
                  onClick={() => setActiveCert(cert)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
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
