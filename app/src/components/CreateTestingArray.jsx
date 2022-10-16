import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Testinteractive } from './TestInteractive';
import { TestResult } from './TestResult';

export const CreateTestingArray = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const count = store.count;

  const changeTest = () =>
    dispatch({
      type: 'changeToNextTest'
    });

  const statsArray = [];

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

  const testedElem = store.activeWordTest;

  console.log(store.stats);

  return testedElem ? (
    <Testinteractive
      changeToNextWord={changeTest}
      writeCurrentAnswerStat={writeCurrentAnswerStat}
    />
  ) : (
    <TestResult
      count={count}
      statsArray={statsArray}
      statistics={store.stats}
    />
  );
};
