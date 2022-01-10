import classes from './Comment.module.scss';

function CommentContent(props) {
  return <div className={classes['comment__content']}>{props.content}</div>;
}

export default CommentContent;
