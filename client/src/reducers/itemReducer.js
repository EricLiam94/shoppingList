import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  SEARCH_ITEM
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  search: "",
  display: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        display: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        display: state.display.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        display: [action.payload, ...state.display]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_ITEM: {
      const value = action.payload.toLowerCase();
      const display =
        value.length > 0
          ? state.items.filter(i => i.name.toLowerCase().includes(value))
          : state.items;
      return {
        ...state,
        search: action.payload,
        display
      };
    }
    default:
      return state;
  }
}
