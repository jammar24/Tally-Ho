'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

interface InboxHeaderProps {
  disputesCount: number;
  actionRequiredCount: number;
  totalAtRisk: number;
}

export function InboxHeader({
  disputesCount,
  actionRequiredCount,
  totalAtRisk,
}: InboxHeaderProps) {
  const { t } = useApp();

  return (
    <div>
      {/* Top Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('inbox.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('inbox.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            ● {t('inbox.mode')}
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t('inbox.kpi.active')}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              {disputesCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Sandbox</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            {t('inbox.kpi.action')}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-900 dark:text-amber-300 font-mono">
              {actionRequiredCount}
            </span>
            <span className="text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              {t('inbox.kpi.actionNeeded')}
            </span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t('inbox.kpi.atRisk')}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              ${totalAtRisk.toFixed(2)}{' '}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">USD</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Gross</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t('inbox.kpi.verified')}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              100%
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {t('inbox.kpi.textLayer')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

