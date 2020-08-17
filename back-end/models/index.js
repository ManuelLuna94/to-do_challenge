const mongoose = require("mongoose");

const User = require("./User");
const Task = require("./Task");

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://new_user31:new_user31@cluster0.u3yaj.mongodb.net/to-do_app?retryWrites=true&w=majority"

const connectToDB = () => {
  return mongoose.connect(, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = { User, Task, connect: connectToDB };
