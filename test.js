import http from "./index.js";
console.log(http);

const server = http.createServer((req, res) => {
  console.log("req data", req);
  res.write("hey there this is a params");
  res.end();
});

server.listen(6500);
