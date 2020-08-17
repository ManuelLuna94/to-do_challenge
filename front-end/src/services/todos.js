import axios from "axios";
import { store } from "../store";

const url = process.env.REACT_APP_API_URL;
const auth = () => store.getState((state) => state.auth).auth;

export const saveTodoService = (todo) => {
  return axios.post(`${url}/tasks`, { ...todo }, { headers: { auth: auth() } });
};

export const deleteTodoService = (todoId) => {
  return axios.delete(`${url}/tasks`, {
    headers: {
      auth: auth(),
    },
    data: {
      taskId: todoId,
    },
  });
};

export const updateTodoService = (id, done) => {
  return axios.post(
    `${url}/tasks`,
    { taskId: id, done: !done },
    { headers: { auth: auth() } }
  );
};
