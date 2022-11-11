import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Interactive } from './Interactive';
import { Results } from './Results';
import { shuffleAndCut } from '../helpers';

export const TestInteractive = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const count = store.testReducer.count;
  const testedElem = store.testReducer.activeWordTest;
  const scorePercentage = (count / 10) * 100;

  const changeTest = () =>
    dispatch({
      type: 'CHANGE_TEST'
    });

  const writeCurrentAnswerStat = (selectedTranslate, testedElement) => {
    const wordName = testedElement.name;
    const test = {};

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

  const saveStats = () => {
    dispatch({
      type: 'SAVE_STATS_DATA',
      payload: `${scorePercentage.toFixed(2)} % correct answers`
    });

    dispatch({
      type: 'CLEAR_TEST_DATA'
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
        <Interactive
          changeToNextWord={changeTest}
          writeCurrentAnswerStat={writeCurrentAnswerStat}
          getRandomAnswers={getRandomAnswers}
        />
      ) : (
        <Results
          stats={store.statsReducer.stats}
          saveStats={saveStats}
          score={scorePercentage}
        />
      )}
    </div>
  );
};
