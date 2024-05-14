import React, { useRef, useState } from 'react';

import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';

import styles from './ContextMenu.module.scss';

import '../../styles/styles.module.scss';

export const ContextMenu = (props) => {
   const { exportFunc, importFunc } = props;

   const menuRef = useRef(null);

   const menuOpenCloseHandler = () =>
      menuRef.current.classList.toggle('is-active');

   const fileMaxSize = 2000000;
   const fileExtName = /^.+(\.json)+$/gi;

   const IconMenu = () => <Icon path={mdiMenu} title="Add new word" />;

   const isFileNameSizeCorrect = (file) => {
      try {
         if (!file) {
            throw Error('File does not selected');
         }
         if (file.size > fileMaxSize) {
            throw Error('invalid size');
         }
         if (!fileExtName.test(file.name)) {
            throw Error('invalid format');
         }
         return true;
      } catch (error) {
         console.log(error);
      }
      return false;
   };

   const handleFileUpload = (e) => {
      const dataFile = e.target.files[0];
      const fileReader = new FileReader();

      const fileIsOk = isFileNameSizeCorrect(dataFile);

      if (fileIsOk) {
         fileReader.readAsText(dataFile, 'UTF-8');
         fileReader.onload = (e) => {
            const result = e.target.result;
            importFunc(result);
         };
      } else {
         console.log('File does not meet the requirements');
      }
   };

   const importFunction = () => {};

   return (
      <div className="dropdown is-right" ref={menuRef}>
         <div className="dropdown-trigger">
            <button
               className="tag is-responsive has-text-white has-background-black is-outlined m-0"
               aria-haspopup="true"
               aria-controls="dropdown-menu6"
               onClick={menuOpenCloseHandler}
            >
               <span className="icon is-small">
                  <IconMenu />
               </span>
            </button>
         </div>
         <div className="dropdown-menu" id="dropdown-menu6" role="menu">
            <div className="dropdown-content">
               <div className="dropdown-item">
                  <p>
                     Use the <code>Export/Import</code> buttons for{' '}
                     <strong>saving words</strong> to your device.
                  </p>
               </div>
               <div className="dropdown-item">
                  <button onClick={() => exportFunc()}>Export data</button>
               </div>
               <div className={`${styles.fileUpload} dropdown-item`}>
                  <button className={`${styles.fileUpload__button}`}>
                     <label htmlFor="userDataFile">Import data</label>
                     <input
                        className={`${styles.fileUpload__input} is-hidden`}
                        type="file"
                        onChange={handleFileUpload}
                        id="userDataFile"
                        name="userDataFile"
                        accept=".json"
                        max={fileMaxSize}
                     />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

