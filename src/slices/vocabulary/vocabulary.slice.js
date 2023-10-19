import { createSlice } from '@reduxjs/toolkit';

import { dictionary } from '../../mockdata/dictionary';
import { shuffleAndCut } from '../../features/helpers';

import {
   addWord,
   changeStatusWord,
   deleteWord,
   sortByName,
   sortByStatus,
   sortRandom,
} from './actions.js';

const isLocalVocabulary = localStorage.getItem('vocabulary') || null;

const defaultState = {
   vocabulary: isLocalVocabulary
      ? JSON.parse(isLocalVocabulary)
      : [...dictionary],
};

const vocabularyReducer = createSlice({
   initialState: defaultState,
   name: 'vocabulary',
   reducers: {},
   extraReducers: (builder) => {
      // add new word
      builder.addCase(addWord.fulfilled, (state, action) => {
         state.vocabulary = [...state.vocabulary, action.payload];
      });
      builder.addCase(addWord.rejected, (state, action) => {
         console.log('error occurred');
      });

      builder.addCase(deleteWord.fulfilled, (state, action) => {
         state.vocabulary = state.vocabulary.filter(
            (item) => item.name !== action.payload,
         );
      });

      // set to ahieved
      builder.addCase(changeStatusWord.fulfilled, (state, action) => {
         const { vocabulary } = action.payload;
         state.vocabulary = [...vocabulary];
      });
      builder.addCase(changeStatusWord.rejected, (state, { vocabulary }) => {
         console.log('an error occurred - while changing element MarkStatus');
      });

      builder.addCase(sortByName.fulfilled, (state) => {
         state.vocabulary = [...state.vocabulary].sort((a, b) =>
            a.name < b.name ? -1 : 0,
         );
      });

      builder.addCase(sortByStatus.fulfilled, (state) => {
         state.vocabulary = [...state.vocabulary].sort((a, b) =>
            a.status < b.status ? -1 : 0,
         );
      });

      builder.addCase(sortRandom.fulfilled, (state) => {
         state.vocabulary = shuffleAndCut(
            [...state.vocabulary],
            state.vocabulary.length,
         );
      });
   },
});

export const { actions, name, reducer } = vocabularyReducer;
