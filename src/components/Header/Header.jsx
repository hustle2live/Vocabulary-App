import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
   mdiCircleMedium,
   mdiSort,
   mdiSortAlphabeticalAscending,
   mdiSortDescending,
   mdiSortVariant,
} from '@mdi/js';
import Icon from '@mdi/react';

import { actions as vocabularyActionCreator } from '../../slices/vocabulary/vocabulary.js';
import { SortTypes } from '../../slices/vocabulary/common.js';

import { ContextMenu } from '../ContextMenu/ContextMenu.jsx';

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
         <li className="is-inline-flex">
            <span className="mr-2">Sort</span>
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
               {/* <option className="icon-text" value={SortTypes.SORT_RANDOM}>
                  <span className="icon has-text-dark">
                     <Icon path={mdiCircleMedium} size={1} />
                  </span>
               </option> */}
            </select>
         </li>
         <span>|</span>
         <li className="mr-0 p-1">Settings</li>
         <li className="navbar-item ml-0 has-dropdown">
            <ContextMenu />
         </li>
         <span>|</span>
      </nav>
   );
};
