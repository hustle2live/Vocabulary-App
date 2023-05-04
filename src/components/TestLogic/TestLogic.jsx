import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TestInteractivePage } from '../TestInteractive/TestInteractivePage';
import { ShowTestResults } from '../ShowTestResults/ShowTestResults';

import { shuffleAndCut, dispatchMultiply } from '../../features/helpers';

export const TestLogic = () => {
   const dispatch = useDispatch();
   const state = useSelector((state) => state);
   const testedElem = state.testReducer.activeWordTest;
   const vocabulary = state.vocabularyReducer.vocabulary;

   const startingNewTest = () => {
      const newTestingArray = shuffleAndCut([...vocabulary]);
      dispatchMultiply(dispatch, [
         { type: 'CLEAR_TEST_DATA' },
         { type: 'CLEAR_CURRENT_STAT' },
         { type: 'CREATE_TESTING_ARRAY', payload: newTestingArray },
         { type: 'CHANGE_TEST' }
      ]);
   };

   useEffect(() => {
      // Starting new test after mounting
      startingNewTest();
   }, []);

   const changeTest = () =>
      dispatch({
         type: 'CHANGE_TEST'
      });

   const writeCurrentAnswerStat = (selectedTranslate, testedElement) => {
      const wordName = testedElement.name,
         test = {};

      if (selectedTranslate === testedElement.translate) {
         dispatch({
            type: 'COUNT_INC'
         });
         test[wordName] = 'right';
      } else test[wordName] = 'wrong';

      dispatch({
         type: 'SAVE_CURRENT_TEST_STAT',
         payload: test
      });
   };

   const getRandomAnswers = (arr, testedElement) => {
      const randomAnswers = [testedElement.translate];
      while (randomAnswers.length < 4) {
         const randomIndex = Math.floor(Math.random() * arr.length);
         const randomObj = arr[randomIndex];
         if (!randomAnswers.find((translate) => translate === randomObj.translate))
            randomAnswers.push(randomObj.translate);
      }
      return shuffleAndCut(randomAnswers, 4);
   };

   return (
      <div>
         {testedElem ? (
            <TestInteractivePage
               changeToNextWord={changeTest}
               writeCurrentAnswerStat={writeCurrentAnswerStat}
               getRandomAnswers={getRandomAnswers}
            />
         ) : (
            <ShowTestResults />
         )}
      </div>
   );
};
