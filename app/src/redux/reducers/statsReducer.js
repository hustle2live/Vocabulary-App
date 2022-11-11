const defaultState = { statArrayCurrent: [], stats: '' };

export const statsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'saveCurrentTestStat':
      return {
        ...state,
        statArrayCurrent: [...state.statArrayCurrent, action.payload]
      };
    case 'saveStatsData':
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
