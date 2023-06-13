import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';

import { sortByName, sortByStatus, sortRandom } from '../../redux/reducers/vocabularyReducer';

export const Header = () => {
   const navigate = useNavigate(),
      location = useLocation();
   const dispatch = useDispatch();

   const goToMainPage = () => navigate('/' + location.search);
   const goToTestPage = () => navigate('/test-page' + location.search);

   const sortingMethod = {
      byName: sortByName(),
      byStatus: sortByStatus(),
      random: sortRandom()
   };

   const handleSortChange = (e) => {
      e.preventDefault();
      dispatch(sortingMethod[e.target.value]);
   };

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
               onChange={(e) => handleSortChange(e)}
               className={`${styles.sortingSelector} ${'material-symbols-outlined'}`}
               defaultValue={'sort'}
            >
               <option className={styles.badge} value={'sort'}>
                  sort
               </option>
               <option value={'byName'}>sort_by_alpha</option>
               <option value={'byStatus'}>category</option>
               <option value={'random'}>shuffle</option>
            </select>
         </li>
         <span>|</span>
      </nav>
   );
};
