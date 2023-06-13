import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddWordButton } from './AddWordButton';
import styles from './Vocabulary.module.scss';

import {
   addWord,
   deleteWord,
   markAchieved,
   markPractice,
   sortByName,
   sortByStatus,
   sortRandom
} from '../../redux/reducers/vocabularyReducer';

export const Vocabulary = () => {
   const state = useSelector((state) => state);
   console.log(state);
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

   const markAsLearned = (index) => {
      console.log('MARK_ACHIEVED_WORD');
      // MARK AS ACHIEVED ---------------
      dispatch(markAchieved(index));
   };

   const WordsUlListEleent = () =>
      vocabulary.map(({ name, translate, status }, index) => (
         <li className={styles.wordListElement} key={index} onDoubleClick={() => markAsLearned(index)}>
            <CircleStatusElement status={status} />
            <p className={styles['word-name']}>{name}</p>
            <p className={styles['word-translate']}>{translate}</p>
            <button
               className={styles.deleteButton}
               label='delete word from list'
               onClick={() => (window.confirm('do you realy wnt to delete word ?') ? dispatch(deleteWord(name)) : null)}
            >
               <span className='material-symbols-rounded'>delete</span>
            </button>
         </li>
      ));

   return (
      <div className={styles.wrapper}>
         <div className={styles.content}>
            <ul className={styles.wordList}>
               <WordsUlListEleent />
            </ul>
            <AddWordButton />
         </div>
      </div>
   );
};
