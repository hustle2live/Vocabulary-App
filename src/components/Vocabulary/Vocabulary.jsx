import React from 'react';
import { useSelector } from 'react-redux';

import { Header } from '../Header/Header';

import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
   const vocabulary = useSelector((state) => state.vocabularyReducer.vocabulary);

   localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

   return (
      <div className={styles.wrapper}>
         <Header />
         <div className={styles.content}>
            <ul className={styles.wordList}>
               {vocabulary.map(({ name, translate }, index) => (
                  <li className={styles.wordListElement} key={index}>
                     <div className={styles['word-description']}>
                        <span></span>
                     </div>
                     <p className={styles['word-name']}>{name}</p>
                     <p className={styles['word-translate']}>{translate}</p>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};
