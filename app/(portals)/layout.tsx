import { AppProvider } from '@/context/AppContext';
import { SandboxBanner } from '@/components/SandboxBanner';

/**
 * Layout for portal windows (Merchant / Customer / Admin).
 * These pages open in a new tab (_blank) so they get their own
 * minimal shell — no global Navbar or Footer.
 * Each portal page renders its own <PortalNavBar> at the top.
 */
export default function PortalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SandboxBanner />
      <div className="flex-1 flex flex-col">{children}</div>
    </>
  );
}

