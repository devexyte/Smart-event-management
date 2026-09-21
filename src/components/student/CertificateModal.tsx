'use client';

import React from 'react';
import { CertificateRecord } from '@/types';
import { X, Award, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateRecord;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#131d31] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-6">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">
              Digital Certificate of Participation (FR17)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Printable Certificate Canvas */}
        <div className="printable-certificate bg-[#fcfdfd] text-slate-900 p-8 sm:p-10 rounded-xl border-4 border-double border-slate-700 relative overflow-hidden shadow-inner font-serif">
          {/* Watermark / Background stamp */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-slate-900" />
          </div>

          <div className="text-center relative z-10 space-y-4">
            {/* Institution Crest Header */}
            <div>
              <span className="text-xs tracking-widest font-sans uppercase font-bold text-blue-900 block mb-1">
                RAMNARAIN RUIA AUTONOMOUS COLLEGE • MATUNGA, MUMBAI
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-slate-900 uppercase">
                Certificate of Participation
              </h2>
              <div className="w-24 h-0.5 bg-amber-600 mx-auto mt-2" />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 italic pt-2">
              This certificate is proudly presented to
            </p>

            {/* Recipient Name */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 underline decoration-amber-500/60 decoration-2 underline-offset-8">
                {certificate.studentName}
              </h3>
              <p className="text-xs font-sans text-slate-500 mt-2 font-mono">
                Student ID: {certificate.studentIdNumber}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
              for active participation and successful completion of
            </p>

            {/* Event Name */}
            <h4 className="text-base sm:text-lg font-bold text-slate-900 max-w-md mx-auto">
              "{certificate.eventTitle}"
            </h4>

            <p className="text-xs text-slate-600 italic">
              held under the auspices of Ramnarain Ruia Autonomous College on {certificate.completionDate}.
            </p>

            {/* Signatures & Verification Seal */}
            <div className="pt-8 grid grid-cols-2 gap-6 items-end text-center font-sans border-t border-slate-300 mt-6">
              <div>
                <div className="w-36 h-10 mx-auto flex items-center justify-center border-b border-slate-400">
                  <span className="font-serif italic text-base text-slate-800">Dr. Anushree Lokur</span>
                </div>
                <p className="text-[11px] font-bold text-slate-900 mt-1">{certificate.issuerName}</p>
                <p className="text-[10px] text-slate-500">{certificate.issuerTitle}</p>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Authenticity</span>
                </div>
                <p className="text-[10px] font-mono text-slate-600 mt-1">
                  Cert #{certificate.certificateNumber}
                </p>
                <p className="text-[9px] font-mono text-slate-400">
                  Ref: {certificate.verificationCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 no-print">
          <span className="text-xs text-slate-400 font-mono">
            Unique Verification Key: {certificate.verificationCode}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
