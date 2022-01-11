import classes from './Comment.module.scss';
import IconPlusMinus from '../Icons/IconPlusMinus';

function CommentContent(props) {
  const userImagePng = props.user.image.png.replace('./', '');

  return (
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

        <span className={classes['comment__content__details__created-at']}>
          {props.createdAt}
        </span>
      </div>
      <p className={classes['comment__content__text']}>
        {props.replyingTo && (
          <span className={classes['comment__content__text__replying-to']}>
            {props.replyingTo}
          </span>
        )}{' '}
        {props.content}
      </p>
    </div>
  );
}

export default CommentContent;
