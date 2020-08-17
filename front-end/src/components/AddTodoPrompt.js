import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/index";
import { saveTodoService } from "../services/todos";

import "./AddTodoPrompt.css";

function AddTodoPrompt(props) {
  const dispatch = useDispatch();

  const { closeHandler, open, title } = props;

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-08-15")
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await saveTodoService({ title, dueDate: selectedDate });
      dispatch(addTodo(response.data.task));
      closeHandler();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      onClose={closeHandler}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="Date picker"
          label="Select a due date"
          value={selectedDate}
          onChange={setSelectedDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <Button
          variant="contained"
          onClick={submitHandler}
          data-testid="new-todo-date-btn"
        >
          Ok
        </Button>
      </MuiPickersUtilsProvider>
    </Dialog>
  );
}

export default AddTodoPrompt;
