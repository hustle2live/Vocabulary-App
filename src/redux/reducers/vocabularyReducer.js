import { dictionary } from '../../mockdata/dictionary';
import { shuffleAndCut } from '../../features/helpers';

const defaultState = {
   vocabulary: localStorage.getItem('vocabulary') ? JSON.parse(localStorage.getItem('vocabulary')) : [...dictionary]
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
      case 'MARK_ACHIEVED_WORD':
         return {
            ...state,
            vocabulary: state.vocabulary.map((elem, index) => {
               if (index === action.payload) {
                  elem.status = elem.status === 'achieved' ? 'new' : 'achieved';
               }
               return elem;
            })
         };

      case 'MARK_TO_PRACTICE_WORD':
         return {
            ...state,
            vocabulary: state.vocabulary.map((elem, index) => {
               if (index === action.payload) {
                  elem.status = elem.status === 'practice' ? 'new' : 'practice';
               }
               return elem;
            })
         };
      case 'SORT_BY_NAME':
         return {
            ...state,
            vocabulary: [...state.vocabulary].sort((a, b) => (a.name < b.name ? -1 : 0))
         };
      case 'SORT_BY_STATUS':
         return {
            ...state,
            vocabulary: [...state.vocabulary].sort((a, b) => (a.status < b.status ? -1 : 0))
         };
      case 'SHUFFLE':
         return {
            ...state,
            vocabulary: shuffleAndCut([...state.vocabulary], state.vocabulary.length)
         };
      default:
         return state;
   }
};

// vocabulary: state.vocabulary.map((elem, index) =>
// index === action.payload ? (elem.status = elem.status === 'achieved' ? 'new' : 'achieved' && elem) : elem
// )
