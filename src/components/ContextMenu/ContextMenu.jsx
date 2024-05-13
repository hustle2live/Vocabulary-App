import React, { useRef } from 'react';

import { mdiMenu, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

import '../../styles/styles.module.scss';

export const ContextMenu = (props) => {
   const menuRef = useRef(null);

   const menuOpenCloseHandler = () => {
      menuRef.current.classList.toggle('is-active');
   };

   const IconMenu = () => <Icon path={mdiMenu} title="Add new word" />;

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
                  <button>Export data.</button>
               </div>
               <div className="dropdown-item">
                  <button>Import data.</button>
               </div>
            </div>
         </div>
      </div>
   );
};
