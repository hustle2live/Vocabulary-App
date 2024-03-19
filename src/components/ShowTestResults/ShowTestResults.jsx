import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { writeStatsData } from '../../slices/stats/statsReducer';

import styles from './ShowTestResults.module.scss';

export const ShowTestResults = () => {
   const store = useSelector((state) => state);
   const count = store.testReducer.count;
   const stats = store.statsReducer.allStats;

   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();

   const scorePercentage = ((count / 10) * 100).toFixed(2);

   useEffect(() => {
      dispatch(writeStatsData(`${scorePercentage} % correct answers`));
   }, [dispatch]);

   const EmptyStatsMessage = () => (
      <p className={styles.message}>
         You haven't passed any tests before current one, yet
      </p>
   );

   const StatsListElement = () =>
      stats && stats.length > 0 ? (
         stats.map(({ result, tests }, index) => (
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
      ) : (
         <EmptyStatsMessage />
      );

   return (
      <div className={styles.wrapper}>
         <p>
            There is {scorePercentage} % correct answers
            <span className={styles['add-text']}>in this current test</span>
         </p>
         <button
            className={styles.button_back}
            onClick={() => {
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
            <StatsListElement />
         </ul>
      </div>
   );
};
