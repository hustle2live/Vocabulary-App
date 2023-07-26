import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './Header.module.scss';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';

// import { sortByName, sortByStatus, sortRandom } from '../../redux/reducers/vocabularyReducer';

export const Header = () => {
   const navigate = useNavigate(),
      location = useLocation();
   const dispatch = useDispatch();

   const [sort, setSort] = useState('');

   const goToMainPage = () => navigate('/' + location.search);
   const goToTestPage = () => navigate('/test-page' + location.search);

   // const { sortByName, sortByStatus, sortRandom } = vocabularyActionCreator;


   const { sortByName, sortByStatus, sortRandom, sortDefault } = {
      sortByName: 'sortByName',
      sortByStatus: 'sortByStatus',
      sortRandom: 'sortRandom',
      sortDefault: ''
   };

   const sortingMethodHandler = (value) => {
      handleVocabularySort(value);
   };

   const handleVocabularySort = useCallback(
      (sortOrder) => {
         console.log(sortOrder);
         dispatch(vocabularyActionCreator[`${sortOrder}`]());
      },
      [dispatch]
   );

   return (
      <nav className={styles.header}>
         <span>|</span>
         <li onClick={goToMainPage}>DICT</li>
         <span>|</span>
         <li onClick={goToTestPage}>TEST</li>
         <span>|</span>
         <li>NOTE</li>
         <span>|</span>
         <li>CALC</li>
         <span>|</span>
         <li>LANG</li>
         <li>
            <select
               name='sort'
               onChange={(e) => sortingMethodHandler(e.target.value)}
               // onChange={(e) => setSort(e.target.value)}
               className={`${styles.sortingSelector} ${'material-symbols-outlined'}`}
               // defaultValue={'default'}
            >
               <option className={styles.badge} value={sortDefault}>
                  sort
               </option>
               <option value={sortByName}>sort_by_alpha</option>
               <option value={sortByStatus}>category</option>
               <option value={sortRandom}>shuffle</option>
            </select>
            {/* MAYBE SET STATE..... ???  */}
         </li>
         <span>|</span>
      </nav>
   );
};
