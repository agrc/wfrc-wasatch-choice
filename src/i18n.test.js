import { describe, expect, it } from 'vitest';
import { generateTranslatorFunction } from './i18n';

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
