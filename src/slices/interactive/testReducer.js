import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
   count: 0,
   activeWordTest: null,
   testingArray: []
};

const testReducer = createSlice({
   name: 'test',
   initialState: defaultState,
   reducers: {
      createTestingArray: (state, action) => {
         state.testingArray = action.payload;
      },
      clearTestData: (state) => {
         state = defaultState;
      },
      changeTest: (state) => {
         state.activeWordTest = state.testingArray ? state.testingArray.shift() : null;
      },
      countInc: (state) => {
         state.count = state.count + 1;
      },
      countReset: (state) => {
         state.count = 0;
      }
   }
});

export const { createTestingArray, clearTestData, changeTest, countInc, countReset } = testReducer.actions;

export const { actions, name, reducer } = testReducer;
