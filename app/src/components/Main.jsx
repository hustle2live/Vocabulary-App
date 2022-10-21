import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/style.scss';

export const Main = () => {
  const store = useSelector((state) => state);
  const vocabulary = store.vocabulary;

  const dispatch = useDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className='main-container'>
      <header className='main-container__header'>
        <button className='main-container__header__button'>
          MY DICTIONARY
        </button>{' '}
        |{' '}
        <button
          className='main-container__header__button'
          onClick={() => {
            dispatch({
              type: 'startNewTest'
            });
            dispatch({
              type: 'changeToNextTest'
            });
            navigate('/test-page' + location.search);
          }}
        >
          START TESTING
        </button>
        |{' '}
        <button
          className='main-container__header__button'
          onClick={() => navigate('/add-new-word' + location.search)}
        >
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
