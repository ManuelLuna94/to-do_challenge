import { store } from "../store";
import { logout, emptyTodoList } from "../actions";

export const logoutService = () => {
  window.localStorage.setItem("auth", null);
  store.dispatch(logout());
  store.dispatch(emptyTodoList());
};
