import { createReducer } from "@reduxjs/toolkit";

const initalState = {
  isLoading: true,
};

export const genreReducer = createReducer(initalState, {
  // Get all Genres
  getAllGenresRequest: (state) => {
    state.isLoading = true;
  },
  getAllGenresSuccess: (state, action) => {
    state.isLoading = false;
    state.genres = action.payload;
  },
  getAllGenresFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
