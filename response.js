export function response(socket) {
  const res = {
    version: 1.1,
    status: 200,
    ok: true,
  };
  const headers = {
    date: new Date().toISOString(),
    "last-modified": new Date().toISOString(),
    "Accept-Ranges": "bytes",
    "Content-Length": 1024,
    Connection: "Keep-Alive",
    "Content-Type": "text/plain",
  };

  let sentString = `HTTP/${res.version} ${res.status} ${res.ok ? "OK" : ""}\r\n
    ${Object.entries(headers)
      .map(([key, value]) => `${key}:${value}`)
      .join("\r\n")}\r\n\r\n`;

  function write(content) {
    sentString += content;
  }
  function end() {
    socket.write(sentString);
    socket.end();
  }

  return { write: write, end: end };
}
