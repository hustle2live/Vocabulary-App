import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowTestedWords } from './ShowTestedWords';
import { ShowTestResults } from './ShowTestResults';
import { shuffleAndCut } from './helpers';

export const TestInteractive = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const count = store.count;
  const scorePercentage = (count / 10) * 100;

  const testedElem = store.activeWordTest;

  const changeTest = () =>
    dispatch({
      type: 'changeToNextTest'
    });

  const writeCurrentAnswerStat = (selectedTranslate, testedElement) => {
    const wordName = testedElement.name;
    const test = {};

    if (selectedTranslate === testedElement.translate) {
      dispatch({
        type: 'countInc'
      });
      test[wordName] = 'right';
    } else test[wordName] = 'wrong';
    dispatch({
      type: 'saveCurrentTestStat',
      payload: test
    });
  };

  const saveStats = () => {
    dispatch({
      type: 'saveStatsData',
      payload: `${scorePercentage.toFixed(2)} % correct answers`
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

  return testedElem ? (
    <ShowTestedWords
      changeToNextWord={changeTest}
      writeCurrentAnswerStat={writeCurrentAnswerStat}
      getRandomAnswers={getRandomAnswers}
    />
  ) : (
    <ShowTestResults
      statistics={store.stats}
      saveStats={saveStats}
      score={scorePercentage}
    />
  );
};
