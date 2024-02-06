import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { mdiPlus } from '@mdi/js';

import Icon from '@mdi/react';

import styles from './Vocabulary.module.scss';

export const AddWordButton = () => {
   const navigate = useNavigate(),
      location = useLocation();

   const goToAddWordPage = () => navigate('/add-new-word' + location.search);

   const IconPlus = () => <Icon path={mdiPlus} title="Add new word" size={2} />;

   return (
      <button
         onClick={goToAddWordPage}
         className={`${styles.addWordButton} button is-medium is-link box`}
         label="add new word"
      >
         <span className={`${styles.textIcon} icon-text`}>
            <span className="icon">
               <IconPlus />
            </span>
            <span> Нове</span>
         </span>
      </button>
   );
};
