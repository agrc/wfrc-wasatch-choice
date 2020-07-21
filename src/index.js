import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setConfigs } from './config';
import URLParams from './URLParams';


fetch('config.json')
  .then(response => response.json())
  .then(async appConfig => {
    await setConfigs(appConfig);

    ReactDOM.render(
      <URLParams><App /></URLParams>, document.getElementById('root'))
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
