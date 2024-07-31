const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//GET request for getting all the users
router.get("/", userController.getUsers);

//POST request for creating a user
router.post("/", userController.createUser);

//GET request for getting the user by id
router.get("/:id", userController.getUserById);

module.exports = router;
