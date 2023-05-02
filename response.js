export function response(socket) {
  const res = {
    version: 1.1,
    status: 200,
    ok: true,
  };
  const headers = {
    "Content-Type": "plain/text",
    Date: new Date(),
  };
  let responseBody = "";

  function write(content) {
    // sentString = sentString + length.toString() + "\r\n";
    responseBody += content;
  }

  function setHeader(key, value) {
    headers[key] = value;
  }
  function writeHead(status, addHeaders = {}) {
    res.status = status;
    Object.assign(headers, addHeaders);
  }

  function end() {
    setHeader("Content-Length", responseBody.length);

    let headerString = `HTTP/${res.version} ${res.status} ${
      res.ok ? "OK" : ""
    }\r\n${Object.entries(headers)
      .map(([key, value]) => `${key}:${value}`)
      .join("\r\n")}\r\n\r\n`;

    socket.write(headerString + responseBody);
    socket.end();
  }

  return { write: write, setHeader: setHeader, writeHead: writeHead, end: end };
}

// Date: new Date(),
// Connection: "keep-alive",
// "Keep-Alive": "timeout=5",
// "Transfer-Encoding": "chunked",
