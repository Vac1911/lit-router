const fs = require("fs");
const path = require("path");
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
const defaultExt = ".html";
const publicDir = "/public";
const indexFile = "/index";

const getRequestFile = (req) => {
  let reqFile = req.url == "/" ? indexFile : req.url;
  if (path.extname(reqFile) == "") reqFile += defaultExt;
  return reqFile;
};

const server = http.createServer((req, res) => {
  const reqPath = path.join(__dirname, publicDir, getRequestFile(req));
  console.log(reqPath);
  fs.readFile(reqPath, function (err, data) {
    if (err) {
      if (err.code == "ENOENT") {
        res.statusCode = 404;
      } else {
        res.statusCode = 500;
      }
      res.end(JSON.stringify(err), "utf-8");
      return;
    } else {
      res.statusCode = 200;
      res.end(data, "utf-8");
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
