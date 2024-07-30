const express = require("express");

const app = express();

const myMiddleware = (req, res, next) => {
  console.log("Middleware function called.");

  //Call the next middleware/route handler
  next();
};

app.use(myMiddleware);

app.listen(8000);
