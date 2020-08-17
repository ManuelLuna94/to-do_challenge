const User = require("../models/User");
const Task = require("../models/Task");

exports.getAllTodos = async (req, res) => {
  try {
    const user = (await User.findOne({ username: req.user }))._id;
    const tasks = await Task.find({ user });
    res.json({ tasks });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Not found" });
  }
};

exports.saveTodo = async (req, res) => {
  try {
    const user = (await User.findOne({ username: req.user }))._id;

    console.log(req.body);

    if (req.body.taskId) {
      // PATCH TASK
      await Task.findByIdAndUpdate(req.body.taskId, { done: req.body.done });
      res.json({ message: "Done" });
      return;
    }

    const newTask = await Task.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      user,
    });
    res.json({ task: newTask });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Not found" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const user = (await User.findOne({ username: req.user }))._id;
    const deletedTask = await Task.deleteOne({ user, _id: req.body.taskId });
    res.json({ task: deletedTask });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Bad Request" });
  }
};
