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

  return (
    <div className='test-result'>
      <p>there is {scorePercentage.toFixed(2)} % correct answers</p>
      <button
        className='back-btn'
        onClick={() => {
          saveStats();
          navigate('/' + location.search);
        }}
      >
        Close
      </button>
    </div>
  );
};
