// const defaultState = {
//   count: 0
// };

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'countInc':
      return { ...state, count: state.count + 1 };
    case 'countReset':
      return { ...state, count: 0 };
    default:
      return state;
  }
};
