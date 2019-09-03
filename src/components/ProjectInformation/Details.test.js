import { getAliasValuePairs } from './Details';
import feature from './TestData/feature.json';
import fields from './TestData/fields.json';


const excludeFields = ["OBJECTID", "GlobalID"];
describe('Details', () => {
  describe('getAliasValueParis', () => {
    it('returns the appropriate aliases and values', () => {
      const pairs = getAliasValuePairs(feature.attributes, fields, excludeFields, 'ProjName');

      expect(pairs.length).toBe(7);

      expect(pairs).toContainEqual(['Project From', 'Mountain View Corridor']);
    });
  });
});
