const defaultState = {
  count: 0,
  activeWordTest: '',
  testingArray: []
};

export const testReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_TESTING_ARRAY':
      return { ...state, testingArray: action.payload };
    case 'CLEAR_TESTING_ARRAY':
      return { ...state, testingArray: [] };
    case 'setActiveTestWord':
      return { ...state, activeWordTest: action.payload };
    case 'resetActiveWord':
      return { ...state, activeWordTest: null };
    case 'changeToNextTest':
      return {
        ...state,
        activeWordTest: state.testingArray ? state.testingArray.shift() : ''
      };
    case 'countInc':
      return { ...state, count: state.count + 1 };
    case 'countReset':
      return { ...state, count: 0 };
    default:
      return state;
  }
};
