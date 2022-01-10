import classes from './Comment.module.scss';

function Comment() {
  return (
    <div className={classes['comment']}>
      <div className={classes['comment__content']}></div>
      <div className={classes['comment__replies']}></div>
    </div>
  );
}

export default Comment;
