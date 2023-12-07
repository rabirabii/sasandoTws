import axios from "axios";
import { server } from "../../server";

export const getAllGenres = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllGenresRequest",
    });

    const { data } = await axios.get(`${server}/genre/get-genres`);
    dispatch({
      type: "getAllGenresSuccess",
      payload: data.genres,
    });
  } catch (error) {
    dispatch({
      type: "getAllGenresFailed",
      payload: error.response.data.message,
    });
  }
};
