import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NewWordAddition = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [inputValue, setInputValue] = useState('');
  const [translateValue, setTranslateValue] = useState('');

  const handleChange = (setElemFunction, e) => setElemFunction(e.target.value);

  const newWordAdditionHandler = () => {
    if (!inputValue.trim() || !translateValue.trim())
      return alert('please, inputs a value...');

    alert(
      `new word [${inputValue.trim()} - ${translateValue.trim()}] was added.`
    );

    // your code to add a word...
  };

  return (
    <div className='word-addition-main'>
      <button
        className='back-btn'
        onClick={() => navigate('/' + location.search)}
      >
        <span>CLOSE </span>[X]
      </button>
      <section className='input-section'>
        <input
          id='word'
          className='word-input word'
          type='text'
          onChange={(e) => handleChange(setInputValue, e)}
          value={inputValue}
        />
        <label htmlFor='word'>type a word</label>
      </section>
      <section className='input-section'>
        <input
          id='translate'
          className='word-input translate'
          type='text'
          onChange={(e) => handleChange(setTranslateValue, e)}
          value={translateValue}
        />
        <label htmlFor='translate'>type a translation</label>
      </section>
      <div>
        <button
          className='clear-btn'
          onClick={() => {
            setInputValue('');
            setTranslateValue('');
          }}
        >
          CLEAR
        </button>{' '}
        <button className='additiin-btn' onClick={newWordAdditionHandler}>
          ADD
        </button>
      </div>
    </div>
  );
};
