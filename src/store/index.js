import { configureStore, createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], numberOfComments: 0 },
  reducers: {
    setComments(state, action) {
      state.comments = [...action.payload.comments];

      state.numberOfComments = action.payload.comments.reduce(
        (acc, comment) => {
          if (comment.replies?.length > 0) {
            const numberOfReplies = comment.replies.reduce((acc) => ++acc, 0);

            return acc + numberOfReplies + 1;
          }

          return ++acc;
        },
        0
      );
    },

    addComment(state, action) {
      const { replyingTo } = action.payload;

      if (replyingTo && replyingTo !== '') {
        const parentComment = state.comments.find(
          (comment) => comment.id === action.payload.parentCommentId
        );

        parentComment.replies.push({
          id: ++state.numberOfComments,
          content: action.payload.content,
          createdAt: 'now',
          score: 0,
          replyingTo,
          user: action.payload.user,
        });
      } else {
        state.comments.push({
          id: ++state.numberOfComments,
          content: action.payload.content,
          createdAt: 'now',
          score: 0,
          user: action.payload.user,
          replies: [],
        });
      }
    },

    changeCommentScore(state, action) {
      let targetComment;

      for (const comment of state.comments) {
        if (comment.id === action.payload.id) {
          targetComment = comment;
          break;
        }

        targetComment = comment.replies.find(
          (reply) => reply.id === action.payload.id
        );
        if (targetComment) break;
      }

      action.payload.increase ? ++targetComment.score : --targetComment.score;
    },

    removeComment(state) {},

    editComment(state) {},
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
  },
  reducers: {
    setCurrentUser(state, action) {
      state.image = action.payload.image;
      state.username = action.payload.username;
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
