
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import searchRootSaga from './search/saga';
import playerRootSaga from './player/saga';
import rootReducer from './rootReducer';
const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : rootReducer;
delete window.__INITIAL_STATE__;
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = createStore(
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(searchRootSaga);
sagaMiddleware.run(playerRootSaga);
