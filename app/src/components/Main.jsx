import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const Main = () => {
  const store = useSelector((state) => state);
  const vocabulary = store.vocabulary;

  const dispatch = useDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className='main-container'>
      <header className='main-container-header'>
        <button className='menu-btn'>DICTIONARY</button> |{' '}
        <button
          className='menu-btn'
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
          GO TO TEST
        </button>
        |{' '}
        <button
          className='menu-btn'
          onClick={() => navigate('/add-new-word' + location.search)}
        >
          ADD NEW
        </button>
      </header>
      <div className='main-container-content'>
        <ul className='wordList'>
          {vocabulary.map(({ name, translate }, index) => (
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
