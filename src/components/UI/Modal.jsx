import React from 'react';
import reactDom from 'react-dom';

import classes from './Modal.module.scss';

function Modal(props) {
  return reactDom.createPortal(
    <div className={classes['modal']}>
      <div className={classes['modal__backdrop']}></div>
      <div className={classes['modal__window']}>{props.children}</div>
    </div>,
    document.getElementById('overlays')
  );
}

export default Modal;
