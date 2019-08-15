import { configure } from '@storybook/react';
import '../src/setupTests';
import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.css';

let req;
if (process.env.NODE_ENV === 'test') {
  // fix for when running in jest tests
  const registerRequireContextHook = require('babel-plugin-require-context-hook/register');
  registerRequireContextHook();

  req = global.__requireContext(__dirname, '../src', true, /\.stories\.js$/);
} else {
  req = require.context('../src', true, /\.stories\.js$/);
}

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
