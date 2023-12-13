import axios from "axios";
import { server } from "../../server";

// Create song
export const createAlbum = (newForm) => async (dispatch, payload) => {
  try {
    dispatch({
      type: "CreateAlbumRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/album/create-album`,
      newForm,
      payload,
      config
    );
    dispatch({
      type: "CreateAlbumSuccess",
      payload: data.album,
    });
  } catch (error) {
    dispatch({
      type: "CreateAlbumError",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllAlbum = async (payload, dispatch) => {
  try {
    dispatch({
      type: "getAllAlbumArtistRequest",
    });

    const { data } = await axios.get(`${server}/album/yourAlbum/`, payload, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllAlbumArtistSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getAllAlbumArtistFailed",
      payload: error.response.data.message,
    });
  }
};

// Create song
export const createSongAlbum = (newForm, id) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateSongAlbumRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/album//create-song/${id}`,
      newForm,
      config
    );
    dispatch({
      type: "CreateSongAlbumSuccess",
      payload: data.song,
    });
  } catch (error) {
    dispatch({
      type: "CreateSongAlbumError",
      payload: error.response.data.message,
    });
  }
};

// Get All Song of an Artist
export const getAllAlbumsArtist = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllAlbumsArtistRequest",
    });

    const { data } = await axios.get(
      `http://localhost:5001/api/sasando/album/get-all-albums/${id}`
    );

    console.log("API Response:", data); // Log fetched Albums

    // Dispatch success action with the fetched artist Albums directly
    dispatch({
      type: "getAllAlbumsArtistSuccess",
      payload: data.albums, // Adjust the property based on your API response
    });
  } catch (error) {
    console.error("Error fetching Albums:", error);
    dispatch({
      type: "getAllAlbumsArtistFailed",
      payload: error.response.data.message,
    });
  }
};
