const express = require("express");

const app = express();

app.get("/:username/message", (req, res) => {
  console.log(req.params); // {username : e.g. 'Stefan'}
  res.end();
});

app.get("/:username/message/:messageId", (req, res) => {
  console.log(req.params); //{username : e.g. 'Stefan', messageId: '16' }
  res.end();
});

app.listen(8000);
