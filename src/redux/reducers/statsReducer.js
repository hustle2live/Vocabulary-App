import { createSlice } from '@reduxjs/toolkit';

const defaultState = { statArrayCurrent: [], stats: '' };

export const statsReducer = createSlice({
   name: 'stats',
   initialState: defaultState,
   reducers: {

    saveCurrentStat: (state, action) => {
         state.stats.statArrayCurrent = [...state.statArrayCurrent, action.payload];
      },

      clearCurrentStat: (state) => {
         state.stats.statArrayCurrent = [];
      },

      writeStatsData: (state, action) => {
         state.stats.allstats = [
            ...state.stats.allstats,
            {
               result: action.payload,
               tests: state.stats.statArrayCurrent
            }
         ];
      }
   }
});

export const { saveCurrentStat, clearCurrentStat, writeStatsData } =
   statsReducer.actions;

export default statsReducer.reducer;

