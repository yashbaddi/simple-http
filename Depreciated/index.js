import net from "net";
import { response } from "./response.js";
import { request } from "./request.js";

function createServer(callback) {
  let httpResponse, httpRequest;

  const server = net.createServer();
  server.on("connection", (socket) => {
    let data = Buffer.from("");
    socket.on("data", (chunks) => {
      console.log(chunks.length);

      data = Buffer.concat([data, chunks]);

      if (data.indexOf("\r\n\r\n") >= 0) {
        socket.emit("headerRecived", data);
        console.log("In Reciver");
      }
    });

    socket.once("headerRecived", (data) => {
      httpRequest = request(data);
      httpResponse = response(socket);
      callback(httpRequest, httpResponse);
    });
  });
  return server;
}

export default { createServer: createServer };
