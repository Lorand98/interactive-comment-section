import classes from './CommentSection.module.scss';

import { useSelector } from 'react-redux';
import Comment from './Comment/Comment';

function CommentSection() {
  const comments = useSelector((state) => state.comments);
  return (
    <section className={classes['comment-section']}>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </section>
  );
}

export default CommentSection;
