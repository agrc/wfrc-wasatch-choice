import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import AboutTests from './components/About/AboutTests';
import ErrorFallback from './components/ErrorFallback';
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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <URLParams>
            <App />
          </URLParams>
        </ErrorBoundary>
      );
    }

    createRoot(document.getElementById('root')).render(page);
  });
