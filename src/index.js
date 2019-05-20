import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import store from './data/store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
