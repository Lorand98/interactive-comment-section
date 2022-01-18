import { configureStore, createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [] },
  reducers: {
    setComments(state, action) {
      state.comments = [...action.payload.comments];
    },

    addComment(state) {},

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
