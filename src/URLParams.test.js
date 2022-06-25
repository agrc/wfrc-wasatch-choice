import { afterEach, describe, expect, it, vi } from 'vitest';
import { getInitialHash } from './URLParams';

const defaultMapList = ['a', 'b', 'c'];
vi.mock('./config.js', () => {
  return {
    getDefaultCurrentTabIds: () => defaultMapList,
  };
});

describe('getInitialHash', () => {
  const i18n = {
    changeLanguage: vi.fn(() => 'changed'),
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the initial hash', () => {
    const href = 'http://localhost:3000/#test=a&test2=b&mapList=c.d.e.f';

    const result = getInitialHash(href, i18n, []);

    expect(result.test).toBe('a');
    expect(result.test2).toBe('b');
    expect(result.mapList).toEqual(['c', 'd', 'e', 'f']);
  });

  it('should parse numbers and booleans', () => {
    const href = 'http://localhost:3000/#test=1&test2=true';

    const result = getInitialHash(href, i18n, []);

    expect(result.test).toBe(1);
    expect(result.test2).toBe(true);
  });

  it('should return the default map list if none is supplied', () => {
    const href = 'http://localhost:3000/#test=d&test2=e';

    const result = getInitialHash(href, i18n, defaultMapList);

    expect(result.test).toBe('d');
    expect(result.mapList).toEqual(defaultMapList);
  });

  it('should change the language as a side effect', () => {
    const href = 'http://localhost:3000/#test=d&test2=e&lng=es';

    getInitialHash(href, i18n, []);

    expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
  });
});
