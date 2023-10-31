import {
   addWord,
   changeStatusWord,
   deleteWord,
   sortBy,
   updateWord,
} from './actions.js';

import { actions } from './vocabulary.slice.js';

const allActions = {
   ...actions,
   addWord,
   updateWord,
   changeStatusWord,
   deleteWord,
   sortBy,
};

export { allActions as actions };
export { reducer } from './vocabulary.slice.js';
