import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import App from './App';
import AboutTests from './components/About/AboutTests';
import { setConfigs } from './config';
import './index.css';
import URLParams from './URLParams';

fetch('config.json')
  .then((response) => response.json())
  .then(async (appConfig) => {
    await setConfigs(appConfig);

    let page;
    if (document.location.hash === '#about-tests') {
      page = <AboutTests />;
    } else {
      page = (
        <URLParams>
          <App />
        </URLParams>
      );
    }

    ReactDOM.render(page, document.getElementById('root'));
  });
