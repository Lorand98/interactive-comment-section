import classes from './CommentSection.module.scss';

import { useSelector } from 'react-redux';
import Comment from './Comment/Comment';
import NewComment from './Comment/NewComment';
import { useEffect, Fragment } from 'react';
import { INITIAL_COMMENTS_DATA } from '../constants';
import { commentActions, currentUserActions } from '../store';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

function CommentSection() {
  const comments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let commentsData = JSON.parse(localStorage.getItem('comments'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!commentsData || commentsData.length === 0) {
      localStorage.setItem(
        'comments',
        JSON.stringify(INITIAL_COMMENTS_DATA.comments)
      );

      commentsData = JSON.parse(localStorage.getItem('comments'));
    }
    if (!currentUser || currentUser.image.png === '') {
      localStorage.setItem(
        'currentUser',
        JSON.stringify(INITIAL_COMMENTS_DATA.currentUser)
      );

      currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    dispatch(
      commentActions.setComments({
        comments: commentsData,
      })
    );
    dispatch(
      currentUserActions.setCurrentUser({
        image: currentUser.image,
        username: currentUser.username,
        upvotes: currentUser.upvotes,
        downvotes: currentUser.downvotes,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [comments, currentUser]);

  return (
    <section className={classes['comment-section']}>
      {comments.length === 0 || currentUser.image.png === '' ? (
        <span className={classes['comment-section__loading']}>
          <ClipLoader size={100} />
        </span>
      ) : (
        <Fragment>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
          <NewComment action='Send' />
        </Fragment>
      )}
    </section>
  );
}

export default CommentSection;
