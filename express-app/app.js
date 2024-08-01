const express = require("express");
const userRouter = require("./routes/userRoutes");
const path = require("path");
const { body, validationResult } = require("express-validator");

[
  body("birthdate", "Must be a valid data.")
    .optional({ values: "falsy" })
    .isISO8601(), //Enforce a YYYY-MM-DD
];

const app = express();

//This enables EJS as the view engine, and that our app should look for templates in the /views subdirectory.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parses form payloads and sets it to the 'req.boy'
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next();
});

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];

app.get("/", (req, res) => {
  res.render("index", { links: links });
});

app.use("/users", userRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
