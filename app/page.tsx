'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  IconBolt,
  IconStore,
  IconUser,
  IconAward,
  IconFile,
  IconScale,
  IconEdit,
  IconShield,
  IconEye,
  IconArrowRight,
  IconCheckCircle,
} from '@/components/Icons';

export default function HomePage() {
  const { t, user } = useApp();

  const previewCases = [
    {
      id: 'PP-D-7001',
      reason: 'Item Not Received (INR)',
      amount: '$149.99 USD',
      status: 'Action Required',
      due: 'Nov 10, 2026',
      badge: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'PP-D-7004',
      reason: 'Not As Described (SNAD)',
      amount: '$220.00 USD',
      status: 'Action Required',
      due: 'Nov 09, 2026',
      badge: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    },
    {
      id: 'PP-D-7005',
      reason: 'Duplicate Transaction',
      amount: '$75.00 USD',
      status: 'Action Required',
      due: 'Nov 12, 2026',
      badge: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-slate-800/80 py-16 sm:py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-6 shadow-xs">
            <IconAward size={14} className="text-blue-600 dark:text-blue-400" />
            <span>{t('home.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {t('home.hero.title')}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/disputes"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs hover:shadow-md transition-all text-xs flex items-center justify-center gap-2"
            >
              <IconBolt size={15} />
              <span>{t('home.hero.cta.inbox')}</span>
            </Link>
            <Link
              href="/auth"
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-xs flex items-center justify-center gap-2"
            >
              <IconStore size={15} className="text-blue-600 dark:text-blue-400" />
              <span>{t('nav.merchant')}</span>
            </Link>
            <Link
              href="/auth"
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-xs flex items-center justify-center gap-2"
            >
              <IconUser size={15} className="text-purple-600 dark:text-purple-400" />
              <span>{t('nav.portal')}</span>
            </Link>
            <Link
              href="/auth"
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-xs flex items-center justify-center gap-2"
            >
              <IconShield size={15} />
              <span>PayPal Connect</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-2xl font-black text-slate-900 dark:text-white block font-mono">
                10
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t('home.stats.disputes')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block font-mono">
                100%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t('home.stats.accuracy')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block font-mono">
                100%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t('home.stats.injection')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block font-mono">
                0%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t('home.stats.guard')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-16 bg-slate-50/60 dark:bg-slate-950/40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('home.pillars.title')}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('home.pillars.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-blue-400/70 dark:hover:border-blue-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4 border border-blue-100 dark:border-blue-900">
                <IconFile size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('home.p1.title')}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('home.p1.desc')}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-emerald-400/70 dark:hover:border-emerald-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 border border-emerald-100 dark:border-emerald-900">
                <IconScale size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('home.p2.title')}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('home.p2.desc')}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-purple-400/70 dark:hover:border-purple-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4 border border-purple-100 dark:border-purple-900">
                <IconEdit size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('home.p3.title')}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('home.p3.desc')}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-amber-400/70 dark:hover:border-amber-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4 border border-amber-100 dark:border-amber-900">
                <IconShield size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('home.p4.title')}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('home.p4.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Cases Preview Section */}
      <section className="py-14 bg-white dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t('home.demo.title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('home.demo.subtitle')}
              </p>
            </div>

            <Link
              href="/disputes"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              <span>{t('home.demo.viewAll')}</span>
              <IconArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {previewCases.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                      {c.id}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {c.reason}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Due: {c.due}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                    {c.amount}
                  </span>
                  <Link
                    href={`/disputes/${c.id}`}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <IconEye size={13} />
                    <span>Inspect</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
