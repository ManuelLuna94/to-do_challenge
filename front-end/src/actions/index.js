export const login = (jwt) => {
  return {
    type: "LOGIN",
    payload: jwt,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    payload: username,
  };
};

export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const addTodos = (todos) => {
  return {
    type: "ADD_TODOS",
    payload: todos,
  };
};

export const deleteTodo = (todoId) => {
  return {
    type: "DELETE_TODO",
    payload: todoId,
  };
};

export const emptyTodoList = () => {
  return {
    type: "EMPTY_TODOS",
  };
};

export const toggleTodo = (todoId) => {
  return {
    type: "TOGGLE_TODO",
    payload: todoId,
  };
};
