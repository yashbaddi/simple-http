import http from "./index.js";
console.log(http);

const server = http.createServer((req, res) => {
  console.log("req data", req);
  // res.write("hey there this is");
  if (req.path === "/users" && req.method === "GET") {
    res.write("hey this is users");
  }

  res.end();
});

server.listen(6500);
