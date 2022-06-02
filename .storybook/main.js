module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-actions/register', '@storybook/addon-links/register', '@storybook/preset-create-react-app'],
  core: {
    builder: 'webpack5'
  }
};