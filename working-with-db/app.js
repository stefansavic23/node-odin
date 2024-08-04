const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send(console.log("usernames will be logged here - wip"));
});

app.get("/new", (req, res, next) => {
  res.send(
    "<html><title>Working with Database</title><body><form method='POST' action='/new'><label for='input'>Name:<input type='text'><button type='submit'>Submit</button></form></body></html>"
  );
});

app.post("/new", (req, res, next) => {
  res.send("username to be saved: ", req.body.username);
});

app.listen(3000);
