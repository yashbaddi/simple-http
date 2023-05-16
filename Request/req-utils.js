import { once } from "../utils.js";

function parseHeaders(req, dataArray) {
  const headerBuffer = dataArray.shift().toString();
  const lines = headerBuffer.split("\r\n");
  [req.method, req.path, req.version] = headerBuffer.shift().split(" ");

  const headers = {};
  for (const line of lines) {
    const [key, value] = line.split(":");
    headers[key] = value.trim();
  }
  req.headers = headers;
}

export function parseHeadersOnce(req, dataArray) {
  return once((req, dataArray) => {
    return parseHeaders(req, dataArray);
  }, {});
}
export function parseBody(req, dataArray) {
  if (req.headers.hasOwnProperty("content-length")) {
    req.body = Buffer.alloc(req.headers["content-length"]);
  } else if (req.headers["transfer-encoding"].includes("chunked")) {
    const data = dataArray.shift();
    const dataLength = data.subarray(0, data.indexOf("\r"));
    Buffer.concat(req.body, data.subarray(data.indexOf("\r")));
  }
}
