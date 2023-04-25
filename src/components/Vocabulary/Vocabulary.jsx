import React from 'react';
import { useSelector } from 'react-redux';

import { AddWordButton } from './AddWordButton';
import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
   const vocabulary = useSelector((state) => state.vocabularyReducer.vocabulary);

   localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

   const WordsUlList = () => (
      <ul className={styles.wordList}>
         {vocabulary.map(({ name, translate }, index) => (
            <li className={styles.wordListElement} key={index}>
               <div className={styles['word-description']}>
                  <span className='circle'></span>
               </div>
               <p className={styles['word-name']}>{name}</p>
               <p className={styles['word-translate']}>{translate}</p>
            </li>
         ))}
      </ul>
   );

   return (
      <div className={styles.wrapper}>
         <div className={styles.content}>
            <WordsUlList />
            <AddWordButton />
         </div>
      </div>
   );
};
