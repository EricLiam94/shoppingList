import { IMG_LOADING, IMG_LOADED, IMG_ERROR } from "./types";
import axios from "axios";

export const loadingImg = q => async dispatch => {
  dispatch({
    type: IMG_LOADING
  });
  try {
    const res = await axios.get(`/api/img/${q}`);
    dispatch({
      type: IMG_LOADED,
      payload: res.data.url
    });
  } catch (error) {
    dispatch({
      type: IMG_ERROR,
      payload: error
    });
  }
};
