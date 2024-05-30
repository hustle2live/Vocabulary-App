import { createAsyncThunk } from '@reduxjs/toolkit';

import { shuffleAndCut } from '../../features/helpers.js';

import { actions as statsActionCreator } from '../stats/stats.slice.js';

import { ActionTypes } from './common.js';

const createTestArray = createAsyncThunk(
   ActionTypes.CREATE_TEST_ARRAY,
   async (_, { getState, rejectWithValue }) => {
      try {
         const {
            vocabularyReducer: { vocabulary },
         } = getState();
// const practicePreferWords = vocabulary.filter((word) => )
         const newTestingArray = shuffleAndCut([...vocabulary]);

         return { testArray: newTestingArray };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const getRandomAnswers = createAsyncThunk(
   ActionTypes.GENERATE_ANSWERS,
   async (payload, { rejectWithValue }) => {
      try {
         const { arr, testedElement } = payload;

         const randomAnswers = [testedElement.translate];

         while (randomAnswers.length < 4) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            const randomObj = arr[randomIndex];

            if (
               !randomAnswers.find(
                  (translate) => translate === randomObj.translate,
               )
            )
               randomAnswers.push(randomObj.translate);
         }

         const answers = shuffleAndCut(randomAnswers, 4);

         return { answersArray: answers };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const startNewTest = createAsyncThunk(
   ActionTypes.START_NEW_TEST,
   async (_, { dispatch, getState, rejectWithValue }) => {
      try {
         const {
            vocabularyReducer: { vocabulary },
            testReducer: { activeWordTest },
         } = getState();

         dispatch(statsActionCreator.clearCurrentStat());
         const createTestedArray = await dispatch(createTestArray());
         const { testArray } = createTestedArray.payload;

         const testingArrayCopy = [...testArray];
         const firstTestWord = testingArrayCopy.shift();

         const getAnswersArray = await dispatch(
            getRandomAnswers({ arr: vocabulary, testedElement: firstTestWord }),
         );

         const { answersArray } = getAnswersArray.payload;

         return {
            count: 0,
            firstTestWord: firstTestWord,
            testArray: testingArrayCopy,
            answers: answersArray,
         };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const changeTest = createAsyncThunk(
   ActionTypes.CHANGE_TEST,
   async (_, { getState, rejectWithValue, dispatch }) => {
      try {
         const {
            vocabularyReducer: { vocabulary },
            testReducer: { testingArray },
         } = getState();

         const testArrayCopy = [...testingArray];
         const next = testArrayCopy?.length ? testArrayCopy.shift() : null;

         const getAnswersArray = await dispatch(
            getRandomAnswers({ arr: vocabulary, testedElement: next }),
         );

         const { answersArray } = getAnswersArray.payload;

         return {
            answers: answersArray,
            nextWord: next,
            testArray: testArrayCopy,
         };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export { createTestArray, changeTest, getRandomAnswers, startNewTest };
