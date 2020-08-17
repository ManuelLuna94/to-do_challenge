import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import LogForm from "../components/LogForm";

const url = process.env.REACT_APP_API_URL;

function SignIn() {
  const [registrationError, setRegistrationError] = useState(false);
  const history = useHistory();

  const submitHandler = async (username, password) => {
    try {
      const response = await axios.post(`${url}/users/register`, {
        username,
        password,
      });

      if (response.data == null) throw new Error();

      history.push("/");
    } catch (err) {
      console.log("llegué :)");
      setRegistrationError(true);
    }
  };
  return (
    <LogForm
      title="Register"
      register
      onSubmit={submitHandler}
      error={registrationError}
      errorMessage="Your username and password should be at least 8 characters long and contain only alpha numeric characters."
    />
  );
}

export default SignIn;
