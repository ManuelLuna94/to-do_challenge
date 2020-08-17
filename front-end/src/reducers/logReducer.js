const authLocastorage = window.localStorage.getItem("auth");

const LogInReducer = (state = authLocastorage, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("auth", action.payload);
      return action.payload;
    case "LOGOUT":
      window.localStorage.setItem("auth", "");
      return "";
    default:
      return state;
  }
};

export default LogInReducer;
