import { formatChunkedTE } from "./res-utils.js";
import { once } from "../utils.js";

export default class Response {
  constructor(socket) {
    this.socket = socket;

    this.version = 1.1;
    this.status = 200;
    this.ok = true;
    this.headers = {
      Date: new Date(),
      "transfer-coding": "chunked",
    };
    this.headersFlushed = false;
  }
  setHeader(key, value) {
    this.headers[key] = value;
  }

  hasHeader(key) {
    return this.headers.hasOwnProperty(key);
  }

  #sendStatusLine() {
    this.socket.write(
      `HTTP/${this.version} ${this.status} ${this.ok ? "OK" : ""}\r\n`
    );
  }

  #sendHeaders() {
    once(() => {
      this.#sendStatusLine();
      Object.entries(this.headers).forEach(([key, value]) => {
        socket.write(`${key}:${value}\r\n`);
      });
    });
  }
  writeHead(status, addHeaders = {}) {
    this.#sendHeaders();
    this.status = status;
    Object.assign(this.headers, addHeaders);
  }
  write(content) {
    this.#sendHeaders();
    if (this.hasHeader("content-length")) {
      res.body = Buffer.alloc(Number(this.headers["content-length"]));
    }
    if (this.headers["content-length"] !== undefined) {
      responseBody += content;
    } else if (headers["transfer-encoding"] === "chunked") {
      socket.write(formatChunkedTE(content));
    }
  }

  end(content) {
    if (headers["content-length"] !== undefined) {
      if (content) responseBody += content;
      socket.write(content.slice(headers["content-length"]));
    } else {
      if (content) {
        socket.write(formatChunkedTE(content));
      }
    }
    socket.end();
  }
}
