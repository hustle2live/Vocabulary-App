import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const NewWordAddition = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.vocabulary);

  let navigate = useNavigate();
  let location = useLocation();

  const [inputValue, setInputValue] = useState('');
  const [translateValue, setTranslateValue] = useState('');

  const newWordAdditionHandler = () => {
    if (!inputValue.trim() || !translateValue.trim())
      return alert('please, inputs a value...');
    const obj = { name: inputValue.trim(), translate: translateValue.trim() };

    if (!store.find((item) => item.name === obj.name)) {
      dispatch({ type: 'addNewWord', payload: obj });
      alert('word ' + obj.name + ' : ' + obj.translate + ' has been added.');
      setInputValue('');
      setTranslateValue('');
    } else alert('this word has been added already');
  };

  return (
    <div className='word-addition'>
      <button
        className='word-addition__button_navigate-back'
        onClick={() => navigate('/' + location.search)}
      >
        <span>CLOSE </span>[X]
      </button>
      <section className='word-addition__input-section'>
        <input
          id='word'
          type='text'
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <label htmlFor='word'>type a word</label>
      </section>
      <section className='word-addition__input-section'>
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
          className='word-addition__button_clear'
          onClick={() => {
            setInputValue('');
            setTranslateValue('');
          }}
        >
          CLEAR
        </button>{' '}
        <button
          className='word-addition__button_add'
          onClick={newWordAdditionHandler}
        >
          ADD
        </button>
      </div>
    </div>
  );
};
