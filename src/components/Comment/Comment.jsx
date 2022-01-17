import classes from './Comment.module.scss';
import CommentContent from './CommentContent';
import CommentReplies from './CommentReplies';

function Comment(props) {
  return (
    <div className={classes['comment']}>
      <CommentContent
        key={props.id}
        content={props.content}
        createdAt={props.createdAt}
        score={props.score}
        user={props.user}
      />
      {props.replies?.length > 0 && <CommentReplies replies={props.replies} />}
    </div>
  );
}

export default Comment;
