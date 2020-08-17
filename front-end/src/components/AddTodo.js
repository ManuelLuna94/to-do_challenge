import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import AddTodoPrompt from "./AddTodoPrompt";
import Classes from "./AddTodo.module.css";

function AddTodo() {
  const [title, setTitle] = useInput();
  const [dialog, toggleDialog] = useToggle();
  const [triedToSubmitEmpty, setTriedToSubmitEmpty] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (title.length === 0) {
      setTriedToSubmitEmpty(true);
      return;
    }
    toggleDialog();
  };

  const cleanUp = () => {
    setTriedToSubmitEmpty(false);
    setTitle("");
    toggleDialog();
  };

  return (
    <div className={Classes.container}>
      <form onSubmit={submitHandler} className={Classes.form}>
        <TextField
          className={Classes.input}
          onChange={setTitle}
          value={title}
          error={triedToSubmitEmpty}
          inputProps={{ "data-testid": "new-todo-input" }}
        />
        <IconButton
          className={Classes.icon}
          onClick={submitHandler}
          data-testid="new-todo-btn"
        >
          <AddIcon />
        </IconButton>
        <AddTodoPrompt open={dialog} closeHandler={cleanUp} title={title} />
      </form>
    </div>
  );
}

export default AddTodo;
