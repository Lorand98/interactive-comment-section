import { configureStore, createSlice } from '@reduxjs/toolkit';

const findComment = (comments, searchedCommentId) => {
  let targetComment;

  for (const comment of comments) {
    if (comment.id === searchedCommentId) {
      targetComment = comment;
      return targetComment;
    }

    targetComment = comment.replies.find(
      (reply) => reply.id === searchedCommentId
    );
    if (targetComment) return targetComment;
  }
};

const sortFirstLevelComments = (comments) => {
  comments.sort((comment1, comment2) => {
    return comment2.score - comment1.score;
  });
};

const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], nextId: 0 },
  reducers: {
    setComments(state, action) {
      state.comments = [...action.payload.comments];

      if (state.comments.length > 0) {
        const currentlyUsedIdList = state.comments.map((comment) => {
          const commentId = comment.id;

          if (comment.replies?.length > 0) {
            const commentRepliesIdList = comment.replies.map(
              (reply) => reply.id
            );
            return [commentId, commentRepliesIdList];
          }

          return commentId;
        });

        const currentlyUsedIdListFlattened = currentlyUsedIdList.flat(3);

        const maxId = Math.max(...currentlyUsedIdListFlattened);

        state.nextId = maxId + 1;

        sortFirstLevelComments(state.comments);
      }
    },

    addComment(state, action) {
      const { replyingTo } = action.payload;

      if (replyingTo && replyingTo !== '') {
        const parentComment = state.comments.find(
          (comment) => comment.id === action.payload.parentCommentId
        );

        parentComment.replies.push({
          id: state.nextId++,
          content: action.payload.content,
          createdAt: action.payload.createdAt,
          score: 0,
          replyingTo,
          user: action.payload.user,
        });
      } else {
        state.comments.push({
          id: state.nextId++,
          content: action.payload.content,
          createdAt: action.payload.createdAt,
          score: 0,
          user: action.payload.user,
          replies: [],
        });
      }
    },

    changeCommentScore(state, action) {
      const targetComment = findComment(state.comments, action.payload.id);

      action.payload.increase ? ++targetComment.score : --targetComment.score;
    },

    deleteComment(state, action) {
      for (const comment of state.comments) {
        if (comment.id === action.payload.id) {
          state.comments = state.comments.filter(
            (comment) => comment.id !== action.payload.id
          );
          sortFirstLevelComments(state.comments);

          break;
        }

        const filteredReplies = comment.replies.filter(
          (reply) => reply.id !== action.payload.id
        );

        if (filteredReplies.length !== comment.replies.length) {
          comment.replies = filteredReplies;
          break;
        }
      }
    },

    updateComment(state, action) {
      const targetComment = findComment(state.comments, action.payload.id);

      targetComment.content = action.payload.content;
    },
  },
});

const currentUserSlice = createSlice({
  name: 'user',
  initialState: {
    image: {
      png: '',
      webp: '',
    },
    username: '',

    upvotes: [],
    downvotes: [],
  },
  reducers: {
    setCurrentUser(state, action) {
      state.image = action.payload.image;
      state.username = action.payload.username;
      state.upvotes = [...action.payload.upvotes];
      state.downvotes = [...action.payload.downvotes];
    },

    upvoteComment(state, action) {
      const upvotedCommentIndex = state.downvotes.indexOf(action.payload.id);
      if (upvotedCommentIndex > -1) {
        state.downvotes.splice(upvotedCommentIndex, 1);
      } else if (!state.upvotes.some((vote) => vote === action.payload.id)) {
        state.upvotes.push(action.payload.id);
      }
    },

    downvoteComment(state, action) {
      const downvotedCommentIndex = state.upvotes.indexOf(action.payload.id);
      if (downvotedCommentIndex > -1) {
        state.upvotes.splice(downvotedCommentIndex, 1);
      } else if (!state.downvotes.some((vote) => vote === action.payload.id)) {
        state.downvotes.push(action.payload.id);
      }
    },
  },
});

export const commentActions = commentSlice.actions;
export const currentUserActions = currentUserSlice.actions;

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
    currentUser: currentUserSlice.reducer,
  },
});

export default store;
