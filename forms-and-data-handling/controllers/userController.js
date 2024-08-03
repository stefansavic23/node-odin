const asyncHandler = require("express-async-handler");
const userStorage = require("../storages/userStorage");


// This just shows the new stuff we're adding to the existing contents
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";


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

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  }),
];
