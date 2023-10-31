const ActionTypes = {
   ADD_WORD: 'vocabulary/add-word',
   UPDATE_WORD: 'vocabulary/update-word',
   DELETE_WORD: 'vocabulary/delete-word',
   CHANGE_STATUS_WORD: 'vocabulary/change-status-word',
   SORT_BY: 'vocabulary/sort-by',
};

const SortTypes = {
   SORT_BY_NAME: 'sortByName',
   SORT_BY_STATUS: 'sortByStatus',
   SORT_DEFAULT: '',
   SORT_RANDOM: 'sortRandom',
};

export { ActionTypes, SortTypes };
