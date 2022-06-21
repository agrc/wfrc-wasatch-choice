import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import { setConfigs } from './config';
import URLParams from './URLParams';
import AboutTests from './components/About/AboutTests';


fetch('config.json')
  .then(response => response.json())
  .then(async appConfig => {
    await setConfigs(appConfig);

    let page;
    if (document.location.hash === '#about-tests') {
      page = <AboutTests />;
    } else {
      page = <URLParams><App /></URLParams>;
    }

    ReactDOM.render(page, document.getElementById('root'));
  });
