import React from "react";
import { Provider } from "react-redux";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  cleanup,
} from "@testing-library/react";
import axiosMock from "axios";

import { store } from "../store";
import App from "../App";

describe("LogIn view component", () => {
  afterEach(cleanup);

  it("sends us to the home page when logged in", async () => {
    // mock axios
    const mockUser = "hola1234";
    axiosMock.post.mockResolvedValueOnce({
      data: {
        username: mockUser,
      },
      headers: {
        auth: "fake jtw",
      },
    });

    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: mockUser },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: mockUser },
    });
    fireEvent.click(getByTestId("sub-btn"));

    const greeting = await waitForElement(() => getByTestId("title"));

    expect(greeting.innerHTML).toMatch(`Hello, ${mockUser}`);
  });
});
