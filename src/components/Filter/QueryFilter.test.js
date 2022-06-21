import { getFieldQuery, TEXT, NUMBER, getLayerQuery } from './QueryFilter';
import { describe, it, expect } from 'vitest';

describe('getFieldQuery', () => {
  it('number', () => {
    expect(
      getFieldQuery(
        'FieldName',
        NUMBER,
        { label: true, label2: false, label3: true },
        {
          label: { values: [1, 2] },
          label2: { values: [3] },
          label3: { values: [4] },
        }
      )
    ).toEqual('(FieldName IN (1, 2, 4))');
  });
  it('number with other', () => {
    expect(
      getFieldQuery(
        'FieldName',
        NUMBER,
        { label: true, label2: false, label3: false, label4: true },
        {
          label: { values: [1, 2] },
          label2: { values: [3] },
          label3: { values: [4, 5] },
          label4: { other: true },
        }
      )
    ).toEqual('(FieldName IN (1, 2) OR FieldName NOT IN (1, 2, 3, 4, 5))');
  });
  it('text', () => {
    expect(
      getFieldQuery(
        'FieldName',
        TEXT,
        { label: true, label2: false, label3: true },
        {
          label: { values: ['1', '2'] },
          label2: { values: ['3'] },
          label3: { values: ['4'] },
        }
      )
    ).toEqual('(FieldName IN (\'1\', \'2\', \'4\'))');
  });
  it('only other', () => {
    expect(
      getFieldQuery(
        'FieldName',
        TEXT,
        { label: false, label2: false, label3: true },
        {
          label: { values: ['1', '2'] },
          label2: { values: ['3'] },
          label3: { other: true },
        }
      )
    ).toEqual('(FieldName NOT IN (\'1\', \'2\', \'3\'))');
  });
  it('returns null if all are checked', () => {
    expect(
      getFieldQuery(
        'FieldName',
        TEXT,
        { label: true, label2: true, label3: true },
        {
          label: { values: ['1', '2'] },
          label2: { values: ['3'] },
          label3: { other: true },
        }
      )
    ).toBeNull();
  });
});

describe('getLayerQuery', () => {
  it('returns null if no values are set', () => {
    expect(getLayerQuery({
      label1: null,
      label2: null,
      label3: null
    })).toBeNull();
  });
  it('returns the correct query', () => {
    expect(getLayerQuery({
      label1: 'query1',
      label2: null,
      label3: 'query3'
    })).toEqual('query1 AND query3');
  });
});
