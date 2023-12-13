import { SET_CURRENT_SONG } from "../actions/actionTypes";

const initialState = {
  currentSong: null,
  isPlaying: false,
  trackProgress: 0,
  currentSongIndex: 0,
  playlist: [],
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
        isPlaying: action.payload.action === "play" ? true : false,
      };
    case "TOGGLE_PLAY_PAUSE":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case "SET_TRACK_PROGRESS":
      return {
        ...state,
        trackProgress: action.payload,
      };
    case "SYNC_TRACK_PROGRESS": // New case to sync track progress
      return {
        ...state,
        trackProgress: action.payload,
      };
    case "TOGGLE_REPEAT":
      return {
        ...state,
        isRepeated: !state.isRepeated,
      };
    case "PLAY_NEXT_SONG":
      return {
        ...state,
        currentSongIndex:
          state.currentSongIndex === state.playlist.length - 1
            ? 0 // If at the end, loop back to the start
            : state.currentSongIndex + 1,
      };

    case "PLAY_PREVIOUS_SONG":
      return {
        ...state,
        currentSongIndex:
          state.currentSongIndex === 0
            ? state.playlist.length - 1 // If at the start, go to the last song
            : state.currentSongIndex - 1,
      };
    default:
      return state;
  }
};

export default playerReducer;
