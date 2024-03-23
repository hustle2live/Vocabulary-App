import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionTypes } from './common.js';

const saveCurrentStat = createAsyncThunk(
   ActionTypes.SAVE_CURRENT_STAT,
   async (payload, { rejectWithValue }) => {
      try {
         const { testData } = payload || null;

         return { currentStat: testData };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const writeStatsData = createAsyncThunk(
   ActionTypes.WRITE_STATS_DATA,
   async (payload, { getState, rejectWithValue }) => {
      const {
         statsReducer: { statArrayCurrent },
      } = getState();

      try {
         if (statArrayCurrent?.length && payload) {
            const newStatResult = {
               result: payload,
               tests: [...statArrayCurrent],
               date: new Date(),
            };
            return { statsData: newStatResult };
         }
         return { statsData: null };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export { saveCurrentStat, writeStatsData };
