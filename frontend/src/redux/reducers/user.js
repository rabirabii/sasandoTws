import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  likeSongProgress: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuth = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuth = false;
  },

  // Update user Informations
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSucess: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Like Song
  LIKE_SONG_REQUEST: (state) => {
    return {
      ...state,
      likeSongProgress: true,
      error: null, // Clear error on request initiation
    };
  },
  LIKE_SONG_SUCCESS: (state, action) => {
    const songId = action.payload;
    const updatedLikedSongs = state.user.likedSongs.includes(songId)
      ? state.user.likedSongs.filter((id) => id !== songId)
      : [...state.user.likedSongs, songId];

    return {
      ...state,
      user: {
        ...state.user,
        likedSongs: updatedLikedSongs,
      },
      likeSongProgress: false,
    };
  },
  LIKE_SONG_FAILURE: (state, action) => {
    return {
      ...state,
      likeSongProgress: false,
      error: action.payload,
    };
  },

  // Get all users for Admin
  getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSucess: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  getAllUsersFailed: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
