'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { IconEye } from '@/components/Icons';

interface LiveEvent {
  id: string;
  disputeId: string;
  type: 'read' | 'contradiction' | 'draft' | 'approval';
  messageEn: string;
  messageEs: string;
  timestamp: string;
  statusBadge: string;
}

export function LiveResolutionTicker() {
  const { t, language } = useApp();
  const [filter, setFilter] = useState<'all' | 'contradiction' | 'approval'>('all');

  const liveEvents: LiveEvent[] = [
    {
      id: 'EV-101',
      disputeId: 'PP-D-7001',
      type: 'contradiction',
      messageEn: 'Contradicted buyer claim "never received": FedEx #1Z9999999999999999 confirms delivery to front porch.',
      messageEs: 'Reclamo "no recibido" contradicho: FedEx #1Z9999999999999999 confirma entrega en puerta principal.',
      timestamp: language === 'es' ? 'Ahora' : 'Just now',
      statusBadge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900',
    },
    {
      id: 'EV-102',
      disputeId: 'PP-D-7004',
      type: 'draft',
      messageEn: 'Zero-hallucination draft response compiled with 100% cited token {{fact:F1}}.',
      messageEs: 'Borrador sin alucinaciones compilado con marcador citado {{fact:F1}} al 100%.',
      timestamp: language === 'es' ? 'Hace 2 min' : '2 min ago',
      statusBadge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900',
    },
    {
      id: 'EV-103',
      disputeId: 'PP-D-7001',
      type: 'approval',
      messageEn: 'Merchant human-in-the-loop approved package. Registered via PayPal Provide-Evidence API (Sandbox Dry-Run).',
      messageEs: 'Aprobación humana completada. Registrado vía PayPal Provide-Evidence API (Sandbox Dry-Run).',
      timestamp: language === 'es' ? 'Hace 5 min' : '5 min ago',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900',
    },
    {
      id: 'EV-104',
      disputeId: 'PP-D-7005',
      type: 'read',
      messageEn: 'Extracted order receipts from PDF text layer: Confirmed 2 separate transaction invoices.',
      messageEs: 'Recibos extraídos de la capa de texto del PDF: Confirmadas 2 facturas de compra distintas.',
      timestamp: language === 'es' ? 'Hace 8 min' : '8 min ago',
      statusBadge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-900',
    },
  ];

  const filteredEvents = liveEvents.filter((ev) => {
    if (filter === 'all') return true;
    return ev.type === filter;
  });

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
      {/* Stream Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span>{t('live.title')}</span>
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 font-bold">
                {t('live.activeBadge')}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('live.subtitle')}
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#0070BA] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {language === 'es' ? 'Todos' : 'All'}
          </button>
          <button
            onClick={() => setFilter('contradiction')}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              filter === 'contradiction'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {language === 'es' ? 'Contradicciones' : 'Contradictions'}
          </button>
          <button
            onClick={() => setFilter('approval')}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              filter === 'approval'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {language === 'es' ? 'Aprobados' : 'Approved'}
          </button>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-2.5">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-start sm:items-center gap-3">
              <Link
                href={`/disputes/${ev.disputeId}`}
                className="font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
              >
                {ev.disputeId}
              </Link>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {language === 'es' ? ev.messageEs : ev.messageEn}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <span className="font-mono text-[10px] text-slate-400">
                {ev.timestamp}
              </span>
              <Link
                href={`/disputes/${ev.disputeId}`}
                className="px-3 py-1 rounded-full bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-blue-300 border border-[#0070BA]/30 hover:bg-[#0070BA] hover:text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-2xs"
              >
                <IconEye size={12} />
                <span>{language === 'es' ? 'Ver Caso' : 'Inspect'}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

