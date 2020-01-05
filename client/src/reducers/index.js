import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errReducer from "./errReducer";
import imgReducer from "./imgReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  error: errReducer,
  auth: authReducer,
  img: imgReducer
});
