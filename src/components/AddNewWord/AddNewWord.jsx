import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';

import global from '../../styles/styles.module.scss';

import styles from './AddNewWord.module.scss';

export const AddNewWord = () => {
   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [inputValue, setInputValue] = useState('');
   const [translateValue, setTranslateValue] = useState('');

   const clearForm = () => {
      setInputValue('');
      setTranslateValue('');
   };

   const inputHandler = (e) => {
      const re = /^[a-z,.'-()\s]*$/i;
      if (e.target.value === '' || re.test(e.target.value))
         return setInputValue(e.target.value);
   };

   const translateHandler = (e) => {
      const re = /^[а-яёЁЇїІіЄєҐґ,.'-()\s]*$/i;
      if (e.target.value === '' || re.test(e.target.value))
         return setTranslateValue(e.target.value);
   };

   const newWordAddConfirmation = useCallback(
      ({ name, translate }) => {
         dispatch(vocabularyActionCreator.addWord({ name, translate }));
         alert(`word [${name} : ${translate}] - has added succesfully`);
         clearForm();
      },
      [dispatch],
   );

   const newWordAdditionHandler = () => {
      const translation = {
         name: inputValue,
         translate: translateValue,
      };
      return newWordAddConfirmation(translation);
   };

   return (
      <div className={`${global.wrapper} ${styles.wrapper}`}>
         <button
            className={`${styles['navigate-back']} button is-light is-centered`}
            onClick={() => navigate('/' + location.search)}
         >
            <div className={`${styles.textIcon} icon-text`}>
               <span className="ml-auto mr-0">Close</span>

               <span className="icon has-text-dark mr-auto ml-0">
                  <Icon path={mdiClose} size={1} />
               </span>
            </div>
         </button>
         <section className={styles['input-section']}>
            <input
               id="word"
               type="text"
               value={inputValue}
               onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="word">type a word</label>
         </section>
         <section className={styles['input-section']}>
            <input
               id="translate"
               type="text"
               value={translateValue}
               onChange={(e) => translateHandler(e)}
            />
            <label htmlFor="translate">type a translation</label>
         </section>
         <div className="buttons is-centered">
            <button
               className={`${styles.button} button is-dark box mr-4 `}
               onClick={clearForm}
            >
               Clear
            </button>{' '}
            <button
               className={`${styles.button} button is-light box ml-4`}
               onClick={newWordAdditionHandler}
            >
               Add
            </button>
         </div>
      </div>
   );
};
