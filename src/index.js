import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setConfigs } from './config';
import URLParams from './URLParams';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AboutTests from './components/About/AboutTests';


fetch('config.json')
  .then(response => response.json())
  .then(async appConfig => {
    await setConfigs(appConfig);

    ReactDOM.render(
      <Router>
        <Switch>
          <Route path="/about-tests">
            <AboutTests />
          </Route>
          <Route path="/">
            <URLParams><App /></URLParams>
          </Route>
        </Switch>
      </Router>, document.getElementById('root')
    );
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
