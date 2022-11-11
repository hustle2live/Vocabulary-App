const defaultState = { statArrayCurrent: [], stats: '' };

export const statsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_CURRENT_TEST_STAT':
      return {
        ...state,
        statArrayCurrent: [...state.statArrayCurrent, action.payload]
      };
    case 'CLEAR_CURRENT_STAT':
      return {
        ...state,
        statArrayCurrent: []
      };
    case 'SAVE_STATS_DATA':
      return {
        ...state,
        stats: [
          ...state.stats,
          {
            result: action.payload,
            tests: state.statArrayCurrent
          }
        ]
      };
    default:
      return state;
  }
};
