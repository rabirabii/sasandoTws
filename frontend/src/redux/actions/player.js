import { SET_CURRENT_SONG } from "./actionTypes";

export const togglePlayPause = () => ({
  type: "TOGGLE_PLAY_PAUSE",
});

export const setTrackProgress = (progress) => ({
  type: "SET_TRACK_PROGRESS",
  payload: progress,
});

export const setCurrentSong = (song) => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

export const toggleRepeat = () => ({
  type: "TOGGLE_REPEAT",
});

// New action to sync track progress with localStorage
export const syncTrackProgress = (progress) => ({
  type: "SYNC_TRACK_PROGRESS",
  payload: progress,
});
export const playNextSong = () => ({
  type: "PLAY_NEXT_SONG",
});

export const playPreviousSong = () => ({
  type: "PLAY_PREVIOUS_SONG",
});
