import { getDisputes } from '@/lib/paypal';
import nextDynamic from 'next/dynamic';
import { InboxHeader } from '@/components/InboxHeader';
import { LiveResolutionTicker } from '@/components/LiveResolutionTicker';

const DisputeGrid = nextDynamic(
  () => import('@/components/DisputeGrid').then((mod) => mod.DisputeGrid),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs text-slate-400 animate-pulse">
        Cargando bandeja de disputas...
      </div>
    ),
  }
);

export const dynamic = 'force-dynamic';

export default async function DisputesPage() {
  const disputes = await getDisputes();
  const totalAtRisk = disputes.reduce((sum, d) => sum + parseFloat(d.amount.value || '0'), 0);
  const actionRequiredCount = disputes.filter((d) => d.status === 'WAITING_FOR_SELLER_RESPONSE').length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-colors">
      <InboxHeader
        disputesCount={disputes.length}
        actionRequiredCount={actionRequiredCount}
        totalAtRisk={totalAtRisk}
      />

      {/* Live Stream Activity Ticker */}
      <LiveResolutionTicker />

      {/* Main Dispute Table with AG Grid */}
      <div>
        <DisputeGrid disputes={disputes} />
      </div>
    </main>
  );
}
