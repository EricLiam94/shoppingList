import { IMG_LOADING, IMG_LOADED, IMG_ERROR } from "../actions/types";

const initialState = {
  error: null,
  img: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IMG_LOADED:
      return {
        img: action.payload,
        error: null,
        loading: false
      };
    case IMG_ERROR: {
      return {
        loading: false,
        error: action.payload,
        img: null
      };
    }
    case IMG_LOADING:
      return {
        loading: true,
        img: null,
        error: null
      };
    default:
      return state;
  }
}
