import axios from "axios";
import { server } from "../../server";

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, about, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInforRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          phoneNumber,
          password,
          about,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

export const likeSongRequest = () => ({
  type: "LIKE_SONG_REQUEST",
});

export const likeSongSuccess = (songId) => ({
  type: "LIKE_SONG_SUCCESS",
  payload: songId,
});

export const likeSongFailure = (error) => ({
  type: "LIKE_SONG_FAILURE",
  payload: error,
});

export const likeSong = (id) => async (dispatch, payload) => {
  try {
    dispatch(likeSongRequest());
    const { data } = await axios.put(`${server}/song/like/${id}`, payload, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });
    dispatch(likeSongSuccess(data.song._id)); // Assuming data.song._id represents the liked song's ID
  } catch (error) {
    dispatch(likeSongFailure(error.response.data.message));
  }
};
// Get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
