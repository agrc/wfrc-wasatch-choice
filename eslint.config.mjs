import { browser } from '@ugrc/eslint-config';
import cypress from 'eslint-plugin-cypress';

export default [
  {
    files: ['cypress/**/*.js', 'cypress/**/*.ts'],
    extends: [cypress.configs.recommended],
  },
  ...browser,
];
