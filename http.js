import net from "net";
import Request from "./Request/req.js";
import { parseTransferEncodeChunked } from "./Request/req-utils.js";
import { parseHeaders } from "./Request/req-utils.js";
import Response from "./Response/res.js";

export default class Http {
  constructor() {
    console.log(this.server);
  }

  createServer(callback) {
    this.server = net.createServer();
    this.server.on("connection", (socket) => {
      let data = Buffer.from("");
      let isHeadersParsed = false;
      const httpRequest = new Request();
      let httpResponse;

      socket.on("data", (chunks) => {
        console.log(chunks.length);

        data = Buffer.concat([data, chunks]);
        const index = data.indexOf("\r\n\r\n");

        if (!isHeadersParsed && index >= 0) {
          //parse Headers
          const headerBuffer = data.subarray(0, index);
          data = data.subarray(index);
          httpRequest.parseHeader(headerBuffer);
          isHeadersParsed = true;
          httpResponse = new Response(socket);
          callback(httpRequest, httpResponse);
        }

        //Content Length
        if (httpRequest.headers.hasOwnProperty("content-length")) {
          httpRequest.body = data;
          if (httpRequest.headers["content-length"] == data.length) {
            httpRequest.complete = true;
          }

          if (httpRequest.headers["content-length"] < data.length) {
            //send 400 bad request
          }
        }

        //Transfer Encoding Chunked
        if (
          index >= 0 &&
          httpRequest.headers["transfer-encoding"]?.includes("chunked")
        ) {
          const dataBuffer = data.subarray(0, index);
          data = data.subarray(index);
          // parseTransferEncodeChunked(httpRequest, dataBuffer);
          httpRequest.parseTransferEncodedChunks(dataBuffer);
        }
      });
      socket.on("end", () => {
        //   if (httpRequest.headers["transfer-encoding"]?.includes("chunked")) {
        //     parseTransferEncodeChunked(httpRequest, dataBuffer);
        //   }
        console.log("connection ended");
      });
      socket.on("error", (error) => {
        console.log(error);
      });
    });
    return this.server;
  }
  listen(port = 80, callback = () => {}) {
    this.server.listen(port);
    callback();
  }
}
