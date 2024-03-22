import { createSlice } from '@reduxjs/toolkit';

import {
   changeTest,
   createTestArray,
   getRandomAnswers,
   startNewTest,
} from './actions.js';

const defaultState = {
   count: 0,
   activeWordTest: null,
   activeWordAnswers: [],
   testingArray: [],
};

const testReducer = createSlice({
   name: 'test',
   initialState: defaultState,
   reducers: {
      clearTestData: (state) => {
         state = defaultState;
      },
      countInc: (state) => {
         state.count = state.count + 1;
      },
      countReset: (state) => {
         state.count = 0;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(createTestArray.fulfilled, (state, action) => {
         const { testArray } = action.payload;
         state.testingArray = testArray;
      });

      builder.addCase(getRandomAnswers.fulfilled, (state, action) => {
         const { answersArray } = action.payload;
         state.activeWordAnswers = answersArray;
      });

      builder.addCase(changeTest.fulfilled, (state, action) => {
         const { answers, nextWord, testArray } = action.payload;
         state.activeWordTest = nextWord;
         state.testingArray = testArray;
         state.activeWordAnswers = answers;
      });

      builder.addCase(startNewTest.fulfilled, (state, action) => {
         const { answers, count, firstTestWord, testArray } = action.payload;
         state.count = count;
         state.activeWordTest = firstTestWord;
         state.testingArray = testArray;
         state.activeWordAnswers = answers;
      });

      builder.addCase(createTestArray.pending, (state, action) => {
         return;
      });
      builder.addCase(changeTest.pending, (state, action) => {
         return;
      });
      builder.addCase(startNewTest.pending, (state, action) => {
         return;
      });

      builder.addCase(startNewTest.rejected, (state, action) => {
         return;
      });

      builder.addCase(createTestArray.rejected, (state, action) => {
         return;
      });
      builder.addCase(changeTest.rejected, (state, action) => {
         return;
      });
   },
});

export const { actions, name, reducer } = testReducer;
