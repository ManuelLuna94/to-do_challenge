import React from "react";
import {
  render,
  fireEvent,
  waitForDomChange,
  waitForElement,
} from "@testing-library/react";
import axiosMock from "axios";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "@testing-library/jest-dom/extend-expect";

import reducer from "../reducers/index";
import App from "../App";

describe("SignIn view component", () => {
  it("tells us that our input is invalid", async () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={createStore(reducer)}>
        <App />
      </Provider>
    );

    // Go to register page
    fireEvent.click(getByText(/register/i));

    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);

    // Simulate a non-200 response due to bad input
    axiosMock.post.mockResolvedValueOnce({ data: null });

    // Invalid because both password and username must be at least 8 chars long
    fireEvent.change(usernameInput, { target: { value: "123" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });

    fireEvent.click(getByTestId("sub-btn"));

    // The bad input message is something like '...at least...'
    const badInputMessage = await waitForElement(() => getByText(/at least/i));

    expect(badInputMessage).toBeInTheDocument();
  });

  it("lets us register and redirect us to the login page", async () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={createStore(reducer)}>
        <App />
      </Provider>
    );

    // Go to register page
    fireEvent.click(getByText(/register/i));

    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);

    // Simulate a good response
    axiosMock.post.mockResolvedValueOnce({
      data: { username: "New username" },
    });

    fireEvent.change(usernameInput, { target: { value: "123" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });

    fireEvent.click(getByTestId("sub-btn"));

    await waitForDomChange();

    // Greeting message in log in page
    expect(getByText(/Welcome back!/i)).toBeInTheDocument();
  });
});
