const express = require("express");

const app = express();

/**
 * GET /odin/messages?sort=date&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: "date", direction: "ascending" }
 *
 * GET /odin/messages?sort=date&sort=likes&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: ["date", "likes"], direction: "ascending" }
 */

app.get("/:username/message", (req, res) => {
  console.log("Params:", req.params);
  console.log("Query:", req.query);
});

app.listen(8000);
