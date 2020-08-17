import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute(props) {
  const { path, exact, children } = props;

  const auth = useSelector((state) => state.auth);
  let condition;
  if (typeof auth === "string" && auth.length > 0) condition = true;
  else condition = false;

  return condition ? (
    <Redirect to="/" />
  ) : (
    <Route to={path} exact={exact}>
      {children}
    </Route>
  );
}

export default PublicRoute;
