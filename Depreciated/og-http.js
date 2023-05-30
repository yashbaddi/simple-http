import http from "http";

const server = http.createServer((req, res) => {
  res.write("hey");
  res.write("hello");
  res.end();
  console.log(res);
});

server.listen(4000);
