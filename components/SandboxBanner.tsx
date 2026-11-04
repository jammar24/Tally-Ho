'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { IconShield } from './Icons';

export function SandboxBanner() {
  const { t } = useApp();

  return (
    <aside
      aria-label="Sandbox environment notice"
      className="bg-amber-500/10 dark:bg-amber-500/5 text-amber-900 dark:text-amber-300/90 text-[11px] font-medium border-b border-amber-500/20 dark:border-amber-500/15 py-1 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <IconShield size={13} className="text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="tracking-wide">
          <strong className="font-semibold uppercase tracking-wider text-[10px] mr-1">
            {t('banner.title')}
          </strong>
          {t('banner.text')}
        </span>
      </div>
    </aside>
  );
}
