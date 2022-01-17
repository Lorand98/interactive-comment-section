import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classes from './TextArea.module.scss';

function TextArea(props) {
  const [textContent, setTextContent] = useState(
    props.value ? props.value : ''
  );

  const textContentChangeHandler = (e) => {
    setTextContent(e.value);
  };

  return (
    <TextareaAutosize
      className={`${classes['textarea']} ${props.className}`}
      value={textContent}
      onChange={textContentChangeHandler}
      placeholder={props.placeholder}
    ></TextareaAutosize>
  );
}

export default TextArea;
