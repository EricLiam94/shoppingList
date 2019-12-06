import axios from "axios";
import { returnErrors } from "./errAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const loadUser = () => async (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  const res = await axios.get("/api/auth/user", tokenConfig(getState));
  dispatch({
    type: USER_LOADED,
    payload: res.data
  });
  // .then(res =>
  //   dispatch({
  //     type: USER_LOADED,
  //     payload: res.data
  //   })
  // )
  // .catch(err => {
  //   dispatch(returnErrors(err.response.data, err.response.status));
  //   dispatch({
  //     type: AUTH_ERROR
  //   });
  // });
};

//Register User

export const register = ({ name, email, password }) => async dispatch => {
  //headers
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
    );
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//Login
export const login = ({ email, password }) => async dispatch => {
  //headers
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
    );
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//setup config.headers and token
export const tokenConfig = getState => {
  //get token from local storage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  if (token) config.headers["x-auth-token"] = token;

  return config;
};
