import { createAsyncThunk } from '@reduxjs/toolkit';

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
               isError = 'Error. Type in input name and translate';
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

      return { translation: null };
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
   async (payload, { getState }) => {
      const { vocabulary } = getState();
      console.log(vocabulary);
      if (payload && vocabulary.find((word) => word === payload))
         return payload;

      return;
   },
);

const setAchievedWord = createAsyncThunk(
   ActionTypes.SET_ACHIEVED_WORD,
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
         return rejectWithValue('Element is not defined');
      }

      try {
         const updatedElement = updateElementStatus(getElementByindex);

         const updatedVocabulary = vocabulary.map((elem) =>
            elem.name === updatedElement.name ? updatedElement : elem,
         );

         return { vocabulary: updatedVocabulary };
      } catch (error) {
         console.log(error.message);
      }
   },
);

const setPracticeWord = createAsyncThunk(
   ActionTypes.SET_PRACTICE_WORD,
   async (payload, { getState }) => {
      console.log(payload);
      return;
   },
);

const sortByName = createAsyncThunk(
   ActionTypes.SORT_BY_NAME,
   async (payload, { getState }) => {
      if (!payload) return;
      console.log('createAsyncThunk.ActionTypes.SORT_BY_NAME');
      console.log(payload);
   },
);

const sortByStatus = createAsyncThunk(
   ActionTypes.SORT_BY_STATUS,
   async (payload, { getState }) => {
      if (!payload) return;

      return payload;
   },
);

const sortRandom = createAsyncThunk(
   ActionTypes.SORT_RANDOM,
   async (payload, { getState }) => {
      if (!payload) return;
      return payload;
   },
);

export {
   addWord,
   updateWord,
   deleteWord,
   setAchievedWord,
   setPracticeWord,
   sortByName,
   sortByStatus,
   sortRandom,
};
