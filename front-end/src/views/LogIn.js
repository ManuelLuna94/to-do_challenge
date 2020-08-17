import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import LogForm from "../components/LogForm";
import { login } from "../actions/index";
import { setUsername } from "../actions/index";

const url = process.env.REACT_APP_API_URL;

function LogIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credentialError, setCredentialError] = useState(false);

  const submitHandler = async (username, password) => {
    try {
      const response = await axios.post(`${url}/users/login`, {
        username,
        password,
      });
      console.log(response);
      dispatch(login(response.headers.auth));
      dispatch(setUsername(response.data.username));
      history.push("/");
    } catch (err) {
      setCredentialError(true);
      console.log(err);
    }
  };

  return (
    <LogForm
      title="Welcome back!"
      onSubmit={submitHandler}
      error={credentialError}
      errorMessage="Please check your credentials."
    />
  );
}

export default LogIn;
