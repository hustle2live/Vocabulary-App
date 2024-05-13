import React, { useRef, useState } from 'react';

import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';

import '../../styles/styles.module.scss';

export const ContextMenu = (props) => {
   const menuRef = useRef(null);

   const { exportFunc, importFunc } = props;

   const menuOpenCloseHandler = () => {
      menuRef.current.classList.toggle('is-active');
   };

   const IconMenu = () => <Icon path={mdiMenu} title="Add new word" />;

   //    const [data] = useState();

   const exportFunction = () => {
      //   const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      //      JSON.stringify(data),
      //   )}`;
      //   const link = document.createElement('a');
      //   link.href = jsonString;
      //   link.download = 'data.json';
      //   link.click();
   };

   const [files, setFiles] = useState('');

   const handleChange = (e) => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
         console.log('e.target.result', e.target.result);
         setFiles(e.target.result);
      };
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
                  <button onClick={() => exportFunc()}>Export data.</button>
               </div>
               <div className="dropdown-item">
                  <button onClick={(e) => {}}>
                     <input
                        className="tag is-hidden"
                        type="file"
                        onChange={handleChange}
                        onClick={(e) => importFunc()}

                        //  value={'Import data.'}
                     />
                     Import data.
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
