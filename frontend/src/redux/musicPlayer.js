import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlist: [], // Array of songs
  currentSongIndex: null,
  isPlaying: false,
  repeatMode: "none", // 'none', 'all', 'one'
  progress: 0, // in seconds or percentage
  volume: 50, // 0-100
  currentSong: null,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      const { songIndex } = action.payload;
      if (songIndex >= 0 && songIndex < state.playlist.length) {
        state.currentSongIndex = songIndex;
        state.currentSong = state.playlist[songIndex];
        state.isPlaying = true; // Assuming selecting a song triggers immediate playback
        state.progress = 0; // Reset progress when starting a new song
      }
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    setRepeatMode: (state, action) => {
      state.repeatMode = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    nextSong: (state) => {
      if (state.currentSongIndex !== null) {
        if (state.repeatMode === "one") {
          // Repeat one song
          return;
        } else if (
          state.repeatMode === "all" ||
          state.currentSongIndex + 1 < state.playlist.length
        ) {
          state.currentSongIndex += 1;
        } else {
          // End of playlist
          return;
        }
      }
      state.progress = 0;
    },
    previousSong: (state) => {
      if (state.currentSongIndex !== null) {
        if (state.progress > 3 || state.currentSongIndex === 0) {
          // Restart current song if progress > 3 seconds or it's the first song
          state.progress = 0;
        } else {
          state.currentSongIndex -= 1;
          state.progress = 0;
        }
      }
    },
  },
});

export const {
  play,
  pause,
  setRepeatMode,
  setProgress,
  setVolume,
  nextSong,
  previousSong,
  setCurrentSong,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
