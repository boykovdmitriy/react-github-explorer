import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {App} from './containers/app';
import rootSaga from './redux/rootSaga';
import {configureStore} from './redux';
import history from './utils/history';
import './index.css';

const supportsHistory = 'pushState' in window.history;
const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <BrowserRouter forceRefresh={!supportsHistory}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
