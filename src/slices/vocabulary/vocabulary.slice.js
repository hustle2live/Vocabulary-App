import { createSlice } from '@reduxjs/toolkit';

import { dictionary } from '../../mockdata/dictionary';

import { addWord, changeStatusWord, deleteWord, sortBy } from './actions.js';

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
      builder.addCase(addWord.fulfilled, (state, action) => {
         const { translation } = action.payload;
         state.vocabulary = [...state.vocabulary, { ...translation }];
      });

      builder.addCase(addWord.rejected, (state, action) => {
         console.log(action.payload);
      });

      builder.addCase(deleteWord.fulfilled, (state, action) => {
         const { updatedVocabulary } = action.payload;
         state.vocabulary = updatedVocabulary;
      });

      builder.addCase(deleteWord.rejected, (state, action) => {
         return;
      });

      builder.addCase(changeStatusWord.fulfilled, (state, action) => {
         const { vocabulary } = action.payload;
         state.vocabulary = [...vocabulary];
      });
      builder.addCase(changeStatusWord.rejected, (state, { vocabulary }) => {
         return;
      });

      builder.addCase(sortBy.fulfilled, (state, action) => {
         const { vocabularySorted } = action.payload;
         state.vocabulary = vocabularySorted;
      });

      builder.addCase(sortBy.rejected, (state) => {
         return;
      });
   },
});

export const { actions, name, reducer } = vocabularyReducer;
