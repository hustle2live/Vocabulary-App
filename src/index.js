import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Store from './redux/store';
import { Provider } from 'react-redux';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
