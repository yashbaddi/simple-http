import net from "net";
import Request from "./Request/Request.js";

class Http {
  constructor() {
    const server = net.createServer();
  }

  createServer(callback) {
    server.on("connection", (socket) => {
      let data = Buffer.from("");
      const dataArray = [];
      socket.on("data", (chunks) => {
        console.log(chunks.length);

        data = Buffer.concat([data, chunks]);
        const index = data.indexOf("\r\n\r\n");
        if (index >= 0) {
          const chunk = data.subarray(0, index);
          dataArray.push(Buffer.from(data));
          data = data.subarray(index);
          httpRequest = new Request(dataArray);
          httpResponse = response(socket);
          callback(httpRequest, httpResponse);
        }
      });
      socket.on("end", () => {
        dataArray.push(Buffer.from(data));
      });
    });
    return server;
  }
  listen(port = 80, callback = () => {}) {
    server.listen(port);
    callback();
  }
}
