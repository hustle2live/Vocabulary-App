import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './AddWord.module.scss';

export const AddWord = () => {
  const wordsStore = useSelector((state) => state.vocabularyReducer.vocabulary),
    location = useLocation(),
    dispatch = useDispatch(),
    navigate = useNavigate();

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

  const newWordAdditionHandler = () => {
    const [name, translate] = [inputValue.trim(), translateValue.trim()];

    const hasNewWordBeenInDictionary = () =>
      wordsStore.find((item) => item.name.toLowerCase() === name.toLowerCase());

    const newWordAddConfirmation = () => {
      dispatch({ type: 'ADD_WORD', payload: { name, translate } });
      alert(`word [${name} : ${translate}] - has added succesfully`);
      clearForm();
    };

    if (name && translate) {
      return hasNewWordBeenInDictionary()
        ? alert(`word '${name}' has been already in Dictionary`)
        : newWordAddConfirmation();
    }

    return alert('please, inputs a value...');
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles['navigate-back']}
        onClick={() => navigate('/' + location.search)}
      >
        <span>CLOSE </span>[X]
      </button>
      <section className={styles['input-section']}>
        <input
          id='word'
          type='text'
          value={inputValue}
          onChange={(e) => inputHandler(e)}
        />
        <label htmlFor='word'>type a word</label>
      </section>
      <section className={styles['input-section']}>
        <input
          id='translate'
          type='text'
          value={translateValue}
          onChange={(e) => translateHandler(e)}
        />
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
