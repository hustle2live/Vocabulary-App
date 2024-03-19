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

   const selectWordIteration = (
      { writeCurrentAnswerStat, changeToNextWord },
      text,
      element,
      ulList,
   ) => {
      writeCurrentAnswerStat(text, element);
      changeToNextWord();
      ulList.forEach((node) => node.classList.remove(styles.hide));
   };

   return (
      <div className={styles.wrapper}>
         <h2 className={styles.header}>Word learning test</h2>

         <p className={styles.description}>
            choose the correct translation of the word{' '}
            <span className="nowrap">
               Tests left ( {testNumberCount} / 10 ){' '}
            </span>
         </p>

         <p className={styles['tested-word']}>{testedElement.name}</p>

         <ul className={styles.testUlList}>
            {testedAnswers.map((item) => (
               <li
                  className={`${styles.listElement}`}
                  key={item}
                  style={{
                     minHeight: getRandomInt(100) + '%',
                  }}
                  onClick={(e) => {
                     const ulList = e.currentTarget.parentNode.childNodes;
                     ulList.forEach((node) => node.classList.add(styles.hide));

                     const targetText = e.currentTarget.textContent;

                     const timerWordTest = window.setTimeout(
                        () =>
                           selectWordIteration( props, targetText, testedElement, ulList),
                        1000,
                     );
                  }}
               >
                  <span className="box">{item}</span>
               </li>
            ))}
         </ul>
      </div>
   );
};
