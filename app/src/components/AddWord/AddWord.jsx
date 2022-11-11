import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './AddWord.module.scss';

export const AddWord = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setInputValue] = useState('');
  const [translateValue, setTranslateValue] = useState('');

  const newWordAdditionHandler = () => {
    if (!inputValue.trim() || !translateValue.trim())
      return alert('please, inputs a value...');
    const obj = { name: inputValue.trim(), translate: translateValue.trim() };

    if (
      !store.vocabularyReducer.vocabulary.find((item) => item.name === obj.name)
    ) {
      dispatch({ type: 'ADD_WORD', payload: obj });
      alert('word ' + obj.name + ' : ' + obj.translate + ' has been added.');
      setInputValue('');
      setTranslateValue('');
    } else alert('this word has been added already');
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
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <label htmlFor='word'>type a word</label>
      </section>
      <section className={styles['input-section']}>
        <input
          id='translate'
          type='text'
          onChange={(e) => setTranslateValue(e.target.value)}
          value={translateValue}
        />
        <label htmlFor='translate'>type a translation</label>
      </section>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            setInputValue('');
            setTranslateValue('');
          }}
        >
          Clear
        </button>{' '}
        <button className={styles.button} onClick={newWordAdditionHandler}>
          Add
        </button>
      </div>
    </div>
  );
};
