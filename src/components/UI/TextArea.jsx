import React, { forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classes from './TextArea.module.scss';

const TextArea = forwardRef((props, ref) => {
  return (
    <TextareaAutosize
      className={`${classes['textarea']} ${props.className}`}
      value={props.value}
      onChange={props.onChange}
      ref={ref}
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
    ></TextareaAutosize>
  );
});

export default TextArea;
