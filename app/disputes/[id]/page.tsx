import { getDisputeById } from '@/lib/paypal';
import { notFound } from 'next/navigation';
import { CaseView } from '@/components/CaseView';
import fs from 'fs';
import path from 'path';
import { EvidencePackage } from '@/lib/schemas';

interface DisputePageProps {
  params: {
    id: string;
  };
}

export default async function DisputePage({ params }: DisputePageProps) {
  const dispute = await getDisputeById(params.id);

  if (!dispute) {
    notFound();
  }

  // Load cached analysis if available
  let cachedPackage: EvidencePackage | null = null;
  try {
    const demoAnalysesPath = path.join(process.cwd(), 'data', 'demo-analyses.json');
    if (fs.existsSync(demoAnalysesPath)) {
      const raw = fs.readFileSync(demoAnalysesPath, 'utf-8');
      const analyses = JSON.parse(raw);
      if (analyses[params.id]) {
        cachedPackage = analyses[params.id];
      }
    }
  } catch (e) {
    console.error('Error loading cached analysis:', e);
  }

  return <CaseView dispute={dispute} initialPackage={cachedPackage} />;
}

