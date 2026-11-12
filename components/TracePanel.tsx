'use client';

import React from 'react';
import { AgentStep } from '@/lib/schemas';
import { useApp } from '@/context/AppContext';

interface TracePanelProps {
  trace: AgentStep[];
  origin: 'live' | 'cached';
  modelInfo?: { provider: string; primary: string };
}

export function TracePanel({ trace, origin, modelInfo }: TracePanelProps) {
  const { t, language } = useApp();

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
            {t('case.trace')}
          </h3>
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            origin === 'cached'
              ? 'bg-amber-950/60 text-amber-300 border-amber-800'
              : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
          }`}
        >
          {origin === 'cached' ? t('case.trace.cached') : t('case.trace.live')}
        </span>
      </div>

      {modelInfo && (
        <div className="text-[11px] text-slate-400 font-mono mb-3 bg-slate-950/50 p-2 rounded-xl border border-slate-800 break-words break-all">
          {language === 'es' ? 'Proveedor:' : 'Provider:'}{' '}
          <span className="text-slate-200">{modelInfo.provider}</span> •{' '}
          {language === 'es' ? 'Modelo:' : 'Model:'}{' '}
          <span className="text-slate-200">{modelInfo.primary}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-mono">
        {trace.map((step) => (
          <div
            key={step.n}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-blue-400 font-bold break-all">
                {language === 'es' ? 'Paso' : 'Step'} {step.n}: <span className="text-white">{step.tool}</span>
              </span>
              <span className="text-slate-400 text-[10px] shrink-0">{step.ms}ms</span>
            </div>

            <div className="text-slate-400 text-[11px] mb-1 break-words break-all">
              <span className="text-slate-500">args:</span> {step.argsSummary}
            </div>

            <div className="text-emerald-400 text-[11px] bg-slate-900/60 p-1.5 rounded-lg break-words break-all">
              <span className="text-slate-500">output:</span> {step.resultSummary}
            </div>
          </div>
        ))}

        {trace.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-xs">
            {language === 'es' ? 'No hay traza disponible para este caso.' : 'No trace available for this case.'}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800 mt-2 text-[10px] text-slate-500 text-center font-mono">
        {t('case.trace.bounded')}
      </div>
    </div>
  );
}
