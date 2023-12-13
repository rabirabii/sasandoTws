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
  // Get All Songs of a Artist
  getAllAlbumsArtistRequest: (state) => {
    state.isLoading = true;
  },
  getAllAlbumsArtistSuccess: (state, action) => {
    console.log("New State:", state); // Log the state before update
    state.isLoading = false;
    state.albums = action.payload;
    console.log("Updated State:", state); // Log the state after update
  },
  getAllAlbumsArtistFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
