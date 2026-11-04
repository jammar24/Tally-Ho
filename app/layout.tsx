import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { SandboxBanner } from '@/components/SandboxBanner';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'DisputeDesk — AI Agent for PayPal Sandbox Disputes',
  description:
    'A human-approved AI agent that reads merchant evidence and answers PayPal disputes with verifiable facts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased flex flex-col font-sans transition-colors">
        <AppProvider>
          <SandboxBanner />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
