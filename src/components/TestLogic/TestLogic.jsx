import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TestInteractivePage } from '../TestInteractive/TestInteractivePage';
import { ShowTestResults } from '../ShowTestResults/ShowTestResults';

import { shuffleAndCut } from '../../features/helpers';

export const TestLogic = () => {
  const dispatch = useDispatch();
  const testedElem = useSelector((state) => state.testReducer.activeWordTest);

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
