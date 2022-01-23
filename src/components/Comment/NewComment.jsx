import classes from './NewComment.module.scss';

import Card from '../UI/Card';

import { useDispatch, useSelector } from 'react-redux';
import React, { useState, forwardRef } from 'react';
import SubmitButton from '../UI/SubmitButton';
import TextArea from '../UI/TextArea';
import { commentActions } from '../../store';
import Modal from '../UI/Modal';

const NewComment = forwardRef((props, ref) => {
  const [submitEmptyText, setSubmitEmptyText] = useState(false);

  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState('');

  const userImagePng = user.image.png.replace('./', '');

  const newCommentChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const submitCommentHandler = () => {
    if (newComment.trim() === '') {
      setSubmitEmptyText(true);
      return;
    }
    dispatch(
      commentActions.addComment({
        content: newComment,
        user: user,
        createdAt: new Date().getTime(),
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
      {submitEmptyText && (
        <Modal>
          <p>
            Your comment doesn't have any content. Please write something before
            submitting!
          </p>
          <button
            onClick={setSubmitEmptyText.bind(null, false)}
            className={classes['new-comment__empty-alert-btn']}
          >
            Ok
          </button>
        </Modal>
      )}
    </Card>
  );
});

export default NewComment;
