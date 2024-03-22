import { configureStore } from '@reduxjs/toolkit';

import { reducer as vocabularyReducer } from './vocabulary/vocabulary.slice.js';
import { reducer as testReducer } from './interactive/test.slice.js';
import { reducer as statsReducer } from './stats/stats.slice.js';

export default configureStore({
   reducer: {
      vocabularyReducer,
      testReducer,
      statsReducer,
   },
});
