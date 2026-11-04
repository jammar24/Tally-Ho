import { describe, it, expect } from 'vitest';
import { translations } from '@/context/translations';

describe('Bilingual Translations (EN / ES)', () => {
  it('should have both English and Spanish dictionaries', () => {
    expect(translations.en).toBeDefined();
    expect(translations.es).toBeDefined();
  });

  it('should have identical keys in both languages', () => {
    const enKeys = Object.keys(translations.en).sort();
    const esKeys = Object.keys(translations.es).sort();

    expect(enKeys).toEqual(esKeys);
  });

  it('should have required navigation and action keys', () => {
    const requiredKeys = [
      'nav.home',
      'nav.inbox',
      'nav.merchant',
      'nav.admin',
      'nav.portal',
      'nav.insights',
      'nav.orders',
      'nav.about',
      'nav.docs',
      'nav.auth',
      'nav.out',
      'home.hero.title',
      'inbox.title',
      'case.back',
      'case.approve',
      'dialog.title',
    ];

    for (const key of requiredKeys) {
      expect((translations.en as any)[key]).toBeTruthy();
      expect((translations.es as any)[key]).toBeTruthy();
    }
  });
});

