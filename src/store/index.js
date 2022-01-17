import { configureStore, createSlice } from '@reduxjs/toolkit';
import { INITIAL_COMMENTS_DATA } from '../constants';

const commentSlice = createSlice({
  name: 'comments',
  initialState: INITIAL_COMMENTS_DATA.comments,
  reducers: {
    addComment(state) {},

    removeComment(state) {},

    editComment(state) {},
  },
});

const currentUserSlice = createSlice({
  name: 'user',
  initialState: INITIAL_COMMENTS_DATA.currentUser,
});

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
    currentUser: currentUserSlice.reducer,
  },
});

export default store;
