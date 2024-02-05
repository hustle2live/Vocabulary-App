import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { mdiPlus } from '@mdi/js';

import Icon from '@mdi/react';

import styles from './Vocabulary.module.scss';

export const AddWordButton = () => {
   const navigate = useNavigate(),
      location = useLocation();

   const goToAddWordPage = () => navigate('/add-new-word' + location.search);

   const IconPlus = () => <Icon path={mdiPlus} title="Add new word" size={1} />;

   return (
      <button
         onClick={goToAddWordPage}
         className={`${styles.addWordButton} button is-link`}
         label="add new word"
      >
         <span class="icon">
            <IconPlus />
         </span>
      </button>
   );
};
