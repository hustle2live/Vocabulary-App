import { configureStore } from '@reduxjs/toolkit';

import vocabularyReducer from './vocabulary/vocabulary.slice';
import testReducer from './interactive/testReducer';
import statsReducer from './stats/statsReducer';


export default configureStore({
   reducer: {
      vocabularyReducer,
      testReducer,
      statsReducer
   }
});
