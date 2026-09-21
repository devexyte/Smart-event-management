'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  FileText,
  Download,
  Printer,
  CheckCircle,
  Calendar,
  Users,
  Star,
  Award,
  CreditCard,
} from 'lucide-react';

export const EventReportsModal: React.FC = () => {
  const { events, registrations, feedbacks, certificates, addToast } = useEvent();
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [reportType, setReportType] = useState<
    'participants' | 'attendance' | 'feedback' | 'certificates' | 'summary'
  >('participants');

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Filter dataset by event if specific event chosen
  const currentRegistrations = registrations.filter((r) =>
    selectedEventId === 'all' ? true : r.eventId === selectedEventId
  );

  const currentFeedbacks = feedbacks.filter((f) =>
    selectedEventId === 'all' ? true : f.eventId === selectedEventId
  );

  const currentCertificates = certificates.filter((c) =>
    selectedEventId === 'all' ? true : c.eventId === selectedEventId
  );

  // Helper to trigger browser CSV download
  const downloadCSV = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Report Exported', `${filename} generated and downloaded successfully.`, 'success');
  };

  const handleExportCSV = () => {
    const eventPrefix = selectedEvent ? selectedEvent.title.replace(/\s+/g, '_') : 'All_Campus_Events';

    if (reportType === 'participants') {
      const headers = 'Registration ID,Event Title,Student Name,Student ID,Email,Category,Status,Payment Status,Amount,Date\n';
      const rows = currentRegistrations
        .map(
          (r) =>
            `"${r.id}","${r.eventTitle}","${r.studentName}","${r.studentIdNumber}","${r.studentEmail}","${r.eventCategory}","${r.status}","${r.paymentStatus}","${r.paymentAmount}","${r.registrationDate}"`
        )
        .join('\n');
      downloadCSV(`${eventPrefix}_Participant_List.csv`, headers + rows);
    } else if (reportType === 'attendance') {
      const headers = 'Registration ID,Event Title,Student Name,Student ID,Check-In Status,Check-In Timestamp,Gate Token\n';
      const rows = currentRegistrations
        .map(
          (r) =>
            `"${r.id}","${r.eventTitle}","${r.studentName}","${r.studentIdNumber}","${r.checkInStatus}","${r.checkInTime || 'N/A'}","${r.qrToken}"`
        )
        .join('\n');
      downloadCSV(`${eventPrefix}_Attendance_Roster.csv`, headers + rows);
    } else if (reportType === 'feedback') {
      const headers = 'Feedback ID,Event Title,Student Name,Overall Rating,Content Rating,Venue Rating,Organization Rating,Review Comments,Date\n';
      const rows = currentFeedbacks
        .map(
          (f) =>
            `"${f.id}","${f.eventTitle}","${f.studentName}","${f.rating}","${f.contentRating}","${f.venueRating}","${f.organizationRating}","${f.reviewText}","${f.submittedAt}"`
        )
        .join('\n');
      downloadCSV(`${eventPrefix}_Feedback_Summary.csv`, headers + rows);
    } else if (reportType === 'certificates') {
      const headers = 'Certificate ID,Certificate Number,Event Title,Student Name,Student ID,Issuer,Verification Code,Issue Date\n';
      const rows = currentCertificates
        .map(
          (c) =>
            `"${c.id}","${c.certificateNumber}","${c.eventTitle}","${c.studentName}","${c.studentIdNumber}","${c.issuerName}","${c.verificationCode}","${c.completionDate}"`
        )
        .join('\n');
      downloadCSV(`${eventPrefix}_Certificate_Issuance_Log.csv`, headers + rows);
    } else {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Event Report Generator & Analytics Export</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Aggregate attendance rosters, participant registrations, certificate logs, and feedback ratings into exportable CSV datasets.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Selected CSV Report</span>
        </button>
      </div>

      {/* Control Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs shadow-2xs">
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">Select Event Scope</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
          >
            <option value="all">All Campus Events (Global Rollup)</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">Select Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            className="w-full p-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
          >
            <option value="participants">Participant Registration Roster (CSV)</option>
            <option value="attendance">Gate Check-In & Attendance Verification (CSV)</option>
            <option value="feedback">Post-Event Feedback & Rating Analysis (CSV)</option>
            <option value="certificates">Digital Certificate Issuance Log (CSV)</option>
            <option value="summary">Executive Summary Overview (Printable)</option>
          </select>
        </div>
      </div>

      {/* Live Report Preview */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 capitalize">
              Live Preview: {reportType} Report
            </h3>
            <p className="text-[11px] text-slate-500">
              Scope: {selectedEvent ? selectedEvent.title : 'All Campus Events'} • Total records:{' '}
              {reportType === 'participants' || reportType === 'attendance'
                ? currentRegistrations.length
                : reportType === 'feedback'
                ? currentFeedbacks.length
                : currentCertificates.length}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1.5 transition-colors"
            title="Print View"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print View</span>
          </button>
        </div>

        {/* Dynamic Table Preview */}
        <div className="overflow-x-auto max-h-96 text-xs">
          {reportType === 'participants' && (
            <table className="w-full text-left divide-y divide-slate-100">
              <thead>
                <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50/50">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Student ID</th>
                  <th className="py-2.5 px-3">Event Title</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {currentRegistrations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{r.studentName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{r.studentIdNumber}</td>
                    <td className="py-2.5 px-3 truncate max-w-xs text-slate-700">{r.eventTitle}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                      {r.paymentStatus.toUpperCase()} {r.paymentAmount > 0 ? `(₹${r.paymentAmount})` : ''}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                      {new Date(r.registrationDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'attendance' && (
            <table className="w-full text-left divide-y divide-slate-100">
              <thead>
                <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50/50">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Event Title</th>
                  <th className="py-2.5 px-3">Gate Pass Token</th>
                  <th className="py-2.5 px-3">Check-In Status</th>
                  <th className="py-2.5 px-3">Check-In Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {currentRegistrations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{r.studentName}</td>
                    <td className="py-2.5 px-3 truncate max-w-xs text-slate-700">{r.eventTitle}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700">{r.qrToken}</td>
                    <td className="py-2.5 px-3">
                      {r.checkInStatus === 'checked_in' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          Not Checked In
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                      {r.checkInTime ? new Date(r.checkInTime).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'feedback' && (
            <table className="w-full text-left divide-y divide-slate-100">
              <thead>
                <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50/50">
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Event</th>
                  <th className="py-2.5 px-3">Rating</th>
                  <th className="py-2.5 px-3">Written Review</th>
                  <th className="py-2.5 px-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {currentFeedbacks.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{f.studentName}</td>
                    <td className="py-2.5 px-3 truncate max-w-xs text-slate-700">{f.eventTitle}</td>
                    <td className="py-2.5 px-3 font-bold text-amber-500">{f.rating} ★</td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-md">{f.reviewText}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                      {new Date(f.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'certificates' && (
            <table className="w-full text-left divide-y divide-slate-100">
              <thead>
                <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50/50">
                  <th className="py-2.5 px-3">Certificate #</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Event Title</th>
                  <th className="py-2.5 px-3">Verification Key</th>
                  <th className="py-2.5 px-3">Issue Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {currentCertificates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-blue-700 font-bold">{c.certificateNumber}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{c.studentName}</td>
                    <td className="py-2.5 px-3 truncate max-w-xs text-slate-700">{c.eventTitle}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">{c.verificationCode}</td>
                    <td className="py-2.5 px-3 text-slate-600">{c.completionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
