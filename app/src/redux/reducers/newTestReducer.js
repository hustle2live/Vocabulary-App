// import { shuffleAndCut } from '../../components/helpers';

// const defaultState = {
//   testingArray: []
// };

export const newTestReducer = (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'startNewTest':
      return { ...state, testingArray: action.payload };
    case 'endTest':
      return { ...state, testingArray: [] };
    default:
      return state;
  }
};
