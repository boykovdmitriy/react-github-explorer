import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import {get} from 'lodash';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

export function configureStore() {
  const logger = createLogger({
    collapsed: true,
  });
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware, logger);

  const composeEnhancers = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', compose);
  const store = createStore(rootReducer, {}, composeEnhancers(middleware));

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
