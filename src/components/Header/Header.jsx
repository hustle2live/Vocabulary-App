import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';
import { SortTypes } from '../../slices/vocabulary/common.js';

import styles from './Header.module.scss';

export const Header = () => {
   const navigate = useNavigate(),
      location = useLocation();
   const dispatch = useDispatch();

   const goToMainPage = () => navigate('/' + location.search);
   const goToTestPage = () => navigate('/test-page' + location.search);

   const sortingMethodHandler = (value) => {
      handleVocabularySort(value);
   };

   const handleVocabularySort = useCallback(
      (sortOrder) => {
         dispatch(vocabularyActionCreator.sortBy(sortOrder));
      },
      [dispatch],
   );

   return (
      <nav className={styles.header}>
         <span>|</span>
         <li onClick={goToMainPage}>Vocabulary</li>
         <span>|</span>
         <li onClick={goToTestPage}>Testing</li>
         <span>|</span>
         <span>Sorting</span>
         <li>
            <select
               name="sort"
               onChange={(e) => sortingMethodHandler(e.target.value)}
               className={`${
                  styles.sortingSelector
               } ${'material-symbols-outlined'}`}
            >
               <option className={styles.badge} value={SortTypes.SORT_DEFAULT}>
                  sort
               </option>
               <option value={SortTypes.SORT_BY_NAME}>sort_by_alpha</option>
               <option value={SortTypes.SORT_BY_STATUS}>category</option>
               <option value={SortTypes.SORT_RANDOM}>shuffle</option>
            </select>
         </li>
         <span>|</span>
      </nav>
   );
};
