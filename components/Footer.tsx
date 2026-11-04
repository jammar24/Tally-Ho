'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  IconShield,
  IconInbox,
  IconStore,
  IconUser,
  IconLock,
  IconPackage,
  IconFile,
  IconKey,
  IconTrendingUp,
} from '@/components/Icons';

export function Footer() {
  const { t, language } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                TH
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
                  Tally-Ho
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 whitespace-nowrap">
                  Dispute Engine
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              {language === 'es'
                ? 'Motor autónomo de defensa con evidencias para disputas de PayPal Sandbox. Lee documentos del comerciante, contrasta guías de paquetería en tiempo real y redacta respuestas irrefutables con supervisión humana obligatoria.'
                : 'Autonomous evidence defense engine for PayPal Sandbox disputes. Reads merchant proofs, cross-checks carrier records in real time, and drafts airtight responses with mandatory human-in-the-loop approval.'}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-amber-700 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900 w-fit">
              <IconShield size={13} className="text-amber-600 dark:text-amber-400" />
              <span>PayPal AI Hackathon 2026 • Sandbox Environment Only</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {language === 'es' ? 'Plataforma' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/disputes"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconInbox size={13} />
                  <span>{t('nav.inbox')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/merchant"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconStore size={13} />
                  <span>{t('nav.merchant')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portal"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconUser size={13} />
                  <span>{t('nav.portal')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <IconLock size={13} />
                  <span>{t('nav.admin')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconPackage size={13} />
                  <span>{t('nav.orders')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {language === 'es' ? 'Desarrollo y Docs' : 'Development & Docs'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconUser size={13} />
                  <span>{language === 'es' ? 'Acerca del Desarrollador' : 'Built by Jamar Masias'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconFile size={13} />
                  <span>{t('nav.docs')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconTrendingUp size={13} />
                  <span>{t('nav.insights')}</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/3m3r4l"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <span className="font-mono text-xs">@</span>
                  <span>GitHub @3m3r4l</span>
                </a>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconKey size={13} />
                  <span>{t('nav.auth')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © 2026 <strong className="text-slate-800 dark:text-slate-200">Tally-Ho Dispute Engine</strong>. Built by{' '}
            <a
              href="https://github.com/3m3r4l"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Jamar Masias (@3m3r4l)
            </a>
            . MIT License.
          </p>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PayPal Sandbox APIv1</span>
            </span>
            <span>•</span>
            <span className="font-mono text-[11px]">Next.js 14 • Gemini LLM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
