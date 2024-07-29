const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "";

  switch (req.url) {
    case "/":
      filePath = "/index.html";
      break;
    case "/about":
      filePath = "/about.html";
      break;
    case "/contact-me":
      filePath = "/contact-me.html";
      break;
    default:
      filePath = "/404.html";
      break;
  }

  const fullFilePath = path.join(__dirname, filePath);

  fs.readFile(fullFilePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-type ": "text/plain" });
      res.end("Server Error!");
    } else {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(3000);
