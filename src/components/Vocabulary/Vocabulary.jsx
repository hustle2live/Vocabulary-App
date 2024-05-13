import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mdiCircleMedium } from '@mdi/js';
import Icon from '@mdi/react';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';
import GitHubIcon from '../../styles/icons/github_white.png';

import { AddWordButton } from './AddWordButton';
import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
   const vocabulary = useSelector(
      (state) => state.vocabularyReducer.vocabulary,
   );

   const instructionsRef = useRef(null);

   const dispatch = useDispatch();

   localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

   const WordStatusMark = ({ status }) => {
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
                  className={`block p-3 pl-4 pr-4 m-2 ${styles.wordListElement}`}
                  key={index}
                  onDoubleClick={() => markAsLearnedHandler(index)}
               >
                  <WordStatusMark status={status} />
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

   const Instructions = () => {
      const hideShowDescriptionHandler = () => {
         instructionsRef.current.classList.toggle(styles.expanded);
      };

      return (
         <div className={styles.instructions} ref={instructionsRef}>
            <p className="title"> Wellcome, </p>

            <p className="block subtitle">
               to React.js Vocabulary, made by{' '}
               <a
                  href="https://github.com/hustle2live"
                  target="_blank"
                  rel="noreferrer"
               >
                  Volodymyr K.
               </a>
            </p>

            <p>Description:</p>

            <ul>
               <li className={styles.block}>
                  This is a simple pocket application that helps to learn a
                  foreign language better and faster.
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
                     <span>to practice</span>
                  </div>
                  <div className="icon-text">
                     <span className="icon has-text-success">
                        <Icon path={mdiCircleMedium} size={1} />
                     </span>
                     <span>learned already</span>
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
                     <select id="lng-select">
                        <option>option</option>
                        <option>option 1</option>
                        <option>option 2</option>
                     </select>
                  </span>
                  {/* <label htmlFor="lng-select"> - select language </label> */}
               </p>
            </div>

            <div className="buttons">
               <button
                  className="button is-primary"
                  onClick={hideShowDescriptionHandler}
               >
                  Ok, Got it!
               </button>
               <a
                  href="https://github.com/hustle2live/Vocabulary-App"
                  target="_blank"
                  rel="noreferrer"
                  className="button is-link"
               >
                  Learn more{' '}
                  <img className={styles.ico} src={GitHubIcon} alt="github" />
               </a>
            </div>

            <button
               className={styles.instructions__btn_expand}
               onClick={hideShowDescriptionHandler}
            ></button>
         </div>
      );
   };

   return (
      <div className={styles.wrapper}>
         <Instructions />
         <WordsUlListElement />
         <AddWordButton />
      </div>
   );
};
