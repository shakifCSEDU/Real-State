const errorHanlder = require("../utils/error");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model.js");

const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHanlder(401, "You can only update your own account"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(401, "You can only delete your own account!");

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json("User has been deleted!");
  } catch (error) {}
};

module.exports = { updateUser, deleteUser };
