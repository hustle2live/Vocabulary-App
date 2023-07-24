import { configureStore } from '@reduxjs/toolkit';

import { reducer as vocabularyReducer } from './vocabulary/vocabulary.slice.js';
import testReducer from './interactive/testReducer.js';
import statsReducer from './stats/statsReducer.js';

export default configureStore({
   reducer: {
      vocabularyReducer,
      testReducer,
      statsReducer
   }
});
