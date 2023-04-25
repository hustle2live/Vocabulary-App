import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { shuffleAndCut, dispatchMultiply } from '../../features/helpers';

import styles from './Header.module.scss';

export const Header = () => {
   const dispatch = useDispatch(),
      navigate = useNavigate(),
      location = useLocation(),
      vocabulary = useSelector((state) => state.vocabularyReducer.vocabulary);

   const startNewTest = () => {
      const newTestingArray = shuffleAndCut([...vocabulary]);
      dispatchMultiply(dispatch, [
         { type: 'CLEAR_TEST_DATA' },
         { type: 'CLEAR_CURRENT_STAT' },
         { type: 'CREATE_TESTING_ARRAY', payload: newTestingArray },
         { type: 'CHANGE_TEST' }
      ]);
      navigate('/test-page' + location.search);
   };

   const goToAddWordPage = () => navigate('/add-new-word' + location.search);

   return (
      <header className={styles.header}>
         <button>MY DICTIONARY</button> | <button onClick={startNewTest}>START TESTING</button>|{' '}
         <button onClick={goToAddWordPage}>ADD NEW WORD</button>
      </header>
   );
};
