import classes from './Comment.module.scss';
import CommentContent from './CommentContent';

function CommentReplies(props) {
  return (
    <div className={classes['comment__replies']}>
      {props.replies.map((reply) => (
        <CommentContent
          key={reply.id}
          replyingTo={reply.user.username}
          parentCommentId={props.parentCommentId}
          {...reply}
        />
      ))}
    </div>
  );
}

export default CommentReplies;
