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
