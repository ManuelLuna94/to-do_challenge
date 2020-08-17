exports.getUserInfo = async (req, res) => {
  try {
    const username = req.user;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "Invalid user" });

    res.json({ userId: user._id, username: user.username });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Not found" });
  }
};
