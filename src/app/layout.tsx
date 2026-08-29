import type { Metadata, Viewport } from 'next';
import './globals.css';
import { EventProvider } from '@/context/EventContext';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'EventFlow — Smart Event Management Platform | TechNova 2026',
  description:
    'A unified operating system for hackathons and technical conferences. Seamlessly connects Registration, QR Check-in, Smart Team Matchmaking, Project Submissions, Structured Judging, and Real-time Leaderboards.',
  keywords: 'hackathon management, smart event platform, QR check-in, hackathon judging, team formation, TechNova 2026',
  authors: [{ name: 'EventFlow Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080c15] text-slate-100 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        <EventProvider>
          {children}
          <ToastContainer />
        </EventProvider>
      </body>
    </html>
  );
}
