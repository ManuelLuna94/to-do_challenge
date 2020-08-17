import React from "react";
import List from "@material-ui/core/List";
import TodoItem from "./TodoItem";

import Classes from "./TodoList.module.css";

function TodoList(props) {
  const { todos, children } = props;
  return (
    <List className={Classes.container} {...props}>
      {children}
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo._id} />
      ))}
    </List>
  );
}

export default TodoList;
