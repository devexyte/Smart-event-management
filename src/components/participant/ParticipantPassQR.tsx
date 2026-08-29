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
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-400" />
            Digital Event Pass & Check-In QR
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Present this scannable QR badge at the registration desk for instant entry & badge verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPass}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Badge</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Digital Pass Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Pass Visual (Holographic Card Effect) */}
        <div className="md:col-span-7 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle glowing accents */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header of Pass */}
          <div className="relative z-10 flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white tracking-tight">{eventInfo.name}</h3>
                <p className="text-[10px] text-slate-400 font-mono">OFFICIAL ATTENDEE PASS</p>
              </div>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border shadow-sm ${
                isCheckedIn
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isCheckedIn ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
              {isCheckedIn ? 'VERIFIED' : 'PENDING CHECK-IN'}
            </div>
          </div>

          {/* Body: Participant Info + Scannable QR Code */}
          <div className="relative z-10 my-6 flex flex-col sm:flex-row items-center gap-6">
            {/* High Definition QR Code container */}
            <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-indigo-500/20">
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
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-md"
                />
                <div>
                  <h4 className="font-bold text-base text-white">{currentParticipant.name}</h4>
                  <p className="text-xs text-indigo-300 font-medium">{currentParticipant.role}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 text-xs">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-300">
                  <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{currentParticipant.primaryTrack}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{eventInfo.dates}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">{eventInfo.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar of Pass */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>TOKEN: {currentParticipant.qrToken}</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Shield className="w-3 h-3 text-indigo-400" /> SECURE-ID
            </span>
          </div>
        </div>

        {/* Right Column: Check-in Actions & Instructions */}
        <div className="md:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-sm text-white">Check-in Status & Verification</h3>

            {isCheckedIn ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Check-in Complete!</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your event wristband and welcome swag bag have been issued. You have full venue & mentor pod access.
                </p>
                <div className="text-[11px] font-mono text-emerald-400 pt-1">
                  Checked In: {currentParticipant.checkInTime ? new Date(currentParticipant.checkInTime).toLocaleTimeString() : 'Verified'}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-xs text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Pending Organizer Verification</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Scan this QR code at the TechNova registration desk or use the demo simulator button below to check in right now.
                </p>

                {/* Quick Demo Check-in Simulator Trigger */}
                <button
                  onClick={() => checkInParticipant(currentParticipant.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Desk Check-in</span>
                </button>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
              <p className="font-semibold text-slate-300">Check-in Perks Unlocked:</p>
              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-slate-400">
                <li>Hardware lab & GPU compute cluster credentials</li>
                <li>Meal vouchers & midnight energy cafe access</li>
                <li>Exclusive mentor 1-on-1 breakout reservations</li>
                <li>Official TechNova 2026 digital certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
