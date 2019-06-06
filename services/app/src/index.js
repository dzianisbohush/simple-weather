import React from 'react';
import ReactDOM from 'react-dom';
import App from 'common/App';
import { BrowserRouter } from 'react-router-dom';

// import * as serviceWorker from 'serviceWorker';

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// serviceWorker.register();
