import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ShowTestResults = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const scorePercentage = props.score;

  return (
    <div className='test-results'>
      <p>
        There is {scorePercentage.toFixed(2)} % correct answers
        <span className='add-text'>in this current test</span>
      </p>
      <button
        className='test-results__button_back'
        onClick={() => {
          props.saveStats();
          navigate('/' + location.search);
        }}
      >
        Close
      </button>
      <p>Previously passed tests</p>
      <button
        className='test-results__arrow_show-stats'
        onClick={(e) => {
          e.currentTarget.nextSibling.classList.toggle('hidden');
        }}
      >
        Show statistics{' '}
        <span className='material-symbols-outlined'>
          keyboard_double_arrow_right
        </span>
      </button>
      <ul className='test-results__history hidden'>
        {!props.statistics ? (
          <p className='message'>
            You haven't passed any tests before current one, yet
          </p>
        ) : (
          props.statistics.map(({ result, tests }, index) => (
            <li key={index}>
              <hr />
              <p>{result}</p>
              <ul>
                {tests.map((obj, index) => (
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
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
