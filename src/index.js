import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';
import Store from './slices/store.js';

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
