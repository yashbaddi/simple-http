import EventEmitter from "events";

export function response(socket) {
  const res = {
    version: 1.1,
    status: 200,
    ok: true,
    "transfer-encoding": "chunked",
  };

  socket.write(`HTTP/${res.version} ${res.status} ${res.ok ? "OK" : ""}\r\n`);
  const headers = {
    "Content-Type": "plain/text",
    Date: new Date(),
  };

  const sendChunk = new EventEmitter();
  sendChunk.once("sendHeaders", () => {
    Object.entries(headers).forEach(([key, value]) => {
      socket.write(`${key}:${value}\r\n`);
    });
  });

  let responseBody = "";

  function setHeader(key, value) {
    headers[key] = value;
  }

  function writeHead(status, addHeaders = {}) {
    res.status = status;
    Object.assign(headers, addHeaders);
    sendChunk.emit("sendHeaders");
  }

  function write(content) {
    sendChunk.emit("sendHeaders");

    if (res["content-length"] !== undefined) {
      responseBody += content;
    } else if (res["transfer-encoding"] === "chunked") {
      socket.write(formatChunkedTE(content));
    }
  }

  function end(content) {
    if (res["content-length"] !== undefined) {
      if (content) responseBody += content;
      socket.write(content.slice(res["content-length"]));
    } else if (res["transfer-encoding"] === "chunked") {
      if (content) {
        socket.write(formatChunkedTE(content));
      }
    }
    socket.end();
  }

  return {
    status: res.status,
    write: write,
    setHeader: setHeader,
    writeHead: writeHead,
    end: end,
  };
}

function formatChunkedTE(content) {
  return content.length.toString() + "\r" + content + "\r\n";
}

// Date: new Date(),
// Connection: "keep-alive",
// "Keep-Alive": "timeout=5",
// "Transfer-Encoding": "chunked",
