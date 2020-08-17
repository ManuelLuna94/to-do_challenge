const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "ADD_TODOS":
      return [...state, ...action.payload];
    case "DELETE_TODO":
      return state.filter((todo) => todo._id !== action.payload);
    case "TOGGLE_TODO":
      console.log("am here");
      return state.map((todo) =>
        todo._id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case "EMPTY_TODOS":
      return [];
    default:
      return state;
  }
};

export default todosReducer;
