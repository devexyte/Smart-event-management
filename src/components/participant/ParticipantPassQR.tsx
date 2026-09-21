'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEvent } from '@/context/EventContext';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  MapPin,
  Calendar,
  Shield,
  Layers,
} from 'lucide-react';

export const ParticipantPassQR: React.FC = () => {
  const { currentParticipant, eventInfo, checkInParticipant, addToast } = useEvent();

  if (!currentParticipant) return null;

  const isCheckedIn = currentParticipant.checkInStatus === 'checked_in';

  const qrDataPayload = JSON.stringify({
    event: eventInfo.name,
    token: currentParticipant.qrToken,
    id: currentParticipant.id,
    name: currentParticipant.name,
    track: currentParticipant.primaryTrack,
    email: currentParticipant.email,
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPass = () => {
    addToast('Pass Downloaded', 'Digital Badge PNG saved to your device.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600" />
            Digital Event Pass & Check-In QR
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Present this scannable QR badge at the registration desk for instant entry & badge verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPass}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Badge</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Digital Pass Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Pass Visual (Collegiate Card) */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-3xl shadow-md overflow-hidden">
          {/* Header of Pass */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center p-0.5">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white tracking-tight">{eventInfo.name}</h3>
                <p className="text-[10px] text-blue-100 font-mono">RAMNARAIN RUIA AUTONOMOUS COLLEGE</p>
              </div>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border shadow-xs ${
                isCheckedIn
                  ? 'bg-emerald-500 text-white border-emerald-400'
                  : 'bg-amber-400 text-amber-950 border-amber-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isCheckedIn ? 'bg-white' : 'bg-amber-950 animate-pulse'}`} />
              {isCheckedIn ? 'VERIFIED' : 'PENDING CHECK-IN'}
            </div>
          </div>

          {/* Body: Participant Info + Scannable QR Code */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* High Definition QR Code container */}
              <div className="p-4 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center border-2 border-blue-200">
                <QRCodeSVG
                  value={qrDataPayload}
                  size={148}
                  level="H"
                  includeMargin={false}
                  fgColor="#090d16"
                />
                <span className="text-[9px] font-mono text-slate-800 font-bold mt-2 uppercase tracking-wider">
                  {currentParticipant.qrToken.split('-').slice(0, 2).join('-')}
                </span>
              </div>

              {/* Profile Detail on Pass */}
              <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <img
                    src={currentParticipant.avatar}
                    alt={currentParticipant.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{currentParticipant.name}</h4>
                    <p className="text-xs text-blue-600 font-medium">{currentParticipant.role}</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 text-xs">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-700">
                    <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{currentParticipant.primaryTrack}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{eventInfo.dates}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="truncate">{eventInfo.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bar of Pass */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>TOKEN: {currentParticipant.qrToken}</span>
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <Shield className="w-3 h-3 text-blue-600" /> SECURE-ID
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Check-in Actions & Instructions */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Check-in Status & Verification</h3>

            {isCheckedIn ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Check-in Complete!</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Your event wristband and welcome kit have been verified. You have full venue & lab access.
                </p>
                <div className="text-[11px] font-mono text-emerald-700 pt-1">
                  Checked In: {currentParticipant.checkInTime ? new Date(currentParticipant.checkInTime).toLocaleTimeString() : 'Verified'}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Pending Registration Desk Scan</span>
                </div>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Scan this QR code at the Ruia College registration desk or use the simulator button below for instant check-in.
                </p>

                {/* Quick Demo Check-in Simulator Trigger */}
                <button
                  onClick={() => checkInParticipant(currentParticipant.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Desk Check-in</span>
                </button>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-800">Check-in Perks Unlocked:</p>
              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-slate-600">
                <li>Ruia Tech & Innovation Lab credentials</li>
                <li>Event refreshments & cafeteria kit access</li>
                <li>Exclusive mentor 1-on-1 breakout reservations</li>
                <li>Official Ruia Autonomous College Certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
