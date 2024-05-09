import React from 'react';
import { useSelector } from 'react-redux';

import { getRandomInt } from '../../features/helpers';

import styles from './TestInteractivePage.module.scss';

export const TestInteractivePage = (props) => {
   const { testingArray, activeWordTest, activeWordAnswers } = useSelector(
      (state) => state.testReducer,
   );

   const testCounter = testingArray.length + 1;
   const { changeWord, saveStat } = props;

   const selectWordIteration = (text, element, ulList) => {
      saveStat(text, element);
      changeWord();
      ulList.forEach((node) => node.classList.remove(styles.hide));
   };

   return (
      <div className={styles.wrapper}>
         <h2 className={styles.header}>Word learning test</h2>

         <p className={styles.description}>
            choose the correct translation of the word{' '}
            <span className="nowrap">Tests left ( {testCounter} / 10 ) </span>
         </p>

         <p className={styles['tested-word']}>{activeWordTest.name}</p>

         <ul className={styles.testUlList}>
            {activeWordAnswers.map((item) => (
               <li
                  className={`${styles.listElement}`}
                  key={item}
                  onClick={(e) => {
                     const ulList = e.currentTarget.parentNode.childNodes;
                     ulList.forEach((node) => node.classList.add(styles.hide));

                     const targetText = e.currentTarget.textContent;

                     const timerWordTest = window.setTimeout(
                        () =>
                           selectWordIteration(
                              targetText,
                              activeWordTest,
                              ulList,
                           ),
                        1000,
                     );
                  }}
               >
                  <p
                     className="box"
                     style={{
                        marginTop: getRandomInt(40) + '%',
                     }}
                  >
                     {item}
                  </p>
               </li>
            ))}
         </ul>
      </div>
   );
};
