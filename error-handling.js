const express = require("express");

const app = express();

app.use((req, res, next) => {
  throw new Error("OH NO");

  //or next(new Error('ON NO'));
});

app.use((err, req, res, next) => {
  console.error(err);
  // You will see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(500).send(err.message);
});

app.listen(3000);
