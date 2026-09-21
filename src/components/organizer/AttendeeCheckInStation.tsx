'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Search,
  Camera,
  Upload,
  X,
  UserCheck,
  Clock,
  Scan,
  Calendar,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import { RegistrationRecord } from '@/types';
import jsQR from 'jsqr';

export const AttendeeCheckInStation: React.FC = () => {
  const { events, registrations, checkInWithQR, stats, addToast } = useEvent();

  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || 'all');
  const [manualToken, setManualToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'checked_in' | 'not_checked_in'>('all');
  const [lastVerifiedReg, setLastVerifiedReg] = useState<RegistrationRecord | null>(null);
  const [verificationFeedback, setVerificationFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Optical Camera Scanner States
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanningActive, setIsScanningActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Filter registrations for selected event
  const currentRegistrations = registrations.filter((r) => {
    if (selectedEventId !== 'all' && r.eventId !== selectedEventId) return false;
    if (r.status === 'cancelled') return false;
    if (statusFilter !== 'all' && r.checkInStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.studentIdNumber.toLowerCase().includes(q) ||
        r.studentEmail.toLowerCase().includes(q) ||
        r.qrToken.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalInScope = registrations.filter((r) =>
    selectedEventId === 'all' ? r.status !== 'cancelled' : r.eventId === selectedEventId && r.status !== 'cancelled'
  );
  const checkedInInScope = totalInScope.filter((r) => r.checkInStatus === 'checked_in');
  const checkInRate =
    totalInScope.length > 0 ? Math.round((checkedInInScope.length / totalInScope.length) * 100) : 0;

  // Process token verification
  const processCheckInToken = (token: string) => {
    const result = checkInWithQR(token.trim(), selectedEventId === 'all' ? undefined : selectedEventId);
    setVerificationFeedback(result);
    if (result.registration) {
      setLastVerifiedReg(result.registration);
    }
    return result;
  };

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualToken.trim()) return;
    processCheckInToken(manualToken);
    setManualToken('');
  };

  const handleSimulateRowScan = (token: string) => {
    processCheckInToken(token);
  };

  // Live Camera Scanner loop using jsQR
  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;

    const scanVideoFrame = () => {
      if (isCancelled) return;

      if (
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA &&
        !videoRef.current.paused
      ) {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code && code.data && code.data.trim()) {
            const token = code.data.trim();
            const res = processCheckInToken(token);
            if (res.success) {
              addToast('Gate Pass Scanned! ✓', `${res.registration?.studentName} checked in.`, 'success');
            }
            setShowCameraScanner(false);
            return;
          }
        }
      }

      animationFrameId = requestAnimationFrame(scanVideoFrame);
    };

    if (showCameraScanner) {
      setCameraError(null);
      setIsScanningActive(true);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          })
          .then((stream) => {
            if (isCancelled) {
              stream.getTracks().forEach((t) => t.stop());
              return;
            }
            streamRef.current = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.setAttribute('playsinline', 'true');
              videoRef.current.play().then(() => {
                animationFrameId = requestAnimationFrame(scanVideoFrame);
              }).catch((e) => {
                console.warn('Video play error', e);
              });
            }
          })
          .catch((err) => {
            console.warn('Camera error', err);
            setCameraError(
              'Unable to access camera. Please allow camera permissions, or use image upload / token input.'
            );
            setIsScanningActive(false);
          });
      } else {
        setCameraError('Camera API is not supported on this browser. Please use token input or image upload.');
        setIsScanningActive(false);
      }
    }

    return () => {
      isCancelled = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsScanningActive(false);
    };
  }, [showCameraScanner, selectedEventId]);

  // Image upload decoding via jsQR
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code && code.data) {
            processCheckInToken(code.data);
          } else {
            setVerificationFeedback({
              success: false,
              message: 'No readable QR code found in uploaded image. Please ensure the QR pass is clear.',
            });
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <QrCode className="w-6 h-6 text-blue-600" />
            <span>Gate QR Scanner & Attendance Verification</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time optical scanner, ticket token verification, duplicate prevention, and attendance recording.
          </p>
        </div>

        {/* Event Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <Calendar className="w-4 h-4 text-slate-500" />
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="py-2 px-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-blue-600 max-w-xs font-medium"
          >
            <option value="all">All Campus Events</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Verification Terminal & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Scanner Terminal */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scan className="w-4 h-4 text-blue-600" />
              <span>Gate Entrance Scanner Console</span>
            </h3>

            {/* Scanner Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCameraScanner(true)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Open Optical Camera Scanner</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Scan Image Pass</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Manual Input Form */}
          <form onSubmit={handleManualCheckIn} className="flex gap-2">
            <input
              type="text"
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              placeholder="Scan barcode or paste student pass token (e.g. RUIA26-EVT1-AARAV-CS084)..."
              className="flex-1 p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Verify Attendee</span>
            </button>
          </form>

          {/* Verification Feedback Banner */}
          {verificationFeedback && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3.5 text-xs transition-all ${
                verificationFeedback.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {verificationFeedback.success ? (
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{verificationFeedback.message}</p>
                {lastVerifiedReg && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Student Name</span>
                      <strong className="text-slate-900">{lastVerifiedReg.studentName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Student ID</span>
                      <span className="font-mono text-slate-800">{lastVerifiedReg.studentIdNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Event Venue</span>
                      <span className="truncate text-slate-800">{lastVerifiedReg.eventVenue || 'Ruia Campus'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Gate Status</span>
                      <span className="font-semibold text-emerald-700">Verified Entry ✓</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setVerificationFeedback(null)}
                className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Check-in Metric Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 block font-medium uppercase tracking-wider">
              Gate Check-In Velocity
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {checkedInInScope.length}
              </span>
              <span className="text-sm text-slate-500">/ {totalInScope.length} registered</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Verified Rate</span>
              <span className="font-mono text-blue-600 font-bold">{checkInRate}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${checkInRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Attendee Check-In Roster Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by student name, ID number, or token..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalInScope.length})
            </button>
            <button
              onClick={() => setStatusFilter('checked_in')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'checked_in'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Checked In ({checkedInInScope.length})
            </button>
            <button
              onClick={() => setStatusFilter('not_checked_in')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'not_checked_in'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({totalInScope.length - checkedInInScope.length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left divide-y divide-slate-100">
            <thead>
              <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50/50">
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-3">Student ID</th>
                <th className="py-2.5 px-3">Event Title</th>
                <th className="py-2.5 px-3">QR Token</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Gate Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {currentRegistrations.map((r) => {
                const isCheckedIn = r.checkInStatus === 'checked_in';

                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{r.studentName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{r.studentIdNumber}</td>
                    <td className="py-2.5 px-3 truncate max-w-xs text-slate-700">{r.eventTitle}</td>
                    <td className="py-2.5 px-3 font-mono text-blue-700 text-[11px]">{r.qrToken}</td>
                    <td className="py-2.5 px-3">
                      {isCheckedIn ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Checked In</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 w-fit block">
                          Pending Gate
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {!isCheckedIn ? (
                        <button
                          onClick={() => handleSimulateRowScan(r.qrToken)}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-2xs flex items-center gap-1 ml-auto"
                        >
                          <Scan className="w-3 h-3" />
                          <span>Check-In</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Verified'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Optical Camera Scanner Modal */}
      {showCameraScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900">
                <Camera className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base">Optical QR Gate Scanner</h3>
              </div>
              <button
                onClick={() => setShowCameraScanner(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Point your camera at the attendee's physical ticket or mobile screen QR pass.
            </p>

            {cameraError ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 space-y-2">
                <p className="font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  {cameraError}
                </p>
                <p className="text-[11px] text-rose-600">
                  Tip: You can use the "Scan Image Pass" button to upload a pass screenshot or type the code in the terminal.
                </p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-square flex items-center justify-center shadow-inner">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />

                {/* Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-52 h-52 border-2 border-blue-500 rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
                    <div className="w-full h-0.5 bg-blue-400 absolute top-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                  </div>
                </div>

                <span className="absolute bottom-3 text-[11px] font-medium bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-full">
                  Align QR code inside the frame
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setShowCameraScanner(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
