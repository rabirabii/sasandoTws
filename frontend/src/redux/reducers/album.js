import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  albums: [], // Add this line
  artistAlbums: [],
};

export const albumReducer = createReducer(initialState, {
  CreateAlbumRequest: (state) => {
    state.isLoading = true;
  },
  CreateAlbumSuccess: (state, action) => {
    state.isLoading = false;
    state.album = action.payload;
    state.success = true;
  },
  CreateAlbumError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  CreateSongAlbumRequest: (state) => {
    state.isLoading = true;
  },
  CreateSongAlbumSuccess: (state, action) => {
    state.isLoading = false;
    state.album = action.payload;
    state.success = true;
  },
  CreateSongAlbumError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
});
