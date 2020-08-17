const usernameLocalstorage = window.localStorage.getItem("username");

const usernameReducer = (state = usernameLocalstorage, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      window.localStorage.setItem("username", action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default usernameReducer;
