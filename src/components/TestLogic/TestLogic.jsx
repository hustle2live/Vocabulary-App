import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dispatchMultiply, shuffleAndCut } from '../../features/helpers';
import { ShowTestResults } from '../ShowTestResults/ShowTestResults';
import { TestInteractivePage } from '../TestInteractive/TestInteractivePage';

import { actions as statsActionCreator } from '../../slices/stats/stats.js';
import { actions as testActionCreator } from '../../slices/interactive/test.js';

export const TestLogic = () => {
   const dispatch = useDispatch();
   const store = useSelector((state) => state);
   const doesTestedElementExist = store.testReducer.activeWordTest;

   const changeCurrentTest = () => dispatch(testActionCreator.changeTest());

   const writeCurrentAnswerStat = (translate, element) => {
      const wordName = element?.name ?? null;
      let answer = 'wrong';

      const isAnswerRight = translate === element.translate;

      if (isAnswerRight) {
         answer = 'right';
         dispatch(testActionCreator.countInc());
      }

      const testCase = !wordName ? null : { [wordName]: answer };
      dispatch(statsActionCreator.saveCurrentStat({ testData: testCase }));
   };

   const getRandomAnswers = (arr, testedElement) => {
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
      return shuffleAndCut(randomAnswers, 4);
   };

   useEffect(() => {
      dispatch(testActionCreator.startNewTest()); // Starting new test after mounting component
   }, [dispatch]);

   return (
      <div>
         {doesTestedElementExist ? (
            <TestInteractivePage
               changeToNextWord={changeCurrentTest}
               writeCurrentAnswerStat={writeCurrentAnswerStat}
               getRandomAnswers={getRandomAnswers}
            />
         ) : (
            <ShowTestResults />
         )}
      </div>
   );
};
