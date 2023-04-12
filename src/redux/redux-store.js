import { createStore, combineReducers } from 'redux';

import { vocabularyReducer } from './reducers/vocabularyReducer';
import { testReducer } from './reducers/testReducer';
import { statsReducer } from './reducers/statsReducer';

const rootReducer = combineReducers({
  vocabularyReducer,
  testReducer,
  statsReducer
});

export const store = createStore(rootReducer);
