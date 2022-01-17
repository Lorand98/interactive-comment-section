import classes from './CommentSection.module.scss';

import { useSelector } from 'react-redux';
import Comment from './Comment/Comment';
import NewComment from './Comment/NewComment';
import { useEffect } from 'react';
import { INITIAL_COMMENTS_DATA } from '../constants';

function CommentSection() {
  useEffect(() => {
    const commentsData = localStorage.getItem('comments');
    const currentUser = localStorage.getItem('currentUser');
    if (!commentsData) {
      localStorage.setItem(
        'comments',
        JSON.stringify(INITIAL_COMMENTS_DATA.comments)
      );
    }
    if (!currentUser) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify(INITIAL_COMMENTS_DATA.currentUser)
      );
    }
  }, []);

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
