import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getQuery, validateCheckboxLayerKeys } from './Filter';
import { getLayers } from './utils';

describe('getQuery', () => {
  const tests = [
    [['FCPhase', 1, 2, 3, 4], [0, 1, 2], 'FCPhase IN (1, 2, 3)'],
    [['FCPhase', 1, 2, 3, 'NULL'], [1, 3], 'FCPhase IN (2, NULL)'],
    [['DraftPhase', 1, '1, 12', '1, 12, 123'], [0, 1], 'DraftPhase IN (1, 12)'],
    [['DraftPhase', 1, '1, 12', '1, 12, 123'], [1], 'DraftPhase IN (1, 12)'],

    // return null if all phases are checked
    [['FCPhase', 1, 2, 3], [0, 1, 2, 3], null],
    [['Test', 1, 2, 3, 4], [0, 1, 2, 3], null],

    [['FCPhase', 1, 2, 3], [0, 1, 3], 'FCPhase IN (1, 2)'],
    [['FCPhase', 1, 2, 3], [3], '1 = 2'],
    [['FCPhase', 1, 2, 3], [], '1 = 2'],
    [['FieldName', '1', '2', '3', '4'], [0, 2], "FieldName IN ('1', '3')"],
  ];

  it.each(tests)('(%o, %o) -> %s', (info, indexes, expected) => {
    expect(getQuery(info, indexes)).toEqual(expected);
  });
});

describe('getLayers', () => {
  const centersTitle = 'Centers';
  const whenMock = () => {
    return new Promise((resolve) => {
      resolve();
    });
  };
  const centersLayer = {
    title: centersTitle,
    when: whenMock,
  };
  const nestedSubLayer = {
    title: 'Nested Sub Layer',
  };
  const subLayer = {
    title: 'Sub Layer',
    sublayers: [nestedSubLayer],
  };
  const mockMap = {
    portalItem: {
      id: 'unique id',
    },
    layers: {
      items: [
        centersLayer,
        {
          title: 'Boundaries',
          sublayers: [subLayer],
          when: whenMock,
        },
      ],
    },
  };
  it('returns the correct layer objects', async () => {
    const config = {
      layerNames: {
        boundaries: 'Boundaries',
        centers: centersTitle,
      },
    };

    const result = await getLayers(config.layerNames, mockMap);

    expect(Object.keys(result).length).toBe(2);
    expect(result.centers).toBe(centersLayer);
  });

  it('logs an error if there is no matching layer in web map', async () => {
    console.error = vi.fn();
    const config = {
      layerNames: {
        boundaries: 'BadLayerName',
        centers: centersTitle,
      },
    };

    await getLayers(config.layerNames, mockMap);

    expect(console.error).toHaveBeenCalledWith(
      'Layer: BadLayerName not found in web map!',
    );
  });

  it('searches sublayers', async () => {
    const config = {
      layerNames: {
        subLayer: 'Sub Layer',
        nestedSubLayer: 'Nested Sub Layer',
      },
    };

    const result = await getLayers(config.layerNames, mockMap);

    expect(Object.keys(result).length).toBe(2);
    expect(result.subLayer).toBe(subLayer);
    expect(result.nestedSubLayer).toBe(nestedSubLayer);
  });
});

describe('validateCheckboxLayerKeys', () => {
  beforeEach(() => {
    console.error = vi.fn();
  });

  it('logs no errors if there are no issues', () => {
    const layerNames = {
      one: 'One',
      two: 'Two',
      three: 'Three',
    };
    const checkboxes = {
      boxOne: {
        layerNames: ['one', 'two'],
      },
      boxTwo: {
        layerNames: ['three'],
      },
    };

    validateCheckboxLayerKeys(layerNames, checkboxes);

    expect(console.error).not.toHaveBeenCalled();
  });
  it('logs an error if there is a mis-matching key', () => {
    const layerNames = {
      one: 'One',
      two: 'Two',
      three: 'Three',
    };
    const checkboxes = {
      boxOne: {
        layerNames: ['one', 'two'],
      },
      boxTwo: {
        layerNames: ['three', 'badName'],
      },
    };

    validateCheckboxLayerKeys(layerNames, checkboxes);

    expect(console.error).toHaveBeenCalled();
  });
});
