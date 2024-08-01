const asyncHandler = require("express-async-handler");
const userStorage = require("../storages/userStorage");

exports.userListGet = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "User list",
    users: userStorage.getUsers(),
  });
});

exports.usersCreateGet = asyncHandler(async (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
});

exports.usersCreatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  userStorage.addUser({ firstName, lastName });
  res.redirect("/");
});
