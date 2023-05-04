import { dictionary } from '../../mockdata/dictionary';

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
            vocabulary: state.vocabulary.filter((item) => item.name !== action.payload)
         };
      default:
         return state;
   }
};

// vocabulary: state.vocabulary.map((elem, index) =>
// index === action.payload ? (elem.status = elem.status === 'achieved' ? 'new' : 'achieved' && elem) : elem
// )
