import { combineReducers } from 'redux';
import { vocabularyReducer } from './vocabularyReducer';
import { counterReducer } from './counterReducer';
import { newTestReducer } from './newTestReducer';
import { statsReducer } from './statsReducer';
import { testedWordReducer } from './testedWordReducer';

// export const rootReducer = combineReducers({
//   vocabularyReducer,
//   counterReducer,
//   newTestReducer,
//   statsReducer,
//   testedWordReducer
// });

export const rootReducer = combineReducers({
  testingArray: newTestReducer,
  vocabulary: vocabularyReducer,
  count: counterReducer,
  statArrayCurrent: statsReducer,
  stats: statsReducer,
  activeWordTest: testedWordReducer
});
