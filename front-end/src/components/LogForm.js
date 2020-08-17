import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import Classes from "./LogForm.module.css";
import useInput from "../hooks/useInput";

function LogForm(props) {
  const { title, register, onSubmit, error, errorMessage } = props;

  const [username, setUsername] = useInput();
  const [password, setPassword] = useInput();

  const loginMessage = (
    <span>
      Don't have an account? <Link to="/register">Register instead</Link>
    </span>
  );
  const registerMessage = (
    <span>
      Already have an account? <Link to="/login">Log in instead</Link>
    </span>
  );

  const submitHandler = (event) => {
    event.preventDefault();

    onSubmit(username, password);
  };

  return (
    <div className={Classes.container}>
      <Typography variant="h1" component="h1" className={Classes.title}>
        {title}
      </Typography>
      {error && <Typography color="secondary">{errorMessage}</Typography>}
      <form onSubmit={submitHandler}>
        <div>
          <Typography
            variant="h3"
            component="h3"
            className={`${Classes.input} ${Classes.username}`}
          >
            Username
          </Typography>
          <TextField
            label="Username"
            id="username"
            name="username"
            required
            onChange={setUsername}
          />
        </div>
        <div>
          <Typography
            variant="h3"
            component="h3"
            className={`${Classes.input} ${Classes.password}`}
          >
            Password
          </Typography>
          <TextField
            label="Password"
            id="password"
            name="password"
            required
            onChange={setPassword}
            type="password"
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          endIcon={<VpnKeyIcon />}
          className={Classes.btn}
          type="submit"
          data-testid="sub-btn"
        >
          Submit
        </Button>
      </form>
      <Typography variant="body1" className={Classes.login}>
        {register ? registerMessage : loginMessage}
      </Typography>
    </div>
  );
}

export default LogForm;
