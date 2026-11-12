'use client';

import React from 'react';
import { Fact } from '@/lib/schemas';
import { useApp } from '@/context/AppContext';

interface DocViewerProps {
  facts: Fact[];
}

export function DocViewer({ facts }: DocViewerProps) {
  const { t } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {t('case.facts')}
        </h3>
        <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          {t('case.verifiable')}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {facts.map((fact) => (
          <div
            key={fact.id}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                  {fact.id}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {fact.kind.replace(/_/g, ' ')}
                </span>
              </div>

              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                  fact.verification === 'text-layer'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : fact.verification === 'code'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                }`}
              >
                {fact.verification}
              </span>
            </div>

            <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono my-1 break-words break-all">
              {fact.value}
            </div>

            {fact.source.quote && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 bg-emerald-50/60 dark:bg-emerald-950/40 border-l-2 border-emerald-500 pl-2 py-1 font-mono break-words">
                <span className="text-slate-400 block text-[10px] uppercase font-sans">
                  Quote:
                </span>
                &quot;{fact.source.quote}&quot;
              </div>
            )}

            <div className="mt-1.5 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-1 break-all">
              <span>Source: {fact.source.docId || fact.source.tool}</span>
              {fact.source.page && <span>Page {fact.source.page}</span>}
            </div>
          </div>
        ))}

        {facts.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400">
            No facts extracted. Click &quot;Analyze with AI&quot; to inspect case documents.
          </div>
        )}
      </div>
    </div>
  );
}
