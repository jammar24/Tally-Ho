'use client';

import React from 'react';
import { ClaimCheck } from '@/lib/schemas';
import { useApp } from '@/context/AppContext';

interface ClaimTableProps {
  claimChecks: ClaimCheck[];
}

export function ClaimTable({ claimChecks }: ClaimTableProps) {
  const { t, language } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {t('case.claims')}
        </h3>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {language === 'es' ? 'Evaluado por Reglas' : 'Rule-Based Engine'}
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {claimChecks.map((claim, idx) => {
          const statusConfig = {
            contradicted: {
              label: language === 'es' ? 'Contradicho por Evidencia' : 'Contradicted by Evidence',
              bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
              icon: '✓',
            },
            supported: {
              label: language === 'es' ? 'Respaldado por Evidencia' : 'Supported by Evidence',
              bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800',
              icon: '✗',
            },
            unverifiable: {
              label: language === 'es' ? 'No Comprobable / Faltante' : 'Unverifiable / Missing',
              bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
              icon: '?',
            },
          }[claim.status] || {
            label: claim.status,
            bg: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
            icon: '•',
          };

          return (
            <div key={idx} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase">
                      {claim.claimType.replace(/_/g, ' ')}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${statusConfig.bg}`}
                    >
                      <span>{statusConfig.icon}</span>
                      <span>{statusConfig.label}</span>
                    </span>
                  </div>
                  <p className="text-sm text-slate-900 dark:text-slate-100 font-medium break-words">
                    {claim.claimText}
                  </p>
                  {claim.reasoning && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 break-words">
                      {claim.reasoning}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1 shrink-0">
                  {claim.factIds.map((fid) => (
                    <span
                      key={fid}
                      className="text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded"
                    >
                      {fid}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {claimChecks.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-500">
            No claims processed.
          </div>
        )}
      </div>
    </div>
  );
}
