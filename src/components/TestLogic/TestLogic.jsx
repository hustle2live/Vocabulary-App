import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TestInteractivePage } from '../TestInteractive/TestInteractivePage';
import { ShowTestResults } from '../ShowTestResults/ShowTestResults';

import { shuffleAndCut, dispatchMultiply } from '../../features/helpers';
import { saveCurrentStat, clearCurrentStat } from '../../redux/reducers/statsReducer';
import { createTestingArray, clearTestData, changeTest, countInc } from '../../redux/reducers/testReducer';

export const TestLogic = () => {
   const dispatch = useDispatch();
   const store = useSelector((state) => state);
   const doesTestedElementExist = store.testReducer.activeWordTest;
   const vocabulary = store.vocabularyReducer.vocabulary;

   const startingNewTest = () => {
      const newTestingArray = shuffleAndCut([...vocabulary]);

      dispatchMultiply(dispatch, [
         clearCurrentStat(),
         clearTestData(),
         createTestingArray(newTestingArray),
         changeTest()
      ]);
   };

   const changeCurrentTest = () => dispatch(changeTest());

   const writeCurrentAnswerStat = (selectedTranslate, testedElement) => {
      const wordName = testedElement.name;
      const test = { [wordName]: 'wrong' };

      if (selectedTranslate === testedElement.translate) {
         dispatch(countInc());
         test[wordName] = 'right';
      }

      dispatch(saveCurrentStat(test));
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

   useEffect(() => {
      startingNewTest(); // Starting new test after mounting component
   }, []);

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
