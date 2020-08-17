import React from "react";
import { Provider } from "react-redux";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForDomChange,
  cleanup,
} from "@testing-library/react";
import axiosMock from "axios";

import { login, setUsername } from "../actions/index";
import { createStore } from "redux";
import App from "../App";
import reducer from "../reducers/index";

describe("Home view component", () => {
  let store;

  afterEach(cleanup);

  beforeEach(() => {
    // Inject credentials
    store = createStore(reducer);
    store.dispatch(login("fake jwt"));
    store.dispatch(setUsername("hola1234"));

    // mock tasks fetching
    axiosMock.get.mockResolvedValueOnce({
      data: {
        tasks: [
          {
            title: "Test",
            dueDate: "2020-01-01",
            done: false,
            _id: "an absolute unique id 1:)",
          },
          {
            title: "Another Test",
            dueDate: "2020-01-01",
            done: false,
            _id: "an absolute unique id 2:)",
          },
        ],
      },
    });
  });

  it("renders the tasks", async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const list = await waitForElement(() =>
      getAllByTestId("todo-item").map((todo) => todo.textContent)
    );

    for (const todo of list) {
      expect(todo).toMatch("Test");
    }
  });

  it("lets us create a task", async () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const newTodoInput = getByTestId("new-todo-input");
    const newTodoBtn = getByTestId("new-todo-btn");

    fireEvent.change(newTodoInput, { target: { value: "My new todo" } });
    fireEvent.click(newTodoBtn);

    const newTodoDateBtn = getByTestId("new-todo-date-btn");

    axiosMock.post.mockResolvedValueOnce({
      data: {
        task: {
          title: "My new todo",
          dueDate: "2020-01-01",
          done: false,
          _id: "an absolute unique id 3:)",
        },
      },
    });

    fireEvent.click(newTodoDateBtn);

    const newTodo = await waitForElement(() => getByText("My new todo"));

    expect(newTodo.textContent).toMatch("My new todo");
  });

  it("lets us mark a task as completed", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // This todo has the _id 'an absolute unique id 1:)'
    const todoToMark = await waitForElement(() => getByText("Test"));

    axiosMock.post.mockResolvedValueOnce({});

    fireEvent.click(todoToMark);

    await waitForDomChange();

    expect(
      store
        .getState()
        .todos.find((todo) => todo._id === "an absolute unique id 1:)").done
    ).toEqual(true);
  });

  it("lets us delete a task", async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    axiosMock.delete.mockResolvedValueOnce({});

    const todoId = "an absolute unique id 1:)"; // the id of the delete id (arbitrary)

    const todoToDelete = await waitForElement(() => getByText("Test"));
    const deleteButton = getByTestId(`delete-todo-btn-${todoId}`);

    fireEvent.click(deleteButton);

    await waitForDomChange();

    expect(
      store.getState().todos.filter((todo) => todo._id === todoId)
    ).toEqual([]);
  });
});
