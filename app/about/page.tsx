'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function AboutPage() {
  const { t, language } = useApp();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 transition-colors">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t('about.title')}
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 mt-2">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Mission */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('about.mission.title')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t('about.mission.text')}
        </p>
      </section>

      {/* Technology Stack Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('about.tech.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
              Frontend &amp; Framework
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Next.js 14 App Router
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              TypeScript 5, Tailwind CSS with full dark mode support, and AG Grid Community for enterprise-grade dispute tables.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              AI Engine &amp; Vision
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Provider-Agnostic LLM
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Direct Gemini REST adapter with multimodal inline parsing, exact PDF text-layer verification, and 100% prompt injection resistance.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-1">
              Payments Platform
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              PayPal Developer Sandbox
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              OAuth 2.0, Customer Disputes APIv1, Orders v2 simulation, and Provide-Evidence endpoint integration with hard sandbox isolation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="p-8 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-950 dark:text-blue-100">
            {language === 'es' ? '¿Listo para ver el agente en acción?' : 'Ready to see the agent in action?'}
          </h3>
          <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
            {language === 'es'
              ? 'Explora la bandeja de disputas y analiza los casos con evidencia verificable.'
              : 'Explore the disputes inbox and analyze cases with verifiable evidence.'}
          </p>
        </div>
        <Link
          href="/disputes"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          {t('home.hero.cta.inbox')}
        </Link>
      </div>
    </main>
  );
}

