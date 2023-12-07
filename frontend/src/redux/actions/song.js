import axios from "axios";
import { server } from "../../server";

// Create song
export const createSong = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateSongRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/song/create-song`,
      newForm,
      config
    );
    dispatch({
      type: "CreateSongSuccess",
      payload: data.song,
    });
  } catch (error) {
    dispatch({
      type: "CreateSongError",
      payload: error.response.data.message,
    });
  }
};

// Get All Songs
export const getAllSongs = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSongsRequest",
    });

    const { data } = await axios.get(`${server}/song/get-all-songs`);
    dispatch({
      type: "getAllSongsSuccess",
      payload: data.songs,
    });
  } catch (error) {
    dispatch({
      type: "getAllSongsFailed",
      payload: error.response.data.message,
    });
  }
};

// Get All Song of an Artist
export const getAllSongsArtist = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSongsArtistRequest",
    });

    const { data } = await axios.get(
      `http://localhost:5001/api/sasando/song/get-all-songs/${id}`
    );

    console.log("API Response:", data); // Log fetched songs

    // Dispatch success action with the fetched artist songs directly
    dispatch({
      type: "getAllSongsArtistSuccess",
      payload: data.songs, // Adjust the property based on your API response
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    dispatch({
      type: "getAllSongsArtistFailed",
      payload: error.response.data.message,
    });
  }
};

// Delete song of a Artist
export const deleteSong = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteSongRequest",
    });

    const { data } = await axios.delete(`${server}/song/delete-song/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteSongSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteSongFailed",
      payload: error.response.data.message,
    });
  }
};
