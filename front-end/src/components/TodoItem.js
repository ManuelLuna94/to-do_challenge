import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

import Classes from "./TodoItem.module.css";
import { deleteTodoService, updateTodoService } from "../services/todos";
import { deleteTodo, toggleTodo } from "../actions/index";

function TodoItem(props) {
  const { title, dueDate: date, _id, done } = props;
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    try {
      await deleteTodoService(_id);
      dispatch(deleteTodo(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTodoStatus = async () => {
    await updateTodoService(_id, done);
    dispatch(toggleTodo(_id));
  };

  return (
    <ListItem
      className={Classes.container}
      onClick={toggleTodoStatus}
      data-testid="todo-item"
    >
      <div className={Classes.text}>
        <Typography
          variant="h3"
          component="h3"
          className={`${Classes.title} ${done && Classes.lineThrough}`}
        >
          {title}
        </Typography>
        <Typography variant="body1" component="h4" className={Classes.date}>
          {date.slice(0, 10) /* Only show the year/month/day */}
        </Typography>
      </div>
      <IconButton
        className={Classes.icon}
        onClick={deleteHandler}
        data-testid={`delete-todo-btn-${_id}`}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default TodoItem;
