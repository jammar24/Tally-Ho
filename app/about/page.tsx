'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { IconAward } from '@/components/Icons';

export default function AboutPage() {
  const { t, language } = useApp();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 transition-colors">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3 shadow-xs">
          <IconAward size={14} className="text-blue-600 dark:text-blue-400" />
          <span>PayPal AI Hackathon 2026</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t('about.title')}
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 mt-2">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Built By / Developer Card */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'es' ? 'Desarrollado por' : 'Built by'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'es'
              ? 'Conoce al creador detrás del desarrollo y la arquitectura de Tally-Ho'
              : 'Meet the team behind the development and architecture of Tally-Ho'}
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-md text-center space-y-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all">
          <div className="relative w-28 h-28 mx-auto">
            <img
              src="/avatar.jpg"
              alt="Jamar Masias"
              className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-white dark:border-slate-800 ring-2 ring-emerald-500/50"
            />
            <span
              className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold"
              title="Active Developer"
            >
              ✓
            </span>
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Jamar Masias
            </h3>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              @3m3r4l
            </span>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2">
              Security Engineer &amp; Full-Stack Developer
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'es'
              ? 'Creador de Tally-Ho para el PayPal AI Hackathon 2026. Especializado en flujos agenticos autónomos, validación de seguridad AST y endurecimiento de aplicaciones de misión crítica.'
              : 'Creator of Tally-Ho for the PayPal AI Hackathon 2026. Focused on autonomous agentic workflows, AST safety validation, and critical application hardening.'}
          </p>

          <div className="pt-2">
            <a
              href="https://github.com/3m3r4l"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-4">
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
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
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

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
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

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
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
      <div className="p-8 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-950 dark:text-blue-100">
            {language === 'es' ? '¿Listo para ver el motor en acción?' : 'Ready to see the engine in action?'}
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
