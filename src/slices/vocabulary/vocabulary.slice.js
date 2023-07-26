import { createSlice } from '@reduxjs/toolkit';

import { dictionary } from '../../mockdata/dictionary';
import { shuffleAndCut } from '../../features/helpers';

import {
   addWord,
   deleteWord,
   setAchievedWord,
   setPracticeWord,
   sortByName,
   sortByStatus,
   sortRandom
} from './actions.js';

const isLocalVocabulary = localStorage.getItem('vocabulary') || null;

const defaultState = {
   vocabulary: isLocalVocabulary ? JSON.parse(isLocalVocabulary) : [...dictionary]
};

const vocabularyReducer = createSlice({
   initialState: defaultState,
   name: 'vocabulary',
   reducers: {},
   extraКeducers: (builder) => {
      builder.addCase(addWord.fulfilled, (state, action) => {
         state.vocabulary = [...state.vocabulary, action.payload];
      });

      builder.addCase(deleteWord.fulfilled, (state, action) => {
         state.vocabulary = state.vocabulary.filter((item) => item.name !== action.payload);
      });

      builder.addCase(setAchievedWord.fulfilled, (state, action) => {
         state.vocabulary = state.vocabulary.map((elem, index) => {
            if (index === action.payload) {
               elem.status = elem.status === 'achieved' ? 'new' : 'achieved';
            }
            return elem;
         });
      });

      builder.addCase(setPracticeWord.fulfilled, (state, action) => {
         state.vocabulary = state.vocabulary.map((elem, index) => {
            if (index === action.payload) {
               elem.status = elem.status === 'practice' ? 'new' : 'practice';
            }
            return elem;
         });
      });

      builder.addCase(sortByName.fulfilled, (state) => {
         state.vocabulary = [...state.vocabulary].sort((a, b) => (a.name < b.name ? -1 : 0));
      });

      builder.addCase(sortByStatus.fulfilled, (state) => {
         state.vocabulary = [...state.vocabulary].sort((a, b) => (a.status < b.status ? -1 : 0));
      });

      builder.addCase(sortRandom.fulfilled, (state) => {
         state.vocabulary = shuffleAndCut([...state.vocabulary], state.vocabulary.length);
      });
   }
});

export const { actions, name, reducer } = vocabularyReducer;
