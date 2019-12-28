import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  SEARCH_ITEM,
  ITEM_UPDATE,
  SORT_PRICE_ASC,
  SORT_PRICE_DESC
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errAction";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const sortByPriceASC = () => {
  return {
    type: SORT_PRICE_ASC
  };
};

export const sortByPriceDESC = () => {
  return {
    type: SORT_PRICE_DESC
  };
};

export const updateItem = item => (dispatch, getState) => {
  axios
    .post("/api/items/update", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ITEM_UPDATE,
        payload: item
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

export const searchItem = text => dispatch => {
  dispatch({
    type: SEARCH_ITEM,
    payload: text
  });
};
