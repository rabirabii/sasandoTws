import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  songs: [], // Add this line
  artistSongs: [],
};

export const songReducer = createReducer(initialState, {
  CreateSongRequest: (state) => {
    state.isLoading = true;
  },
  CreateSongSuccess: (state, action) => {
    state.isLoading = false;
    state.song = action.payload;
    state.success = true;
  },
  CreateSongError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get All Songs
  getAllSongsRequest: (state) => {
    state.isLoading = true;
  },
  getAllSongsSuccess: (state, action) => {
    state.isLoading = false;
    state.songs = action.payload;
  },
  getAllSongsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },

  // Get All Songs of a Artist
  getAllSongsArtistRequest: (state) => {
    state.isLoading = true;
  },
  getAllSongsArtistSuccess: (state, action) => {
    console.log("New State:", state); // Log the state before update
    state.isLoading = false;
    state.songs = action.payload;
    console.log("Updated State:", state); // Log the state after update
  },
  getAllSongsArtistFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete Song from Artist
  deleteSongRequest: (state) => {
    state.isLoading = true;
  },
  deleteSongSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteSongFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  getAllSongsArtistFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
