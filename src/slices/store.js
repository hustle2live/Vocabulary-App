import { configureStore } from '@reduxjs/toolkit';

import { reducer as vocabularyReducer } from './vocabulary/vocabulary.slice.js';
import { reducer as testReducer } from './interactive/testReducer.js';
import { reducer as statsReducer } from './stats/statsReducer.js';

export default configureStore({
   reducer: {
      vocabularyReducer,
      testReducer,
      statsReducer
   }
});
