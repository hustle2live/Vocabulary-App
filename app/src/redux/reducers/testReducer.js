const defaultState = {
  count: 0,
  activeWordTest: '',
  testingArray: []
};

export const testReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_TESTING_ARRAY':
      return { ...state, testingArray: action.payload };
    case 'CLEAR_TEST_DATA':
      return { ...state, count: 0, activeWordTest: '', testingArray: [] };
    case 'CHANGE_TEST':
      return {
        ...state,
        activeWordTest: state.testingArray ? state.testingArray.shift() : ''
      };
    case 'COUNT_INC':
      return { ...state, count: state.count + 1 };
    case 'COUNT_RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
};
