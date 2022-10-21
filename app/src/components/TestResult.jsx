import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const TestResult = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  const count = props.count;
  const scorePercentage = (count / 10) * 100;

  const saveStats = () => {
    dispatch({
      type: 'saveStatsData',
      payload: `${scorePercentage.toFixed(2)} % correct answers`
    });
  };

  console.log(props.statistics);
  console.log(props.statsArray);

  return (
    <div className='test-results'>
      <p>There is {scorePercentage.toFixed(2)} % correct answers</p>
      <button
        className='test-results__button_back'
        onClick={() => {
          saveStats();
          navigate('/' + location.search);
        }}
      >
        Close
      </button>
      <p>Previously passed tests</p>
      <p
        className='test-results__arrow_show-stats'
        onClick={(e) => e.currentTarget.nextSibling.classList.toggle('hidden')}
      >
        Show statistics{' '}
        <span className='material-symbols-outlined'>
          keyboard_double_arrow_right
        </span>
      </p>
      <div className='test-results__history hidden'>
        {props.statistics.map(({ result, tests }, index) =>
          result ? (
            <div key={index}>
              <hr />
              <p>{result}</p>
              <ul>
                {tests.map((obj, index) =>
                  obj ? (
                    <li key={index}>
                      {index + 1} | {Object.keys(obj)[0]} :{' '}
                      {Object.values(obj)[0] === 'right' ? (
                        <span className='material-symbols-outlined green'>
                          done
                        </span>
                      ) : (
                        <span className='material-symbols-outlined red'>
                          close
                        </span>
                      )}
                    </li>
                  ) : (
                    ''
                  )
                )}
              </ul>
            </div>
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
};
