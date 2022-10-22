import React, { Suspense } from 'react';
import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { store, StoreContext } from './app/stores/store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import i18nconfig from "./config/i18n";
import LoadingComponent from './app/layout/LoadingComponent';

i18nconfig.init();

// i18next.init({
//     interpolation: { escapeValue: false },  // React already does escaping
//     lng: DEFAULT_LANGUAGE,
//         fallbackLng: 'pl',
//         defaultNS: DEFAULT_NAMESPACE,
//         backend: {
//           loadPath: '/locales/{{lng}}/{{ns}}.json',
//         },
// });

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      
    <Suspense fallback={<LoadingComponent />}>
          <App />
    </Suspense>


    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
