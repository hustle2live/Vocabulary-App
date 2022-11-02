import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Results.module.scss';

export const Results = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const scorePercentage = props.score;

  return (
    <div className={styles.wrapper}>
      <p>
        There is {scorePercentage.toFixed(2)} % correct answers
        <span className={styles['add-text']}>in this current test</span>
      </p>
      <button
        className={styles.button_back}
        onClick={() => {
          props.saveStats();
          navigate('/' + location.search);
        }}
      >
        Close
      </button>
      <p>Previously passed tests</p>
      <button
        className={styles.arrow_showStats}
        onClick={(e) => {
          e.currentTarget.nextSibling.classList.toggle(styles.hidden);
        }}
      >
        Show statistics{' '}
        <span className={'material-symbols-outlined'}>
          keyboard_double_arrow_right
        </span>
      </button>
      <ul className={`${styles.history} ${styles.hidden}`}>
        {!props.statistics ? (
          <p className={styles.message}>
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
                      <span
                        className={`material-symbols-outlined ${styles.green}`}
                      >
                        done
                      </span>
                    ) : (
                      <span
                        className={`material-symbols-outlined ${styles.red}`}
                      >
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
