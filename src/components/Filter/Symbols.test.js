import { getSymbolFromInfos } from './Symbols';
import { describe, it, expect } from 'vitest';


describe('getSymbolFromInfos', () => {
  const minimums = {
    pointSize: 3,
    polylineWidth: 2
  };

  it('returns points symbols', () => {
    const expectedSymbol = { size: 3 };
    const infos = [
      { symbol: { size: 1 } },
      { symbol: { size: 2 } },
      {
        symbol: expectedSymbol
      }
    ];

    expect(getSymbolFromInfos(infos, minimums)).toBe(expectedSymbol);
  });

  it('returns polyline symbols', () => {
    const expectedSymbol = { width: 3 };
    const infos = [
      { symbol: { width: 1 } },
      { symbol: { width: 1.5 } },
      {
        symbol: expectedSymbol
      }
    ];

    expect(getSymbolFromInfos(infos, minimums)).toBe(expectedSymbol);
  });
});
