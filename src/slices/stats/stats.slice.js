import { createSlice } from '@reduxjs/toolkit';

import { saveCurrentStat, writeStatsData } from './actions.js';

const defaultState = { statArrayCurrent: [], allStats: [] };

export const statsReducer = createSlice({
   name: 'stats',
   initialState: defaultState,
   reducers: {
      clearCurrentStat: (state) => {
         state.statArrayCurrent = [];
      },
   },
   extraReducers: (builder) => {
      builder.addCase(saveCurrentStat.fulfilled, (state, action) => {
         const { currentStat } = action.payload;
         if (currentStat) state.statArrayCurrent.push(currentStat);
      });

      builder.addCase(writeStatsData.fulfilled, (state, action) => {
         const { statsData } = action.payload;

         if (statsData) {
            state.allStats = [...state.allStats, statsData];
            state.statArrayCurrent = [];
         }
      });

      builder.addCase(saveCurrentStat.pending, (state, action) => {});
      builder.addCase(writeStatsData.pending, (state, action) => {});

      builder.addCase(saveCurrentStat.rejected, (state, action) => {});
      builder.addCase(writeStatsData.rejected, (state, action) => {});
   },
});

export const { actions, name, reducer } = statsReducer;
