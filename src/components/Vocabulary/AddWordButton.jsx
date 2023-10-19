import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Vocabulary.module.scss';

export const AddWordButton = () => {
   const navigate = useNavigate(),
      location = useLocation();

   const goToAddWordPage = () => navigate('/add-new-word' + location.search);

   return (
      <button
         onClick={goToAddWordPage}
         className={styles.addWordButton}
         label="add new word"
      >
         <span className="material-symbols-rounded">add_circle</span>
      </button>
   );
};
