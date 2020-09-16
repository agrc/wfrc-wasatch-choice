import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setConfigs } from './config';
import URLParams from './URLParams';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';


fetch('config.json')
  .then(response => response.json())
  .then(async appConfig => {
    i18n
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        detection: {
          order: ['navigator'], // only look at the navigator object to determine locale
          caches: [] // disable locale caching
        },
        resources: appConfig.translations,
        interpolation: {
          escapeValue: false
        },
        fallbackLng: 'en'
      });

    await setConfigs(appConfig);

    ReactDOM.render(
      <URLParams><App /></URLParams>, document.getElementById('root'))
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
