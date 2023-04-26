import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = () => {
   const navigate = useNavigate(),
      location = useLocation();

   const goToMainPage = () => navigate('/' + location.search);
   const goToTestPage = () => navigate('/test-page' + location.search);

   return (
      <nav className={styles.header}>
         <span>|</span>
         <li onClick={goToMainPage}>DICT</li>
         <span>|</span>
         <li onClick={goToTestPage}>TEST</li>
         <span>|</span>
         <li onClick={goToMainPage}>NOTE</li>
         <span>|</span>
         <li onClick={goToMainPage}>CALC</li>
         <span>|</span>
         <li onClick={goToMainPage}>LANG</li>
         <span>|</span>
      </nav>
   );
};