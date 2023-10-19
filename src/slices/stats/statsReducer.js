import { createSlice } from '@reduxjs/toolkit';

const defaultState = { statArrayCurrent: [], allStats: [] };

export const statsReducer = createSlice({
   name: 'stats',
   initialState: defaultState,
   reducers: {
      saveCurrentStat: (state, action) => {
         state.statArrayCurrent.push(action.payload);
      },

      clearCurrentStat: (state) => {
         state.statArrayCurrent = [];
      },

      writeStatsData: (state, action) => {
         state.allStats = [
            ...state.allStats,
            {
               result: action.payload,
               tests: [...state.statArrayCurrent],
               date: new Date()
            }
         ];
      }
   }
});

export const { saveCurrentStat, clearCurrentStat, writeStatsData } = statsReducer.actions;

export const { actions, name, reducer } = statsReducer;
