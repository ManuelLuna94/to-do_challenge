// Setting up env variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const { connect, User, Task } = require("./models/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const { authenticateToken } = require("./utils/tokens");

const app = express();
const port = 8080;

app.use(morgan("tiny"));
app.use(express.json());

app.use(
  cors({
    exposedHeaders: ["auth"],
  })
);

// Login/Register routes
app.use("/api/users", authRouter);

// Auth middleware
app.use(authenticateToken);

app.use("/api/users/", usersRouter);
app.use("/api/tasks/", tasksRouter);

async function main() {
  try {
    await connect();
    app.listen(port, () => console.log(`App running at localhost:${port}`));
  } catch (err) {
    console.error(err);
  }
}

main();
