import { SET_CURRENT_SONG } from "../actions/actionTypes";

const initialState = {
  currentSong: null,
  isPlaying: false,
  trackProgress: 0,
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
    case "TOGGLE_REPEAT": // Reducer for toggling repeat
      return {
        ...state,
        isRepeated: !state.isRepeated,
      };
    default:
      return state;
  }
};

export default playerReducer;
