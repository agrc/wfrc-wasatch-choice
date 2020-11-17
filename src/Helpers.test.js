import { replaceAliasesWithFieldNames } from './Helpers';


describe('Helpers', () => {
  it('replaceAliasesWithFieldNames', () => {
    const fieldInfos = [
      {
        name: 'OBJECTID',
        type: 'esriFieldTypeOID',
        alias: 'OBJECTID',
        domain: null,
      },
      {
        name: 'SHAPE',
        type: 'esriFieldTypeGeometry',
        alias: 'SHAPE',
        domain: null,
      },
      {
        name: 'NAME',
        type: 'esriFieldTypeString',
        alias: 'Center Name',
        length: 50,
        domain: null,
      },
      {
        name: 'CenterType',
        type: 'esriFieldTypeString',
        alias: 'Type',
        length: 25,
        domain: null,
      }
    ];

    const inputResults = {
      OBJECTID: 1,
      SHAPE: 'blah',
      'Center Name': 'some name',
      'Type': 'some type'
    };

    const expectedResults = {
      OBJECTID: 1,
      SHAPE: 'blah',
      NAME: 'some name',
      CenterType: 'some type'
    };

    const results = replaceAliasesWithFieldNames(inputResults, fieldInfos);

    expect(results).toEqual(expectedResults);
  });
});
