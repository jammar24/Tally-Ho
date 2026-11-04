'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

interface User {
  name: string;
  email: string;
  role: string;
  isSandbox: boolean;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  login: (email?: string, name?: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>({
    name: 'Demo Merchant Store',
    email: 'merchant-test@sandbox.paypal.com',
    role: 'Store Owner',
    isSandbox: true,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('disputedesk_lang') as Language;
      if (savedLang === 'en' || savedLang === 'es') {
        setLanguageState(savedLang);
      }

      const savedTheme = localStorage.getItem('disputedesk_theme') as 'light' | 'dark';
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeState('dark');
        document.documentElement.classList.add('dark');
      }

      const savedUser = localStorage.getItem('disputedesk_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('disputedesk_lang', lang);
    } catch {}
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    try {
      localStorage.setItem('disputedesk_theme', next);
    } catch {}
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const login = (email = 'merchant-test@sandbox.paypal.com', name = 'Demo Merchant Store') => {
    const newUser: User = {
      name,
      email,
      role: 'Store Owner',
      isSandbox: true,
    };
    setUser(newUser);
    try {
      localStorage.setItem('disputedesk_user', JSON.stringify(newUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('disputedesk_user');
    } catch {}
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations.en;
    return (dict as any)[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// SSR-safe defaults when context is not available (e.g., during static prerendering)
const ssrDefaults: AppContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  theme: 'light',
  toggleTheme: () => {},
  user: null,
  login: () => {},
  logout: () => {},
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    return ssrDefaults;
  }
  return context;
}

