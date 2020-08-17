const bcrypt = require("bcrypt");
const validate = require("../utils/validation");
const User = require("../models/User");
const { generateToken } = require("../utils/tokens");

exports.registerUser = async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    // 'validate' function automatically sends a 400 Bad Request if something is not right
    if (!validate(userData, res)) return;

    // Check if username already exists
    const usernameExists = await User.findOne({ username: userData.username });
    if (usernameExists)
      return res.status(400).json({ message: "Username already exists" });

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const newUser = await User.create(userData);

    res.json({ username: newUser.username });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.loginUser = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    if (!validate(userData, res))
      return res.status(403).json({ message: "Bad Request" });

    const user = await User.findOne({ username: userData.username });

    if (!user) return res.status(404).json({ message: "User don't exist" });

    const passwordValid = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!passwordValid)
      return res.status(401).json({ message: "Invalid password" });

    // Send jwt
    res.header("auth", generateToken(user.username));

    res.json({ username: user.username });
  } catch (err) {
    console.log(err);
  }
};
