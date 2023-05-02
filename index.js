import net from "net";
import { response } from "./response.js";
import { request } from "./request.js";
import { create } from "domain";

function createServer(callback) {
  let httpResponse, httpRequest;

  const server = net.createServer((socket) => {
    httpResponse = response(socket);

    socket.on("data", (data) => {
      httpRequest = request(data);
      callback(httpRequest, httpResponse);
    });
    socket.setEncoding("utf-8");
  });
  return server;
}

export default { createServer: createServer };
