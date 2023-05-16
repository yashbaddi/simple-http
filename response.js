import EventEmitter from "events";

export function response(socket) {
  const res = {
    version: 1.1,
    status: 200,
    ok: true,
  };

  socket.write(`HTTP/${res.version} ${res.status} ${res.ok ? "OK" : ""}\r\n`);

  const headers = {
    "Content-Type": "plain/text",
    Date: new Date(),
    "transfer-coding": "chunked",
  };

  const sendChunk = new EventEmitter();
  sendChunk.once("sendHeaders", () => {
    Object.entries(headers).forEach(([key, value]) => {
      console.log(`${key}:${value}\r\n`);
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

    if (headers["content-length"] !== undefined) {
      responseBody += content;
    } else if (headers["transfer-encoding"] === "chunked") {
      console.log(formatChunkedTE(content));
      socket.write(formatChunkedTE(content));
    }
  }

  function end(content) {
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

  return {
    status: res.status,
    write: write,
    setHeader: setHeader,
    writeHead: writeHead,
    end: end,
  };
}

function formatChunkedTE(content) {
  return content.length + "\r" + content + "\r\n";
}
