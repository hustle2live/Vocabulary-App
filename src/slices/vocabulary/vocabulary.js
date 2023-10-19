import {
   addWord,
   changeStatusWord,
   deleteWord,
   sortByName,
   sortByStatus,
   sortRandom,
   updateWord,
} from './actions.js';

import { actions } from './vocabulary.slice.js';

const allActions = {
   ...actions,
   addWord,
   updateWord,
   changeStatusWord,
   deleteWord,
   sortByName,
   sortByStatus,
   sortRandom,
};

export { allActions as actions };
export { reducer } from './vocabulary.slice.js';
