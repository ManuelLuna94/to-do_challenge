const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");

const { getUserInfo } = require("../controllers/usersController");

router.get("/");

module.exports = router;
