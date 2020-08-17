import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute(props) {
  const { path, exact, children } = props;

  const auth = useSelector((state) => state.auth);
  let condition;
  if (typeof auth === "string" && auth.length > 0) condition = true;
  else condition = false;

  return condition ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
