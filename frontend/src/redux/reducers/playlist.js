import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  playlists: [],
  data: null,
  success: false,
  error: null,
};
export const playlistReducer = createReducer(initialState, {
  CreatePlaylistRequest: (state) => {
    state.isLoading = true;
  },
  CreatePlaylistSuccess: (state, action) => {
    state.isLoading = false;
    state.playlists = action.payload;
    state.success = true;
  },
  CreatePlaylistError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // Add Song
  AddSongRequest: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  AddSongSuccess: (state, action) => {
    const updatedPlaylists = state.playlists.map((playlist) => {
      if (playlist._id === action.payload._id) {
        // Assuming action.payload contains the updated playlist with the added song
        return {
          ...playlist,
          // Assuming there's a songs array in the playlist where the song is added
          songs: [...playlist.songs, action.payload.addedSongId], // Pushing the new song ID to the playlist's songs array
        };
      }
      return playlist;
    });

    return {
      ...state,
      isLoading: false,
      playlists: updatedPlaylists,
      success: true,
    };
  },
  AddSongError: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    };
  },

  RemoveSongRequest: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  RemoveSongSuccess: (state, action) => {
    const { playlistId, removedSongId } = action.payload; // Assuming payload contains IDs for playlist and removed song

    const updatedPlaylists = state.playlists.map((playlist) => {
      if (playlist._id === playlistId) {
        // Assuming there's a songs array in the playlist
        const updatedSongs = playlist.songs.filter(
          (songId) => songId !== removedSongId
        ); // Remove the specified song ID

        return {
          ...playlist,
          songs: updatedSongs,
        };
      }
      return playlist;
    });

    return {
      ...state,
      isLoading: false,
      playlists: updatedPlaylists,
      success: true,
    };
  },
  RemoveSongError: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    };
  },

  DeletePlaylistRequest: (state) => {
    state.isLoading = true;
  },
  DeletePlaylistSuccess: (state, action) => {
    state.isLoading = false;
    state.data = action.payload;
  },
  DeletePlaylistError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Get Favorite Playlist
  getPlayListsRequest: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  getPlayListsSuccess: (state, action) => {
    return {
      ...state,
      isLoading: false,
      playlists: action.payload, // Assuming payload contains playlists
      success: true,
    };
  },
  getPlayListsError: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    };
  },
});
