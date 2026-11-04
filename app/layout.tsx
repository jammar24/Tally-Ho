import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { SandboxBanner } from '@/components/SandboxBanner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Tally-Ho — Dispute Engine for PayPal Sandbox Disputes',
  description:
    'A human-approved AI dispute engine that reads merchant evidence and answers PayPal disputes with verifiable facts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('disputedesk_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 antialiased flex flex-col font-sans transition-colors duration-150">
        <AppProvider>
          <SandboxBanner />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
