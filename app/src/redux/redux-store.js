import { createStore } from 'redux';
import { rootReducer } from './reducers/combineReducers';

export const store = createStore(rootReducer);
