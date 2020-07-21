import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { setConfigs } from '../src/config';

fetch(`${process.env.PUBLIC_URL}/config.json`)
  .then(response => response.json())
  .then(async appConfig => {
    await setConfigs(appConfig);
  })
;
