import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";

import SignIn from "./views/SignIn";
import LogIn from "./views/LogIn";
import Home from "./views/Home";

import PrivateRoute from "./shared/PrivateRoute";
import PublicRoute from "./shared/PublicRoute";

function App() {
  return (
    <StylesProvider injectFirst>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PublicRoute path="/login" exact>
            <LogIn />
          </PublicRoute>
          <PublicRoute path="/register" exact>
            <SignIn />
          </PublicRoute>
        </Switch>
      </Router>
    </StylesProvider>
  );
}

export default App;
