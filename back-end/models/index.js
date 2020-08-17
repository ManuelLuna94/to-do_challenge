const mongoose = require("mongoose");

const User = require("./User");
const Task = require("./Task");

const connectToDB = () => {
  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = { User, Task, connect: connectToDB };
