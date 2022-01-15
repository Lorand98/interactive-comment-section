import classes from './NewComment.module.scss';

import Card from '../UI/Card';

import { useSelector } from 'react-redux';
import React, { useRef } from 'react';
import SubmitButton from '../UI/SubmitButton';

const NewComment = React.forwardRef((props, ref) => {
  const user = useSelector((state) => state.currentUser);

  const userImagePng = user.image.png.replace('./', '');

  const submitCommentHandler = () => {};

  return (
    <Card>
      <div className={classes['new-comment']}>
        <img
          className={classes['new-comment__user-photo']}
          src={require(`/public/assets/${userImagePng}`)}
          alt='User photo'
        />

        <textarea
          type='text'
          className={classes['new-comment__text']}
          autoFocus={props.autoFocus || false}
          placeholder='Add a comment...'
          ref={ref}
        ></textarea>
        <SubmitButton className={classes['new-comment__submit']}>
          {props.action}
        </SubmitButton>
      </div>
    </Card>
  );
});

export default NewComment;
