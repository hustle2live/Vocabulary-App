import { dictionary } from '../../mockdata/dictionary';

const defaultState = {
  vocabulary: localStorage.getItem('vocabulary')
    ? JSON.parse(localStorage.getItem('vocabulary'))
    : [...dictionary]
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
        vocabulary: state.vocabulary.filter((item) => item.name !== action.payload)
      };
    default:
      return state;
  }
};