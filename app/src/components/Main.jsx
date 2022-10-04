import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { dictionary } from './dictionary';

export const Main = () => {
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className='main-container'>
      <header className='main-container-header'>
        <button className='menu-btn'>DICTIONARY</button> |{' '}
        <button
          className='menu-btn'
          onClick={() => navigate('/add-new-word' + location.search)}
        >
          ADD NEW
        </button>
      </header>
      <div className='main-container-content'>
        <ul className='wordList'>
          {dictionary.map(({ name, translate }, index) => (
            <li className='wordListElement' key={index}>
              <div className='description'>
                <span className='circle'></span>
              </div>
              <p className='word-name'>{name}</p>
              <p className='word-translate'>{translate}</p>
            </li>
          ))}
        </ul>
      </div>

      <footer></footer>
    </div>
  );
};
