import axios from "axios";
import { server } from "../../server";

// Create a playlist
export const createPlaylist = async (payload, dispatch) => {
  try {
    dispatch({
      type: "CreatePlaylistRequest",
    });
    const { data } = await axios.post(
      `${server}/playlist/create-playlist`,
      payload,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "CreatePlaylistSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "CreatePlaylistError",
      payload: error.response.data.message,
    });
  }
};

// Add Song to the playlist
export const addSongToPlaylist = async (payload, dispatch) => {
  try {
    dispatch({
      type: "AddSongRequest",
    });
    const response = await axios.put(`${server}/playlist/add-song`, payload, {
      withCredentials: true,
    });
    if (response && response.data) {
      dispatch({
        type: "AddSongSuccess",
        payload: response.data, // Assuming the entire response is the updated playlist
      });
    } else {
      // Handle error when data or response is undefined
      dispatch({
        type: "AddSongError",
        payload: "Unexpected response format",
      });
    }
  } catch (error) {
    dispatch({
      type: "AddSongError",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

// Remove Song from the playlist
export const removeSongFromPlaylist = async (payload, dispatch) => {
  try {
    dispatch({
      type: "RemoveSongRequest",
    });
    const { data } = await axios.put(
      `${server}/playlist/remove-song`,
      payload,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "RemoveSongSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "RemoveSongError",
      payload: error.response.data.message,
    });
  }
};

// Get Favorite Playlist
export const getPlayLists = async (payload, dispatch) => {
  try {
    dispatch({
      type: "getPlayListsRequest",
    });
    const { data } = await axios.get(`${server}/playlist/favourite`, payload, {
      withCredentials: true,
    });
    dispatch({
      type: "getPlayListsSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getPlayListsError",
      payload: error.message.data.message,
    });
  }
};

// Delete Playlist
export const deletePlaylist = (id) => async (payload, dispatch) => {
  try {
    dispatch({
      type: "DeletePlaylistRequest",
    });
    const { data } = await axios.delete(
      `${server}/playlist/delete-playlist/${id}`,
      payload,
      { withCredentials: true }
    );
    dispatch({
      type: "DeletePlaylistSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "DeletePlaylistError",
      payload: error.response.data.message,
    });
  }
};
