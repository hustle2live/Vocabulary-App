import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { shuffleAndCut } from '../helpers';
import styles from './Vocabulary.module.scss';

export const Vocabulary = () => {
  const store = useSelector((state) => state);
  console.log(store);

  const vocabulary = store.vocabularyReducer.vocabulary;

  // const vocabulary = useSelector((state) => state.vocabularyReducer.vocabulary);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const startNewTest = () => {
    const newTestingArray = shuffleAndCut([...vocabulary]);

    dispatch({ type: 'CLEAR_TEST_DATA' });
    dispatch({ type: 'CLEAR_CURRENT_STAT' });
    dispatch({ type: 'CREATE_TESTING_ARRAY', payload: newTestingArray });
    dispatch({ type: 'CHANGE_TEST' });
    navigate('/test-page' + location.search);
  };

  const goToAddWord = () => navigate('/add-new-word' + location.search);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button>MY DICTIONARY</button> |{' '}
        <button onClick={startNewTest}>START TESTING</button>|{' '}
        <button onClick={goToAddWord}>ADD NEW WORD</button>
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
