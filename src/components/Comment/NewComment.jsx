import classes from './NewComment.module.scss';

import Card from '../UI/Card';

import { useSelector } from 'react-redux';
import React from 'react';
import SubmitButton from '../UI/SubmitButton';
import TextArea from '../UI/TextArea';

function NewComment(props) {
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

        <TextArea
          className={classes['new-comment__text']}
          placeholder='Add a comment...'
        ></TextArea>
        <SubmitButton className={classes['new-comment__submit']}>
          {props.action}
        </SubmitButton>
      </div>
    </Card>
  );
}

export default NewComment;
