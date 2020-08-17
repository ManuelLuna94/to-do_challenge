const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET || Math.random().toString();

function generateToken(username) {
  return jwt.sign(username, TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
  const token = req.headers["auth"];
  if (token === null)
    return res.status(401).json({ message: "No authenticated" }); // if there isn't any token

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: err });
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  generateToken,
};
