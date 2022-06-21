import { generateTranslatorFunction } from './i18n';
import { describe, it, expect } from 'vitest';


describe('translate', () => {
  const mockedTranslatedValue = 'hello';
  const t = generateTranslatorFunction(() => mockedTranslatedValue);

  it('returns the input if no special prefix', () => {
    expect(t('test')).toEqual('test');
  });

  it('returns translated value if special prefix is present', () => {
    expect(t('trans:test')).toEqual(mockedTranslatedValue);
  });
});
