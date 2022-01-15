import classes from './CommentSection.module.scss';

import { useSelector } from 'react-redux';
import Comment from './Comment/Comment';
import NewComment from './Comment/NewComment';

function CommentSection() {
  const comments = useSelector((state) => state.comments);
  return (
    <section className={classes['comment-section']}>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      <NewComment action='Send' />
    </section>
  );
}

export default CommentSection;
