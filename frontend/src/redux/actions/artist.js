import axios from "axios";
import { server } from "../../server";

// Load Artist
export const loadMusisi = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadMusisiRequest",
    });
    const { data } = await axios.get(`${server}/artist/getMusisi`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadMusisiSuccess",
      payload: data.musisi,
    });
  } catch (error) {
    dispatch({
      type: "LoadMusisiError",
      payload: error.response.data.message,
    });
  }
};

// Update Artist Information
export const updateMusisiInformation =
  (name, about, asal, password, email) => async (dispatch) => {
    try {
      dispatch({
        type: "updateMusisiInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/artist/update-musisi-info`,
        {
          name,
          about,
          asal,
          password,
          email,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateMusisiInfoSuccess",
        payload: data.musisi,
      });
    } catch (error) {
      dispatch({
        type: "updateMusisiInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

//   Get all Artist for Admin
export const getAdminAllMusisi = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAdminAllMusisiRequest",
    });

    const { data } = await axios.get(`${server}/artist/admin-all-musisis`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAdminAllMusisiSuccess",
      payload: data.artist,
    });
  } catch (error) {
    dispatch({
      type: "getAdminAllMusisiFailed",
      payload: error.response.data.message,
    });
  }
};
// export const getAllMusisi = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllMusisiRequest",
//     });

//     const { data } = await axios.get(`${server}/artist/get-all-musisi`, {
//       withCredentials: true,
//     });

//     dispatch({
//       type: " getAllMusisiSuccess",
//       payload: data.artists, // <-- Ensure this matches the property name
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllMusisiFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

export const likeArtistRequest = () => ({
  type: "LIKE_ARTIST_REQUEST",
});

export const likeArtistSuccess = (id) => ({
  type: "LIKE_ARTIST_SUCCESS",
  payload: id,
});

export const likeArtistFailure = (error) => ({
  type: "LIKE_ARTIST_FAILURE",
  payload: error,
});

export const likeArtist = (id) => async (dispatch, payload) => {
  try {
    dispatch(likeArtistRequest());
    const { data } = await axios.put(`${server}/artist/like/${id}`, payload, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });
    dispatch(likeArtistSuccess(data.artist._id)); //
  } catch (error) {
    dispatch(likeArtistFailure(error.response.data.message));
  }
};
