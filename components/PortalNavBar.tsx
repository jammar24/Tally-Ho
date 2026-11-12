'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { IconLogOut, IconPayPal } from './Icons';

interface PortalNavBarProps {
  /** Badge label to identify the portal type */
  label: string;
  /** Badge color classes */
  badgeClass?: string;
}

/**
 * Minimal top bar shown inside portal windows (Merchant / Customer / Admin).
 * Per user requirement: shows logo, portal badge, and ONLY a "Cerrar Sesión" button.
 */
export function PortalNavBar({ label, badgeClass }: PortalNavBarProps) {
  const { user, t, language } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Tally-Ho Logo"
              width={44}
              height={44}
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">
              Tally-Ho
            </span>
            <span
              className={`hidden sm:inline-flex text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap items-center gap-1 ${
                badgeClass ??
                'bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-[#0070BA] border-[#0070BA]/20'
              }`}
            >
              <IconPayPal size={10} />
              <span>{label}</span>
            </span>
          </div>
        </div>

        {/* Right — user pill + logout only */}
        <div className="flex items-center gap-2 shrink-0">
          {user && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 max-w-[140px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-medium truncate">{user.name.split(' ')[0]}</span>
            </span>
          )}
          <Link
            href="/out"
            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <IconLogOut size={12} />
            <span>{language === 'es' ? 'Cerrar Sesión' : 'Sign Out'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

