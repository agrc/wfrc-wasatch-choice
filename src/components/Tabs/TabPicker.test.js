import { getOptions } from './TabPicker';

describe('getOptions', () => {
  const t = value => value;

  it('handles no categories', () => {
    const mapInfos = {
      '1': { name: 'first' },
      '2': { name: 'second' },
      '3': { name: 'third' }
    };

    const expected = [
      {
        label: 'first',
        value: '1'
      },
      {
        label: 'second',
        value: '2'
      },
      {
        label: 'third',
        value: '3'
      }
    ];

    expect(getOptions(mapInfos, t)).toMatchObject(expected);
  });
  it('handles categories', () => {
    const mapInfos = {
      '1': { name: 'first', category: 'a' },
      '2': { name: 'second' },
      '3': { name: 'third', category: 'a' }
    };

    const expected = [
      {
        label: 'second',
        value: '2'
      },
      {
        label: 'a',
        options: [
          { label: 'first', value: '1' },
          { label: 'third', value: '3' }
        ]
      }
    ];

    expect(getOptions(mapInfos, t)).toMatchObject(expected);
  });
});
