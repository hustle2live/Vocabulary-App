import { createSlice } from '@reduxjs/toolkit';

const defaultState = { statArrayCurrent: [], allStats: [] };

export const statsReducer = createSlice({
   name: 'stats',
   initialState: defaultState,
   reducers: {
      saveCurrentStat: (state, action) => {
         state.statArrayCurrent.push(action.payload); // ?
      },

      clearCurrentStat: (state) => {
         // 1
         state.statArrayCurrent = [];
      },

      writeStatsData: (state, action) => {
         if (state.statArrayCurrent?.length) {
            state.allStats = [
               ...state.allStats,
               {
                  result: action.payload,
                  tests: [...state.statArrayCurrent],
                  date: new Date(),
               },
            ];
            state.statArrayCurrent = [];
         }
      },
   },
});

export const { saveCurrentStat, clearCurrentStat, writeStatsData } =
   statsReducer.actions;

export const { actions, name, reducer } = statsReducer;
