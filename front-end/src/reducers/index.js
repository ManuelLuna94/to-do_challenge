import { combineReducers } from "redux";
import logReducer from "./logReducer";
import todosReducer from "./todosReducer";
import usernameReducer from "./usernameReducer";

const reducers = combineReducers({
  auth: logReducer,
  todos: todosReducer,
  username: usernameReducer,
});

export default reducers;
