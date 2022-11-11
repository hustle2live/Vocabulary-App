import { dictionary } from '../../components/dictionary';

const defaultState = {
  vocabulary: [...dictionary]
};

export const vocabularyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_WORD':
      return {
        ...state,
        vocabulary: [...state.vocabulary, action.payload]
      };
    case 'DELETE_WORD':
      return {
        ...state,
        vocabulary: state.vocabulary.filter((item) => item !== action.payload)
      };
    default:
      return state;
  }
};
