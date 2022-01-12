import classes from './Comment.module.scss';

import Card from '../UI/Card';
import IconPlusMinus from '../Icons/IconPlusMinus';
import IconReply from '../Icons/IconReply';
import IconEdit from '../Icons/IconEdit';
import IconDelete from '../Icons/IconDelete';

import { Fragment } from 'react';
import { useSelector } from 'react-redux';

function CommentContent(props) {
  const userImagePng = props.user.image.png.replace('./', '');

  const currentUser = useSelector((state) => state.currentUser);

  const userIsCurrentUser = currentUser.username === props.user.username;

  return (
    <Card className={classes['comment__content-container']}>
      <div className={classes['comment__content']}>
        <div className={classes['comment__content__score']}>
          <button className={classes['comment__content__score__btn']}>
            <IconPlusMinus
              className={classes['comment__content__score__btn__icon']}
              plus={true}
            />
          </button>
          <p className={classes['comment__content__score__value']}>
            {props.score}
          </p>
          <button className={classes['comment__content__score__btn']}>
            <IconPlusMinus
              className={classes['comment__content__score__btn__icon']}
              plus={false}
            />
          </button>
        </div>
        <div className={classes['comment__content__details']}>
          <img
            className={classes['comment__content__details__user-image']}
            src={require(`../../assets/${userImagePng}`)}
            alt={`${props.user.username} profile picture`}
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
            {props.createdAt}
          </span>
        </div>
        <div className={classes['comment__content__actions']}>
          {userIsCurrentUser ? (
            <Fragment>
              <button className={classes['comment__content__edit-btn']}>
                <IconEdit
                  className={classes['comment__content__edit-btn__icon']}
                />
                <span>Edit</span>
              </button>
              <button className={classes['comment__content__delete-btn']}>
                <IconDelete
                  className={classes['comment__content__delete-btn__icon']}
                />
                <span>Delete</span>
              </button>
            </Fragment>
          ) : (
            <button className={classes['comment__content__reply-btn']}>
              <IconReply
                className={classes['comment__content__reply-btn__icon']}
              />
              <span>Reply</span>
            </button>
          )}
        </div>
        <p className={classes['comment__content__text']}>
          {props.replyingTo && (
            <span className={classes['comment__content__text__replying-to']}>
              {`${props.replyingTo} `}
            </span>
          )}
          {props.content}
        </p>
      </div>
    </Card>
  );
}

export default CommentContent;
