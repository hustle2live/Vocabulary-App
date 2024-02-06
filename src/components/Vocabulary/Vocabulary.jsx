import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { mdiChevronDown, mdiCircleMedium } from '@mdi/js';
import Icon from '@mdi/react';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';

import { AddWordButton } from './AddWordButton';

import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
   const vocabulary = useSelector(
      (state) => state.vocabularyReducer.vocabulary,
   );
   const dispatch = useDispatch();

   localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

   const showHideInstructions = (elem) => {
      elem.classList.toggle('expanded');
   };

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
         <p className="title"> Wellcome, </p>

         <p className="block subtitle">
            to Modern React Vocabulary created by{' '}
            <a href="https://github.com/hustle2live" target="_blank">
               Volodymyr K.
            </a>
         </p>

         <p>Description:</p>

         <ul>
            <li className={styles.block}>
               This is a simple pocket application that helps to learn a foreign
               language better and faster.
            </li>
            <li className={styles.block}>
               All the words are saved to your{' '}
               <strong>local current browser</strong>.
            </li>
            <li className={styles.block}>
               You can <strong>add and practice</strong> new words with
               translations and <strong>delete</strong> after you learn them.
            </li>

            <li className={styles.block}>
               You can <strong>mark </strong>the word's status as:
               <div className="icon-text">
                  <span className="icon has-text-dark">
                     <Icon path={mdiCircleMedium} size={1} />
                  </span>
                  <span>new</span>
               </div>
               <div className="icon-text">
                  <span className="icon has-text-warning">
                     <Icon path={mdiCircleMedium} size={1} />
                  </span>
                  <span>learned</span>
               </div>
               <div className="icon-text">
                  <span className="icon has-text-success">
                     <Icon path={mdiCircleMedium} size={1} />
                  </span>
                  <span>achieved</span>
               </div>
            </li>
         </ul>

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
            <div
               className="button is-primary"
               onClick={(e) => {
                  e.currentTarget.parentNode.parentNode.classList.remove(
                     styles.expanded,
                  );
               }}
            >
               Ok, Got it!
            </div>
            <div href="" className="button is-link">
               Learn more
            </div>
         </div>

         <div
            className={styles.instructions__btn_expand}
            onClick={(e) => {
               e.currentTarget.parentNode.classList.toggle(styles.expanded);
            }}
         ></div>
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
