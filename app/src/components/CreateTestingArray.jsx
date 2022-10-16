import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
import { Testinteractive } from './TestInteractive';
import { TestResult } from './TestResult';

export const CreateTestingArray = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  // let navigate = useNavigate();
  // let location = useLocation();

  const count = store.count;
  // const scorePercentage = (count / 10) * 100;

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
    <TestResult count={count} statsArray={statsArray} />
  );
};
