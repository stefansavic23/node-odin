const express = require("express");

const app = express();

/**
 * In order for our GET /messages request to match the /messages route, we will need to reverse the order our routes are defined.
 * Doing so will prevent it from reaching the * route, as it will match the /messages route first.
 */

app.get("*", (req, res) => {
  res.send(
    "* is a great way to catch all otherwise unmatched parts, e.g. for custom 404 error handling."
  );
});

app.get("/messages", (req, res) => {
  res.send(
    "This route will not be reached because the previous route path mathces first."
  );
});

app.listen(8000);
