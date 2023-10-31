import { createAsyncThunk } from '@reduxjs/toolkit';

import { shuffleAndCut } from '../../features/helpers';

import { ActionTypes } from './common.js';

const addWord = createAsyncThunk(
   ActionTypes.ADD_WORD,
   async (payload, { getState, rejectWithValue }) => {
      const {
         vocabularyReducer: { vocabulary },
      } = getState();

      const name = payload.name.trim().toLowerCase();
      const translate = payload.translate.trim().toLowerCase();

      const doesWordExist = (newWordName, itemKeyName) =>
         !!vocabulary.find(
            (item) =>
               item[itemKeyName] &&
               item[itemKeyName].toLowerCase() === newWordName,
         );

      try {
         let isError = '';

         switch (true) {
            case !name || !translate:
               isError = 'Error. Type in input name and translation';
               break;
            case name.length < 3 || translate.length < 3:
               isError =
                  'Error. Word name and translation must be at least 3 charackters long';
               break;
            case doesWordExist(name, 'name'):
               isError = 'This Word has been already exits in a dictionary';
               break;
            case doesWordExist(translate, 'translate'):
               isError =
                  'This Translate has been already defined to a dictionary';
               break;
            default:
               return {
                  translation: {
                     name,
                     translate,
                     status: 'new',
                     createdAt: '',
                     updatedAt: '',
                  },
               };
         }

         if (isError) {
            throw new Error(isError);
         }
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
         const copyElem = Object.assign({}, elem);
         const statusCnanger = {
            new: 'practice',
            practice: 'achieved',
            achieved: 'practice',
         };
         if (copyElem) {
            copyElem.status = statusCnanger[copyElem.status];
         }
         return copyElem;
      };

      const getElementByindex = vocabulary.find(
         (elem, index) => index === payload,
      );

      if (!getElementByindex) {
         throw new Error('Element index is not defined in vocabulary');
      }

      try {
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
            return elem.sort((a, b) => (a.status < b.status ? -1 : 0));
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
