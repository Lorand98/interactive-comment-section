import classes from './Comment.module.scss';

import Card from '../UI/Card';
import IconPlusMinus from '../Icons/IconPlusMinus';
import IconReply from '../Icons/IconReply';
import IconEdit from '../Icons/IconEdit';
import IconDelete from '../Icons/IconDelete';

import { Fragment, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewComment from './NewComment';
import TextArea from '../UI/TextArea';
import SubmitButton from '../UI/SubmitButton';
import { commentActions, currentUserActions } from '../../store';
import Modal from '../UI/Modal';
import {
  calculateApproximateElapsedTimeString,
  calculateElapsedTimeInSeconds,
} from '../../utilts/utils';

function CommentContent(props) {
  const dispatch = useDispatch();
  const [replyingInProgress, setReplyingInProgress] = useState(false);
  const [editingInProgress, setEditingInProgress] = useState(false);
  const [deletingInProgress, setDeletingInProgress] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(props.content);
  const replyTextRef = useRef();

  const userImagePng = props.user.image.png.replace('./', '');
  const currentUser = useSelector((state) => state.currentUser);
  const userIsCurrentUser = currentUser.username === props.user.username;

  const upvoteNotAllowed = currentUser.upvotes.some(
    (upvote) => upvote === props.id
  );
  const downVoteNotAllowed = currentUser.downvotes.some(
    (downvote) => downvote === props.id
  );

  const secondsElapsedSinceCommCreation = calculateElapsedTimeInSeconds(
    props.createdAt,
    new Date().getTime()
  );

  const approximateElapsedTime = calculateApproximateElapsedTimeString(
    secondsElapsedSinceCommCreation
  );

  const replyCommentHandler = () => {
    setReplyingInProgress((prevState) => !prevState);
    replyingInProgress && replyTextRef.current.focus();
  };

  const editCommentInProgressHandler = () => {
    setEditingInProgress((prevState) => !prevState);
  };

  const editCommentHandler = (e) => {
    setEditedCommentText(e.target.value);
  };

  const commentUpdateHandler = () => {
    dispatch(
      commentActions.updateComment({
        id: props.id,
        content: editedCommentText,
      })
    );
    editCommentInProgressHandler();
  };

  const changeScoreHandler = (increase) => {
    if (increase && !upvoteNotAllowed) {
      dispatch(currentUserActions.upvoteComment({ id: props.id }));

      dispatch(
        commentActions.changeCommentScore({
          id: props.id,
          increase,
        })
      );

      return;
    }

    if (!increase && !downVoteNotAllowed) {
      dispatch(currentUserActions.downvoteComment({ id: props.id }));

      dispatch(
        commentActions.changeCommentScore({
          id: props.id,
          increase,
        })
      );
    }
  };

  const deleteCommentHandler = () => {
    dispatch(
      commentActions.deleteComment({
        id: props.id,
      })
    );
  };

  return (
    <div className={classes['comment__content-container']}>
      <Card>
        <div className={classes['comment__content']}>
          <div className={classes['comment__content__score']}>
            <button
              className={classes['comment__content__score__btn']}
              onClick={changeScoreHandler.bind(null, true)}
              disabled={upvoteNotAllowed}
            >
              <IconPlusMinus
                className={classes['comment__content__score__btn__icon']}
                plus={true}
              />
            </button>
            <p className={classes['comment__content__score__value']}>
              {props.score}
            </p>
            <button
              className={classes['comment__content__score__btn']}
              onClick={changeScoreHandler.bind(null, false)}
              disabled={downVoteNotAllowed}
            >
              <IconPlusMinus
                className={classes['comment__content__score__btn__icon']}
                plus={false}
              />
            </button>
          </div>
          <div className={classes['comment__content__details']}>
            <img
              className={classes['comment__content__details__user-image']}
              src={require(`/public/assets/${userImagePng}`)}
              alt={`${props.user.username} profile`}
            />
            <p className={classes['comment__content__details__user-name']}>
              {props.user.username}
            </p>

            {userIsCurrentUser && (
              <span className={classes['comment__content__details__you']}>
                you
              </span>
            )}

            <span className={classes['comment__content__details__created-at']}>
              {approximateElapsedTime}
            </span>
          </div>
          <div className={classes['comment__content__actions']}>
            {userIsCurrentUser ? (
              <Fragment>
                <button
                  className={classes['comment__content__delete-btn']}
                  onClick={setDeletingInProgress.bind(null, true)}
                >
                  <IconDelete
                    className={classes['comment__content__delete-btn__icon']}
                  />
                  <span>Delete</span>
                </button>
                <button
                  className={classes['comment__content__edit-btn']}
                  onClick={editCommentInProgressHandler}
                >
                  <IconEdit
                    className={classes['comment__content__edit-btn__icon']}
                  />
                  <span>Edit</span>
                </button>
              </Fragment>
            ) : (
              <button
                className={classes['comment__content__reply-btn']}
                onClick={replyCommentHandler}
              >
                <IconReply
                  className={classes['comment__content__reply-btn__icon']}
                />
                <span>Reply</span>
              </button>
            )}
          </div>
          {editingInProgress ? (
            <Fragment>
              <TextArea
                className={classes['comment__content__text-edit']}
                value={editedCommentText}
                onChange={editCommentHandler}
              ></TextArea>
              <SubmitButton
                className={classes['comment__content__update-btn']}
                onClick={commentUpdateHandler}
                disabled={editedCommentText === ''}
              >
                Update
              </SubmitButton>
            </Fragment>
          ) : (
            <p className={classes['comment__content__text']}>
              {props.replyingTo && (
                <span
                  className={classes['comment__content__text__replying-to']}
                >
                  {`${props.replyingTo} `}
                </span>
              )}
              {props.content}
            </p>
          )}
        </div>
      </Card>
      {replyingInProgress && (
        <NewComment
          action='Reply'
          onReply={replyCommentHandler}
          ref={replyTextRef}
          autoFocus={true}
          replyingTo={props.user.username}
          parentCommentId={props.parentCommentId}
        />
      )}
      {deletingInProgress && (
        <Modal>
          <div className={classes['comment__content__confirm-delete']}>
            <h2 className={classes['comment__content__confirm-delete__header']}>
              Delete comment
            </h2>
            <p className={classes['comment__content__confirm-delete__text']}>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone
            </p>

            <div
              className={
                classes['comment__content__confirm-delete__btn-container']
              }
            >
              <button
                className={classes['comment__content__confirm-delete__btn']}
                onClick={setDeletingInProgress.bind(null, false)}
              >
                No, cancel
              </button>
              <button
                className={classes['comment__content__confirm-delete__btn']}
                onClick={deleteCommentHandler}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CommentContent;
