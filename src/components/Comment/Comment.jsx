import classes from './Comment.module.scss';
import CommentContent from './CommentContent';
import CommentReplies from './CommentReplies';

function Comment(props) {
  return (
    <div className={classes['comment']}>
      <CommentContent
        content={props.content}
        createdAt={props.createdAt}
        score={props.score}
        user={props.user}
        parentCommentId={props.id}
        id={props.id}
      />
      {props.replies?.length > 0 && (
        <CommentReplies parentCommentId={props.id} replies={props.replies} />
      )}
    </div>
  );
}

export default Comment;
