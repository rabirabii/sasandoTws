import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import audioPlayer from "./musicPlayer";
import { userReducer } from "./reducers/user";
import { artistReducer, musisiReducer } from "./reducers/artist";
import { genreReducer } from "./reducers/genre";
import { songReducer } from "./reducers/song";
import { playlistReducer } from "./reducers/playlist";
import musicPlayer from "./musicPlayer";
import playerReducer from "./reducers/player";
import { albumReducer } from "./reducers/album";

const rootReducer = combineReducers({
  user: userReducer,
  musisi: musisiReducer,
  genre: genreReducer,
  song: songReducer,
  playlist: playlistReducer,
  musicPlayer: musicPlayer,
  audioPlayer: audioPlayer,
  player: playerReducer,
  album: albumReducer,
  // Other reducers...
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["player"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
