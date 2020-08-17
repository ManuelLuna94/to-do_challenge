import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import Classes from "./Nav.module.css";
import { logoutService } from "../services/logs";

function Nav() {
  const history = useHistory();
  const clickHandler = () => {
    logoutService();
    // Send the user back to login page
    history.push("/login");
  };
  return (
    <div className={Classes.nav}>
      <Button
        color="secondary"
        variant="contained"
        className={Classes.logout}
        onClick={clickHandler}
        data-testid="log out"
      >
        Log out
      </Button>
    </div>
  );
}

export default Nav;
