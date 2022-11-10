import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { shuffleAndCut } from '../helpers';
import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
  const store = useSelector((state) => state);

  const vocabulary = store.vocabulary;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const startNewTest = () => {
    const newTestingArray = shuffleAndCut([...vocabulary]);
    console.log('newTestingArray');
    console.log(newTestingArray);
    console.log('__________________________________________');
    console.log('store before smtn');
    console.log(store);

    dispatch({ type: 'startNewTest', payload: newTestingArray });

    console.log('__________________________________________');
    console.log('store after startNewTest dispatch');
    console.log(store);

    dispatch({ type: 'changeToNextTest' });

    console.log('__________________________________________');
    console.log('changeToNextTest');
    console.log(store);

    navigate('/test-page' + location.search);
  };

  const addNewWord = () => navigate('/add-new-word' + location.search);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button>MY DICTIONARY</button> |{' '}
        <button onClick={startNewTest}>START TESTING</button>|{' '}
        <button onClick={addNewWord}>ADD NEW WORD</button>
      </header>
      <div className={styles.content}>
        <ul className={styles.wordList}>
          {vocabulary.map(({ name, translate }, index) => (
            <li className={styles.wordListElement} key={index}>
              <div className={styles['word-description']}>
                <span></span>
              </div>
              <p className={styles['word-name']}>{name}</p>
              <p className={styles['word-translate']}>{translate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
