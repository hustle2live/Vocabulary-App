import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/style.scss';

export const Vocabulary = () => {
  const store = useSelector((state) => state);
  const vocabulary = store.vocabulary;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const startNewTest = () => {
    dispatch({
      type: 'startNewTest'
    });
    dispatch({
      type: 'changeToNextTest'
    });
    navigate('/test-page' + location.search);
  };

  const addNewWord = () => navigate('/add-new-word' + location.search);

  return (
    <div className='main-container'>
      <header className='main-container__header'>
        <button className='main-container__header__button'>
          MY DICTIONARY
        </button>{' '}
        |{' '}
        <button
          className='main-container__header__button'
          onClick={startNewTest}
        >
          START TESTING
        </button>
        |{' '}
        <button className='main-container__header__button' onClick={addNewWord}>
          ADD NEW WORD
        </button>
      </header>
      <div className='main-container__content'>
        <ul className='main-container__content__wordList'>
          {vocabulary.map(({ name, translate }, index) => (
            <li
              className='main-container__content__wordListElement'
              key={index}
            >
              <div className='main-container__content__wordListElement_description'>
                <span className='main-container__content__wordListElement_circle'></span>
              </div>
              <p className='main-container__content__wordListElement_name'>
                {name}
              </p>
              <p className='main-container__content__wordListElement_translate'>
                {translate}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
