const express = require("express");
const router = express.Router({ mergeParams: true });

const Task = require("../models/Task");
const User = require("../models/User");

const {
  getAllTodos,
  saveTodo,
  deleteTodo,
} = require("../controllers/tasksController");

router.get("/", getAllTodos);

router.post("/", saveTodo);

router.delete("/", deleteTodo);

module.exports = router;
