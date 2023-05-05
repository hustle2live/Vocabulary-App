import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
   count: 0,
   activeWordTest: '',
   testingArray: []
};

const testReducer = createSlice({
   name: 'test',
   initialState: defaultState,
   reducers: {
      createTestingArray: (state, action) => {
         state.test.testingArray = action.payload;
      },
      clearTestData: (state) => {
         state.test = defaultState;
      },
      changeTest: (state) => {
         state.test.activeWordTest = state.test.testingArray ? state.test.testingArray.shift() : '';
      },
      countInc: (state) => {
         state.test.count = state.test.count + 1;
      },
      countReset: (state) => {
         state.test.count = 0;
      }
   }
});

// export const testReducer2 = (state = defaultState, action) => {
//    switch (action.type) {
//       case 'CREATE_TESTING_ARRAY':
//          return { ...state, testingArray: action.payload };
//       case 'CLEAR_TEST_DATA':
//          return { ...state, count: 0, activeWordTest: '', testingArray: [] };
//       case 'CHANGE_TEST':
//          return {
//             ...state,
//             activeWordTest: state.testingArray ? state.testingArray.shift() : ''
//          };
//       case 'COUNT_INC':
//          return { ...state, count: state.count + 1 };
//       case 'COUNT_RESET':
//          return { ...state, count: 0 };
//       default:
//          return state;
//    }
// };

export const { createTestingArray, clearTestData, changeTest, countInc, countReset } = testReducer.actions;

export default testReducer.reducer;
