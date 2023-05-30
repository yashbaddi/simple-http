import { formatChunkedTE } from "./res-utils.js";
import { once } from "../utils.js";

export default class Response {
  static responseBody = "";
  constructor(socket) {
    this.socket = socket;

    this.version = 1.1;
    this.status = 200;
    this.ok = true;
    this.headers = {
      Date: new Date(),
      "transfer-encoding": "chunked",
    };
  }

  setHeader(key, value) {
    this.headers[key.toLowerCase()] = value;
  }

  hasHeader(key) {
    return this.headers.hasOwnProperty(key);
  }

  #sendStatusLine() {
    this.socket.write(
      `HTTP/${this.version} ${this.status} ${this.ok ? "OK" : ""}\r\n`
    );
  }

  #sendHeaderOnce = once(() => {
    this.#sendStatusLine();
    Object.entries(this.headers).forEach(([key, value]) => {
      this.socket.write(`${key}:${value}\r\n`);
    });
    this.socket.write("\r\n");
  });

  #sendHeaders() {
    this.#sendHeaderOnce();
  }

  writeHead(status, addHeaders = {}) {
    this.#sendHeaders();
    this.status = status;
    Object.assign(this.headers, addHeaders);
  }
  write(content) {
    this.#sendHeaders();
    console.log(content);
    if (this.hasHeader("content-length")) {
      this.body = Buffer.alloc(Number(this.headers["content-length"]));
    }
    if (this.headers["content-length"] !== undefined) {
      responseBody += content;
    } else if (this.headers["transfer-encoding"] == "chunked") {
      console.log("tra");
      this.socket.write(formatChunkedTE(content));
    }
  }

  end(content) {
    this.#sendHeaders();
    if (this.headers["content-length"] !== undefined) {
      if (content) responseBody += content;
      this.socket.write(content.slice(this.headers["content-length"]));
    }
    if (this.headers["transfer-encoding"] === "chunked") {
      if (content?.length > 0) {
        this.socket.write(formatChunkedTE(content));
      }
      this.socket.write("0\r\n\r\n");
    }
    console.log("About to end this conn");
    this.socket.end();
  }
}
