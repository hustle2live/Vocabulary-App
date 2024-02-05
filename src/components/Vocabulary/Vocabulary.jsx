import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';

import { AddWordButton } from './AddWordButton';
import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
   const vocabulary = useSelector(
      (state) => state.vocabularyReducer.vocabulary,
   );
   const dispatch = useDispatch();

   localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

   const RatingStatus = ({ status }) => {
      const elemStatusStyles = {
         practice: styles.circle_practice,
         achieved: styles.circle_achieved,
         new: styles.circle,
      };

      return (
         <div className={styles['word-description']}>
            <span className={elemStatusStyles[status]}></span>
         </div>
      );
   };

   const markAsLearnedHandler = useCallback(
      (id) => {
         dispatch(vocabularyActionCreator.changeStatusWord(id));
      },
      [dispatch],
   );

   const deleteWordHandler = useCallback(
      (word) => {
         dispatch(vocabularyActionCreator.deleteWord(word));
      },
      [dispatch],
   );

   const WordsUlListElement = () => (
      <div className={styles.content}>
         <ul className={styles.wordList}>
            {vocabulary.map(({ name, translate, status }, index) => (
               <li
                  className={styles.wordListElement}
                  key={index}
                  onDoubleClick={() => markAsLearnedHandler(index)}
               >
                  <RatingStatus status={status} />
                  <p className={styles['word-name']}>{name}</p>
                  <p className={styles['word-translate']}>{translate}</p>
                  <button
                     className={`${styles.deleteButton} delete is-medium`}
                     label="delete word from list"
                     onClick={() =>
                        window.confirm('do you realy wnt to delete word ?')
                           ? deleteWordHandler(name)
                           : null
                     }
                  ></button>
               </li>
            ))}
         </ul>
      </div>
   );

   const Instructions = () => (
      <div className={styles.instructions}>
         <h1 className="title">Hello, </h1>

         <p className="subtitle">
            Wellcome to Modern React Vocabulary created by{' '}
            <a href="https://github.com/hustle2live" target="_blank">
               Volodymyr K.
            </a>
         </p>

         <div className="field">
            <div className="control">
               <input className="input" type="text" placeholder="Input" />
            </div>
         </div>

         <div className="field">
            <p className="control">
               <span className="select">
                  <select>
                     <option>Select dropdown</option>
                     <option>Select dropdown</option>
                     <option>Select dropdown</option>
                  </select>
               </span>
            </p>
         </div>

         <div className="buttons">
            <div href="" className="button is-primary">
               Primary
            </div>
            <div href="" className="button is-link">
               Link
            </div>
         </div>
      </div>
   );

   return (
      <div className={styles.wrapper}>
         <Instructions />
         <WordsUlListElement />
         <AddWordButton />
      </div>
   );
};
