import classes from './NewComment.module.scss';

import Card from '../UI/Card';

import { useDispatch, useSelector } from 'react-redux';
import React, { useState, forwardRef } from 'react';
import SubmitButton from '../UI/SubmitButton';
import TextArea from '../UI/TextArea';
import { commentActions } from '../../store';

const NewComment = forwardRef((props, ref) => {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState('');

  const userImagePng = user.image.png.replace('./', '');

  const newCommentChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const submitCommentHandler = () => {
    dispatch(
      commentActions.addComment({
        content: newComment,
        user: user,
        replyingTo: props.replyingTo,
        parentCommentId: props.parentCommentId,
      })
    );
    setNewComment('');
    props.onReply && props.onReply();
  };

  return (
    <Card>
      <div className={classes['new-comment']}>
        <img
          className={classes['new-comment__user-photo']}
          src={require(`/public/assets/${userImagePng}`)}
          alt='User Profile'
        />

        <TextArea
          className={classes['new-comment__text']}
          placeholder='Add a comment...'
          value={newComment}
          ref={ref}
          onChange={newCommentChangeHandler}
          autoFocus={props.autoFocus}
        ></TextArea>
        <SubmitButton
          className={classes['new-comment__submit']}
          onClick={submitCommentHandler}
        >
          {props.action}
        </SubmitButton>
      </div>
    </Card>
  );
});

export default NewComment;
