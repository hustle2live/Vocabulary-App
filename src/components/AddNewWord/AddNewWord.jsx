import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';

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
      if (e.target.value === '' || re.test(e.target.value)) return setInputValue(e.target.value);
   };

   const translateHandler = (e) => {
      const re = /^[а-яёЁЇїІіЄєҐґ,.'-()\s]*$/i;
      if (e.target.value === '' || re.test(e.target.value)) return setTranslateValue(e.target.value);
   };

   const newWordAddConfirmation = useCallback(
      ({ name, translate }) => {
         dispatch(vocabularyActionCreator.addWord({ name, translate }));
         alert(`word [${name} : ${translate}] - has added succesfully`);
         clearForm();
      },
      [dispatch]
   );

   const newWordAdditionHandler = () => {
      const translation = {
         name: inputValue,
         translate: translateValue
      };
      return newWordAddConfirmation(translation);
   };

   return (
      <div className={styles.wrapper}>
         <button className={styles['navigate-back']} onClick={() => navigate('/' + location.search)}>
            <span>CLOSE </span>[X]
         </button>
         <section className={styles['input-section']}>
            <input id='word' type='text' value={inputValue} onChange={(e) => inputHandler(e)} />
            <label htmlFor='word'>type a word</label>
         </section>
         <section className={styles['input-section']}>
            <input id='translate' type='text' value={translateValue} onChange={(e) => translateHandler(e)} />
            <label htmlFor='translate'>type a translation</label>
         </section>
         <div>
            <button className={styles.button} onClick={clearForm}>
               Clear
            </button>{' '}
            <button className={styles.button} onClick={newWordAdditionHandler}>
               Add
            </button>
         </div>
      </div>
   );
};
