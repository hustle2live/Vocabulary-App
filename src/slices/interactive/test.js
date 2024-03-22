import {
   changeTest,
   createTestArray,
   getRandomAnswers,
   startNewTest,
} from './actions.js';

import { actions } from './test.slice.js';

const allActions = {
   ...actions,
   changeTest,
   createTestArray,
   getRandomAnswers,
   startNewTest,
};

export { allActions as actions };
export { reducer } from './test.slice.js';
