import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddWordButton } from './AddWordButton';
import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
   const vocabulary = useSelector((state) => state.vocabularyReducer.vocabulary);
   const dispatch = useDispatch();

   localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

   console.log(vocabulary);

   const CircleStatusElement = ({ status }) => (
      <div className={styles['word-description']}>
         <span
            className={
               status === 'practice'
                  ? styles.circle_practice
                  : status === 'achieved'
                  ? styles.circle_achieved
                  : styles.circle
            }
         ></span>
      </div>
   );

   const WordsUlList = () => (
      <ul className={styles.wordList}>
         {vocabulary.map(({ name, translate, status }, index) => (
            <li className={styles.wordListElement} key={index}>
               <CircleStatusElement status={status} />
               <p className={styles['word-name']}>{name}</p>
               <p className={styles['word-translate']}>{translate}</p>
               <button
                  className={styles.deleteButton}
                  label='delete word from list'
                  onClick={() =>
                     window.confirm('do you realy wnt to delete word ?')
                        ? dispatch({
                             type: 'DELETE_WORD',
                             payload: name
                          })
                        : null
                  }
               >
                  <span className='material-symbols-rounded'>delete</span>
               </button>
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
