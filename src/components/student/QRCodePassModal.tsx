'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RegistrationRecord } from '@/types';
import { X, QrCode, Calendar, MapPin, CheckCircle2, AlertCircle, Download, Printer } from 'lucide-react';

interface QRCodePassModalProps {
  registration: RegistrationRecord;
  onClose: () => void;
}

export const QRCodePassModal: React.FC<QRCodePassModalProps> = ({
  registration,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 no-print">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Digital Entrance Pass
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Card */}
        <div className="printable-pass bg-[#f8fafc] text-slate-900 rounded-xl p-6 border border-slate-300 shadow-xs text-center space-y-4">
          <div className="border-b border-dashed border-slate-300 pb-3">
            <span className="text-[10px] tracking-widest font-mono uppercase font-bold text-blue-700 block">
              RAMNARAIN RUIA AUTONOMOUS COLLEGE • GATE ENTRY PASS
            </span>
            <h4 className="font-bold text-base text-slate-900 mt-1 leading-snug">
              {registration.eventTitle}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold inline-block mt-1">
              {registration.eventCategory}
            </span>
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-lg border border-slate-200 inline-block shadow-xs">
            <QRCodeSVG
              value={registration.qrToken}
              size={180}
              level="H"
              includeMargin={false}
            />
          </div>

          <div>
            <span className="font-mono text-xs font-bold text-slate-800 tracking-wider block">
              {registration.qrToken}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Present this code at the gate check-in desk
            </p>
          </div>

          {/* Ticket Information Table */}
          <div className="border-t border-dashed border-slate-300 pt-3 grid grid-cols-2 gap-2 text-left text-xs text-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Attendee</span>
              <span className="font-semibold text-slate-900">{registration.studentName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Student ID</span>
              <span className="font-mono text-slate-900">{registration.studentIdNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Date</span>
              <span className="text-slate-900">{registration.eventDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Status</span>
              <span className="font-semibold text-emerald-700">
                {registration.checkInStatus === 'checked_in' ? 'Checked-In ✓' : 'Confirmed Entry'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-between gap-3 pt-1 no-print">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass / Ticket</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
