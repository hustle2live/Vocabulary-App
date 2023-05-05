import { createSlice } from '@reduxjs/toolkit';

import { dictionary } from '../../mockdata/dictionary';
import { shuffleAndCut } from '../../features/helpers';

const isLocalVocabulary = localStorage.getItem('vocabulary') || null;

const defaultState = {
   vocabulary: isLocalVocabulary ? JSON.parse(isLocalVocabulary) : [...dictionary]
};

const vocabularyReducer = createSlice({
   name: 'vocabulary',
   initialState: defaultState,
   reducers: {
      addWord: (state, action) => {
         state.vocabulary = [...state.vocabulary, action.payload];
      },
      deleteWord: (state, action) => {
         state.vocabulary = state.vocabulary.filter((item) => item.name !== action.payload);
      },
      markAchieved: (state, action) => {
         state.vocabulary = state.vocabulary.map((elem, index) => {
            if (index === action.payload) {
               elem.status = elem.status === 'achieved' ? 'new' : 'achieved';
            }
            return elem;
         });
      },
      markPractice: (state, action) => {
         state.vocabulary = state.vocabulary.map((elem, index) => {
            if (index === action.payload) {
               elem.status = elem.status === 'practice' ? 'new' : 'practice';
            }
            return elem;
         });
      },
      sortByName: (state) => {
         state.vocabulary = [...state.vocabulary].sort((a, b) => (a.name < b.name ? -1 : 0));
      },
      sortByStatus: (state) => {
         state.vocabulary = [...state.vocabulary].sort((a, b) => (a.status < b.status ? -1 : 0));
      },
      sortRandom: (state) => {
         state.vocabulary = shuffleAndCut([...state.vocabulary], state.vocabulary.length);
      }
   }
});

export const { addWord, deleteWord, markAchieved, markPractice, sortByName, sortByStatus, sortRandom } =
   vocabularyReducer.actions;

export default vocabularyReducer.reducer;

// vocabulary: state.vocabulary.map((elem, index) =>
// index === action.payload ? (elem.status = elem.status === 'achieved' ? 'new' : 'achieved' && elem) : elem
// )

// export const vocabularyReducer = (state = defaultState, action) => {
//    switch (action.type) {
//       case 'ADD_WORD':
//          return {
//             ...state,
//             vocabulary: [...state.vocabulary, action.payload]
//          };
//       case 'DELETE_WORD':
//          return {
//             ...state,
//             vocabulary: state.vocabulary.filter((item) => item.name !== action.payload)
//          };
//       case 'MARK_ACHIEVED_WORD':
//          return {
//             ...state,
//             vocabulary: state.vocabulary.map((elem, index) => {
//                if (index === action.payload) {
//                   elem.status = elem.status === 'achieved' ? 'new' : 'achieved';
//                }
//                return elem;
//             })
//          };

//       case 'MARK_TO_PRACTICE_WORD':
//          return {
//             ...state,
//             vocabulary: state.vocabulary.map((elem, index) => {
//                if (index === action.payload) {
//                   elem.status = elem.status === 'practice' ? 'new' : 'practice';
//                }
//                return elem;
//             })
//          };
//       case 'SORT_BY_NAME':
//          return {
//             ...state,
//             vocabulary: [...state.vocabulary].sort((a, b) => (a.name < b.name ? -1 : 0))
//          };
//       case 'SORT_BY_STATUS':
//          return {
//             ...state,
//             vocabulary: [...state.vocabulary].sort((a, b) => (a.status < b.status ? -1 : 0))
//          };
//       case 'SHUFFLE':
//          return {
//             ...state,
//             vocabulary: shuffleAndCut([...state.vocabulary], state.vocabulary.length)
//          };
//       default:
//          return state;
//    }
// };
