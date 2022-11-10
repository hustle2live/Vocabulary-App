const defaultState = {
  activeWordTest: ''
};

export const testedWordReducer = (state = '', action) => {
  switch (action.type) {
    case 'setActiveTestWord':
      return { ...state, activeWordTest: action.payload };
    case 'resetActiveWord':
      return { ...state, activeWordTest: null };
    case 'changeToNextTest': // change active word test
      return {
        ...state,
        activeWordTest: state.testingArray ? state.testingArray.shift() : ''
      };
    default:
      return state;
  }
};
