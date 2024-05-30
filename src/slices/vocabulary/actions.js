import { createAsyncThunk } from '@reduxjs/toolkit';

import {
   WordStatus,
   changewStatusWord,
   lowerFormatCase,
   shuffleAndCut,
} from '../../features/helpers';

import { ActionTypes } from './common.js';

const addWord = createAsyncThunk(
   ActionTypes.ADD_WORD,
   async (payload, { getState, rejectWithValue }) => {
      try {
         const {
            vocabularyReducer: { vocabulary },
         } = getState();

         const wordName = lowerFormatCase(payload.name);
         const wordTranslate = lowerFormatCase(payload.translate);

         const doesWordExist = () =>
            vocabulary.some(
               ({ name, translate }) =>
                  name === wordName || translate === wordTranslate,
            );

         if (doesWordExist())
            return rejectWithValue('Word or translate Has Already Exist');

         return {
            translation: {
               name: wordName,
               translate: wordTranslate,
               status: WordStatus.NEW,
               createdAt: '',
               updatedAt: '',
            },
         };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const updateWord = createAsyncThunk(
   ActionTypes.UPDATE_WORD,
   async (payload, { getState }) => {
      return;
   },
);

const deleteWord = createAsyncThunk(
   ActionTypes.DELETE_WORD,
   async (payload, { getState, rejectWithValue }) => {
      const {
         vocabularyReducer: { vocabulary },
      } = getState();

      try {
         const deletedWord =
            vocabulary.find((word) => word.name === payload) || null;

         if (!deletedWord) throw new Error('deleted word is not defined');

         const filtered = vocabulary.filter(
            (item) => item.name !== deletedWord.name,
         );

         return { updatedVocabulary: filtered };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const changeStatusWord = createAsyncThunk(
   ActionTypes.CHANGE_STATUS_WORD,
   async (payload, { getState, rejectWithValue }) => {
      const {
         vocabularyReducer: { vocabulary },
      } = getState();

      const updateElementStatus = (elem) => {
         const copyElem = { ...elem };
         return { ...copyElem, status: changewStatusWord(copyElem.status) };
      };

      try {
         const getElementByindex = vocabulary.find(
            (_, index) => index === payload,
         );

         if (!getElementByindex) {
            throw new Error('Element index is not defined in vocabulary');
         }

         const updatedElement = updateElementStatus(getElementByindex);

         const updatedVocabulary = vocabulary.map((elem) =>
            elem.name === updatedElement.name ? updatedElement : elem,
         );

         return { vocabulary: updatedVocabulary };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const sortBy = createAsyncThunk(
   ActionTypes.SORT_BY,
   async (payload, { getState, rejectWithValue }) => {
      const {
         vocabularyReducer: { vocabulary },
      } = getState();

      const sortingMethod = {
         sortByName(elem) {
            return elem.sort((a, b) => (a.name < b.name ? -1 : 0));
         },
         sortByStatus(elem) {
            return elem.sort((a, b) => (a.status > b.status ? -1 : 0));
         },
         sortRandom(elem) {
            return shuffleAndCut(elem, elem.length);
         },
      };

      try {
         const sorting = sortingMethod[`${payload}`]([...vocabulary]) || null;

         if (!sorting) throw new Error('ERROR createAsyncThunk-SORT');

         return { vocabularySorted: sorting };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export { addWord, changeStatusWord, deleteWord, sortBy, updateWord };
