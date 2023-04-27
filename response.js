export function response(socket) {
  const res = {
    version: 1.1,
    status: 200,
    ok: true,
  };
  const headers = {
    "Content-Type": "plain/text",
    "Content-Length": 26,
    Connection: "keep-alive",
    "Keep-Alive": "timeout=5",
    Date: new Date(),
  };
  let length = 0;

  let sentString = `HTTP/${res.version} ${res.status} ${
    res.ok ? "OK" : ""
  }\r\n${Object.entries(headers)
    .map(([key, value]) => `${key}:${value}`)
    .join("\r\n")}\r\n\r\n`;

  function write(content) {
    // sentString = sentString + length.toString() + "\r\n";
    sentString += content;
  }
  function end() {
    console.log(sentString);
    socket.write(sentString);
    socket.end();
  }

  return { write: write, end: end };
}

// Date: new Date(),
// Connection: "keep-alive",
// "Keep-Alive": "timeout=5",
// "Transfer-Encoding": "chunked",
