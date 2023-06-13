import React from 'react';
import { useSelector } from 'react-redux';

import { getRandomInt } from '../../features/helpers';

import styles from './TestInteractivePage.module.scss';

export const TestInteractivePage = (props) => {
   const store = useSelector((state) => state);

   const vocabulary = store.vocabularyReducer.vocabulary;
   const testedElement = store.testReducer.activeWordTest;
   const testNumberCount = store.testReducer.testingArray.length + 1;
   const testedAnswers = props.getRandomAnswers(vocabulary, testedElement);

   return (
      <div className={styles.wrapper}>
         <h1 className={styles.header}>Word learning test</h1>
         <p className={styles.description}>
            choose the correct translation of the word
            <span>Tests left ( {testNumberCount} / 10 ) </span>
         </p>

         <p className={styles['tested-word']}>{testedElement.name}</p>
         <ul className={styles.testUlList}>
            {testedAnswers.map((item) => (
               <li
                  className={styles.listElement}
                  key={item}
                  style={{ height: getRandomInt(100) + '%' }}
                  onClick={(e) => {
                     props.writeCurrentAnswerStat(e.currentTarget.textContent, testedElement);
                     props.changeToNextWord();
                  }}
               >
                  <span>{item}</span>
               </li>
            ))}
         </ul>
      </div>
   );
};
