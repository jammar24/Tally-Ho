'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export function SandboxBanner() {
  const { t } = useApp();

  return (
    <div className="bg-amber-400 dark:bg-amber-500 text-amber-950 font-semibold px-4 py-1.5 text-xs text-center border-b border-amber-500 shadow-xs flex items-center justify-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-amber-900 animate-pulse" />
      <span>
        <strong>{t('banner.title')}</strong> {t('banner.text')}
      </span>
    </div>
  );
}
