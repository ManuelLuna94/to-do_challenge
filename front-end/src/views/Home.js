import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { addTodos } from "../actions/index";
import TodoList from "../components/TodoList";
import axios from "axios";

import Nav from "../components/Nav";
import AddTodo from "../components/AddTodo";
import Notification from "../components/Notification";
import Classes from "./Home.module.css";

const url = process.env.REACT_APP_API_URL;

function Home() {
  const [notiOpen, setNotiOpen] = useState(
    window.localStorage.getItem("notification") === "false" ? false : true
  );
  const closeNotification = () => {
    window.localStorage.setItem("notification", "false");
    setNotiOpen(false);
  };

  const todos = useSelector((state) => state.todos);
  const username = useSelector((state) => state.username);
  const dispatch = useDispatch();

  const isAllClear =
    todos.length === 0 || todos.every((todo) => todo.done === true);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(`${url}/tasks/`, { headers: { auth } });
        dispatch(addTodos(data.data.tasks));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [auth, dispatch]);

  const homeContent = (
    <div className={Classes.container}>
      <Nav />
      <Typography
        variant="h2"
        component="h2"
        className={Classes.title}
        data-testid="title"
      >
        Hello, {username}
      </Typography>
      {isAllClear ? (
        <Typography variant="h5" component="h5" className={Classes.greeting}>
          Enjoy your day :)
        </Typography>
      ) : (
        <Typography variant="h5" component="h5" className={Classes.greeting}>
          You have things to do!
        </Typography>
      )}
      <TodoList todos={todos} data-testid="tasks">
        <AddTodo />
      </TodoList>
      <Notification
        open={notiOpen}
        title="Pro tip!"
        onClose={closeNotification}
        content="You can click a task to mark it as completed or not completed."
      />
    </div>
  );

  const loader = <CircularProgress disableShrink />;

  return username !== null ? homeContent : loader;
}

export default Home;
