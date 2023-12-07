import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  artists: [],
  successMessage: null, // Add successMessage to handle success // <-- Notice the property name 'musisis'
  likeArtistProgress: false,
};

export const musisiReducer = createReducer(initialState, {
  LoadMusisiRequest: (state) => {
    state.isLoading = true;
  },
  LoadMusisiSuccess: (state, action) => {
    state.isMusisi = true;
    state.isLoading = false;
    state.musisi = action.payload; // <-- This should be 'musisis'
  },

  LoadMusisiError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isMusisi = false;
  },
  // Update Musisi Informations
  updateMusisiInfoRequest: (state) => {
    state.isLoading = true;
    state.successMessage = null; // Reset successMessage on request
    state.error = null; // Reset error on request
  },
  updateMusisiInfoSuccess: (state, action) => {
    state.isLoading = false;
    state.successMessage = "Musisi information updated successfully"; // Set successMessage on success
    state.error = null; // Reset error on success
    state.musisi = action.payload; // Assuming payload is the updated musisi data
  },
  updateMusisiInfoFailed: (state, action) => {
    state.isLoading = false;
    state.successMessage = null; // Reset successMessage on failure
    state.error = action.payload;
  },
  // Get All Musisi for User
  // getAllMusisiRequest: (state) => {
  //   state.isLoading = true;
  // },
  // getAllMusisiSuccess: (state, action) => {
  //   state.isLoading = false;
  //   state.error = null;
  //   state.artists = action.payload; // Update to the correct property name
  // },
  // getAllMusisiFailed: (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },
  // clearErrors: (state) => {
  //   state.error = null;
  // },
  // Like Song
  LIKE_ARTIST_REQUEST: (state) => {
    return {
      ...state,
      likeArtistProgress: true,
      error: null, // Clear error on request initiation
    };
  },
  LIKE_ARTIST_SUCCESS: (state, action) => {
    const artistId = action.payload;
    const updatedLikedArtists = state.user.likedArtists.includes(artistId)
      ? state.user.likedArtists.filter((id) => id !== artistId)
      : [...state.user.likedArtists, artistId];

    return {
      ...state,
      user: {
        ...state.user,
        likedArtists: updatedLikedArtists,
      },
      likeArtistProgress: false,
    };
  },
  LIKE_ARTIST_FAILURE: (state, action) => {
    return {
      ...state,
      likeArtistProgress: false,
      error: action.payload,
    };
  },
});
