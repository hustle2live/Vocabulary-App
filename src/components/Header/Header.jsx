import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
   mdiCircleMedium,
   mdiSort,
   mdiSortAlphabeticalAscending,
   mdiSortDescending,
   mdiSortVariant,
   mdiMenu,
   mdiPlus,
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

   const IconMenu = ({ ico, text = 'alt ico' }) => (
      <Icon path={ico} title={text} size={2} />
   );

   return (
      <nav className={styles.header}>
         <span>|</span>
         <li className="tag has-background-black">
            <button
               className="tag has-text-white is-primary has-background-black is-responsive is-outlined"
               onClick={goToMainPage}
            >
               Vocabulary
            </button>
         </li>
         <span>|</span>
         <li className="tag has-background-black">
            <button
               className="tag has-text-white has-background-black is-responsive is-outlined"
               onClick={goToTestPage}
            >
               Testing
            </button>
         </li>
         <span>|</span>
         <li className="m-0 p-0">
            <select
               name="sort"
               onChange={(e) => sortingMethodHandler(e.target.value)}
               className="tag has-text-white has-background-black is-outlined"
            >
               <option
                  className={`${styles.badge}`}
                  value={SortTypes.SORT_DEFAULT}
               >
                  Sort
               </option>
               <option
                  className="has-text-white"
                  value={SortTypes.SORT_BY_NAME}
               >
                  by name
               </option>
               <option
                  className="has-text-white"
                  value={SortTypes.SORT_BY_STATUS}
               >
                  by status
               </option>
               <option
                  className="has-text-white p-2"
                  value={SortTypes.SORT_RANDOM}
               >
                  shuffle
               </option>
            </select>
         </li>
         <span>|</span>
         <li className="">
            <span className="tag has-text-white is-primary has-background-black is-responsive is-outlined is-small">
               Settings
            </span>
            <ContextMenu />
         </li>
         <span>|</span>
      </nav>
   );
};

{
   /* <IconMenu
                     className="span is-small"
                     ico={mdiCircleMedium}
                     text="by name A-Z"
                  /> */
}
