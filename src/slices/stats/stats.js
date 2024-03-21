import { saveCurrentStat, writeStatsData } from './actions.js';

import { actions } from './stats.slice.js';

const allActions = {
   ...actions,
   saveCurrentStat,
   writeStatsData,
};

export { allActions as actions };
export { reducer } from './stats.slice.js';
