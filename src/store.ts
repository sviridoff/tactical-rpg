import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

import * as reducers from './reducers';

const store = createStore(combineReducers(reducers), applyMiddleware(logger));

(window as any).store = store;

export default store;
