import { dictionary } from '../../components/dictionary';

// const defaultState = {
//   vocabulary: [...dictionary]
// };

export const vocabularyReducer = (state = [...dictionary], action) => {
  switch (action.type) {
    case 'addNewWord':
      return {
        ...state,
        vocabulary: [...state.vocabulary, action.payload]
      };
    case 'deletewWord':
      return {
        ...state,
        vocabulary: state.vocabulary.filter((item) => item !== action.payload)
      };
    default:
      return state;
  }
};
