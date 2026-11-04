import { getDisputes } from '@/lib/paypal';
import { DisputeGrid } from '@/components/DisputeGrid';
import { InboxHeader } from '@/components/InboxHeader';
import { LiveResolutionTicker } from '@/components/LiveResolutionTicker';

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
