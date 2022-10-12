import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shuffleAndCut, Testinteractive } from './TestInteractive';

export const CreateTestingArray = (props) => {
  const store = props.store;
  const state = store.getState();
  // const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const testedName = state.activeWordTest;
  // store.subscribe(() => console.log(state.activeWordTest));

  const testingArray = shuffleAndCut([...state.vocabulary]);

  const count = state.count;
  const scorePercentage = (count / 10) * 100;

  const changeTest = () =>
    testingArray
      ? dispatch({
          type: 'setActiveTestWord',
          payload: testingArray.shift()
        })
      : dispatch({
          type: 'resetActiveWord'
        });

  changeTest();
  console.log(state);

  return testedName ? (
    <Testinteractive
      changeToNextWord={changeTest}
      store={store}
      testedElem={testedName}
      vocabulary={state.vocabulary}
      count={state.count}
    />
  ) : (
    <div>
      <p>there is {scorePercentage.toFixed(2)} % correct answers</p>
    </div>
  );
};
