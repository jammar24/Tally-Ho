'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { IconSun, IconMoon, IconLogOut, IconPayPal } from './Icons';

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, theme, toggleTheme, user, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/disputes', label: t('nav.inbox') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/orders', label: t('nav.orders') },
    { href: '/about', label: t('nav.about') },
    { href: '/docs', label: t('nav.docs') },
  ];

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">

        {/* Brand & Left Nav */}
        <div className="flex items-center gap-3 lg:gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Tally-Ho Logo"
                width={48}
                height={48}
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight whitespace-nowrap">
                {t('nav.brand')}
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-semibold uppercase tracking-wider bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-[#0070BA] px-2 py-0.5 rounded-full border border-[#0070BA]/20 whitespace-nowrap items-center gap-1">
                <IconPayPal size={11} className="text-[#0070BA]" />
                <span>{t('nav.agent')}</span>
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 xl:px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0070BA] dark:text-blue-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 sm:px-2 py-0.5 rounded font-medium transition-colors text-[11px] sm:text-xs ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-1.5 sm:px-2 py-0.5 rounded font-medium transition-colors text-[11px] sm:text-xs ${
                language === 'es'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ES
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors inline-flex items-center justify-center shrink-0"
          >
            {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                href="/auth"
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:border-[#0070BA] transition-colors max-w-[110px] xl:max-w-[150px]"
                title={user.name}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-medium truncate">{user.name.split(' ')[0]}</span>
              </Link>
              <Link
                href="/out"
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800/80 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-200 transition-colors inline-flex items-center gap-1 whitespace-nowrap"
              >
                <IconLogOut size={12} />
                <span className="hidden md:inline">{t('nav.out')}</span>
              </Link>
            </div>
          ) : (
            <Link
              href="/auth"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#0070BA] hover:bg-[#005EA6] text-white shadow-xs transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <IconPayPal size={12} />
              <span>{t('nav.auth')}</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] px-4 py-3 space-y-1 shadow-lg">
          {user && (
            <div className="pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {user.name}
              </span>
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300"
              >
                {language === 'es' ? 'Mi Portal' : 'My Portal'}
              </Link>
            </div>
          )}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            {user ? (
              <Link
                href="/out"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <IconLogOut size={14} />
                <span>{t('nav.out')}</span>
              </Link>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
              >
                {t('nav.auth')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
