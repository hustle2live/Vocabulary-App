import {
   addWord,
   updateWord,
   deleteWord,
   setAchievedWord,
   setPracticeWord,
   sortByName,
   sortByStatus,
   sortRandom
} from './actions.js';

import { actions } from './vocabulary.slice.js';

const allActions = {
   ...actions,
   addWord,
   updateWord,
   deleteWord,
   setAchievedWord,
   setPracticeWord,
   sortByName,
   sortByStatus,
   sortRandom
};

export { allActions as actions };
export { reducer } from './vocabulary.slice.js';
