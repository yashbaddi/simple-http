import Http from "./http.js";
console.log(Http);
const http = new Http();
const server = http.createServer((req, res) => {
  console.log("req data", req);
  // res.write("hey there this is");
  if (req.path === "/" && req.method === "GET") {
    // console.log(req);
    res.write("hey this is users"); //chunk 1
    res.write("hello"); //chunk 2
    res.write("hello "); //chunk 3

    console.log("Response Value", res);
  }

  res.end();
});

server.listen(8080);
