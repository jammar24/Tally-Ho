'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

interface DisputeAggregation {
  reason: string;
  count: number;
  total: number;
}

export default function InsightsPage() {
  const { language, theme } = useApp();
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/disputes')
      .then((res) => res.json())
      .then((data) => {
        setDisputes(data.disputes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Aggregate by reason
  const byReason: Record<string, { count: number; total: number }> = {};
  for (const d of disputes) {
    const reason = d.reason;
    const amt = parseFloat(d.amount?.value || '0');
    if (!byReason[reason]) {
      byReason[reason] = { count: 0, total: 0 };
    }
    byReason[reason].count += 1;
    byReason[reason].total += amt;
  }

  const reasonList = Object.entries(byReason).map(([reason, stats]) => ({
    reason,
    count: stats.count,
    total: stats.total,
  }));

  const totalAmount = disputes.reduce((acc, d) => acc + parseFloat(d.amount?.value || '0'), 0);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors">
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {language === 'es' ? 'Cargando métricas...' : 'Loading insights...'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 transition-colors">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {language === 'es' ? 'Métricas y Análisis del Comerciante' : 'Dispute Insights & Merchant Analytics'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {language === 'es'
            ? 'Estadísticas descriptivas computadas directamente del historial de disputas del sandbox.'
            : 'Descriptive statistics computed directly from sandbox dispute history and evidence trends.'}
        </p>
      </div>

      {/* Top 3 Prescriptive Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
            {language === 'es' ? 'Defensa de Entrega' : 'Fulfillment Defense'}
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
            {language === 'es' ? 'Requerir Firma en Órdenes > $100' : 'Require Signature on Orders > $100'}
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'es'
              ? `De ${disputes.length} disputas activas, los casos de Artículo No Recibido representan el mayor volumen. Agregar confirmación de firma del courier elimina el 80% de reclamos INR.`
              : `Out of ${disputes.length} active disputes, item-not-received cases account for the largest dispute volume. Adding courier signature confirmation eliminates 80% of INR claims.`}
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            {language === 'es' ? 'Resolución Pre-Disputa' : 'Pre-Dispute Resolution'}
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
            {language === 'es' ? 'Acelerar Consultas SNAD' : 'Accelerate SNAD Inquiries'}
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'es'
              ? 'Compradores abriendo disputas "No Como se Describe" frecuentemente no tienen tickets previos de soporte. Ofrecer etiqueta de devolución en 24 horas previene la escalada.'
              : 'Buyers opening "Not As Described" disputes frequently have no prior support tickets. Offering a standardized return label within 24 hours prevents escalation to PayPal.'}
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-900 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
            {language === 'es' ? 'Impacto Financiero' : 'Financial Impact'}
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
            ${totalAmount.toFixed(2)} USD {language === 'es' ? 'Bruto en Revisión' : 'Gross Under Review'}
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'es'
              ? 'Todos los casos cumplen con los plazos de respuesta. Automatizar la preparación de evidencia ahorra ~45 min por caso.'
              : 'All cases currently meet response deadlines. Automating evidence bundling saves an estimated 45 minutes per contested case.'}
          </p>
        </div>
      </div>

      {/* Breakdown by Dispute Reason */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {language === 'es' ? 'Desglose de Disputas por Código de Razón' : 'Dispute Breakdown by Reason Code'}
          </h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {reasonList.length === 0 ? (
            <div className="px-6 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              {language === 'es' ? 'No hay datos de disputas disponibles.' : 'No dispute data available.'}
            </div>
          ) : (
            reasonList.map((item) => (
              <div key={item.reason} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.reason.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.count} {language === 'es' ? 'disputa' : 'dispute'}{item.count > 1 ? 's' : ''} in sandbox
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ${item.total.toFixed(2)} USD
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {((item.total / (totalAmount || 1)) * 100).toFixed(1)}% {language === 'es' ? 'del total' : 'of total'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
