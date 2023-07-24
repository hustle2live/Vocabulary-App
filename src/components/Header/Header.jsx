import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';

// import { sortByName, sortByStatus, sortRandom } from '../../redux/reducers/vocabularyReducer';

export const Header = () => {
   const navigate = useNavigate(),
      location = useLocation();
   const dispatch = useDispatch();

   const goToMainPage = () => navigate('/' + location.search);
   const goToTestPage = () => navigate('/test-page' + location.search);

   const { sortByName, sortByStatus, sortRandom } = vocabularyActionCreator;

   const sortingMethodHandler = (e) => {
      // e.preventDefault();
      console.log(e);
      const sortOrder = e.target.value;
      handleVocabularySort(sortOrder);
   };

   const handleVocabularySort = useCallback(
      (sort) => {
         dispatch(vocabularyActionCreator[sort]());
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
               onChange={(e) => sortingMethodHandler(e)}
               className={`${styles.sortingSelector} ${'material-symbols-outlined'}`}
               defaultValue={'default'}
            >
               <option className={styles.badge} value={'default'}>
                  sort
               </option>
               <option value={sortByName}>sort_by_alpha</option>
               <option value={sortByStatus}>category</option>
               <option value={sortRandom}>shuffle</option>
            </select>
         </li>
         <span>|</span>
      </nav>
   );
};
