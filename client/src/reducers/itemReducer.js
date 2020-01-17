import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  SEARCH_ITEM,
  ITEM_UPDATE,
  SORT_PRICE_ASC,
  SORT_PRICE_DESC
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
    case ITEM_UPDATE:
      var update_item = state.items.filter(
        item => item._id === action.payload._id
      )[0];
      var update_display = state.display.filter(
        item => item._id === action.payload._id
      )[0];
      Object.assign(update_item, action.payload);
      Object.assign(update_display, action.payload);
      return {
        ...state
      };
    case SORT_PRICE_ASC:
      state.display.sort((a, b) => {
        return a.price - b.price;
      });
      return {
        ...state,
        display: state.display
      };
    case SORT_PRICE_DESC:
      state.display.sort((a, b) => {
        return b.price - a.price;
      });
      return {
        ...state,
        display: state.display
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
