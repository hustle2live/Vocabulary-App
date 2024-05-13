import { createSlice } from '@reduxjs/toolkit';

import { dictionary } from '../../mockdata/dictionary';

import { addWord, changeStatusWord, deleteWord, sortBy } from './actions.js';

const isLocalVocabulary = () => {
   console.log('check for local-storage wookabulary');
   return localStorage.getItem('vocabulary');
};

const defaultState = {
   vocabulary: isLocalVocabulary()
      ? JSON.parse(isLocalVocabulary())
      : [...dictionary],
};

const vocabularyReducer = createSlice({
   initialState: defaultState,
   name: 'vocabulary',
   reducers: {
      exportData: () => {
         const data = isLocalVocabulary();

         try {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
               JSON.stringify(JSON.parse(data)),
            )}`;

            const link = document.createElement('a');
            link.href = jsonString;
            link.download = 'data.json';
            link.click();
         } catch (error) {
            console.log(error);
         }
      },
      importData: (state, action) => {
         console.log('import');
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addWord.fulfilled, (state, action) => {
         const { translation } = action.payload;
         state.vocabulary = [...state.vocabulary, { ...translation }];
         // state.dispatchSuccess = true;
         // state.alertMessage = `word [${translation.name} : ${translation.translate}] - has added succesfully`;
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
