import type { Metadata, Viewport } from 'next';
import './globals.css';
import { EventProvider } from '@/context/EventContext';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'Smart Event Management Portal | Ramnarain Ruia Autonomous College',
  description:
    'Official smart campus event management portal of Ramnarain Ruia Autonomous College, Matunga, Mumbai. Unified event discovery, registrations, attendance check-in, and verified certificates.',
  keywords: 'Ramnarain Ruia College, event management, campus events, Ruia college festivals, college registrations, student activities',
  authors: [{ name: 'Ramnarain Ruia Autonomous College' }],
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
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-blue-600 selection:text-white">
        <EventProvider>
          {children}
          <ToastContainer />
        </EventProvider>
      </body>
    </html>
  );
}
