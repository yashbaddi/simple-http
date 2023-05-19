import { once } from "../utils.js";

export function parseHeaders(req, dataBuffer) {
  const headerBuffer = dataBuffer.toString();
  const lines = headerBuffer.split("\r\n");
  [req.method, req.path, req.version] = lines.shift().split(" ");

  for (const line of lines) {
    const [key, value] = line.split(":");
    req.headers[key.toLowerCase()] = value.trim();
  }
}

// export function parseHeadersOnce(req, dataArray) {
//   return once((req, dataArray) => {
//     return parseHeaders(req, dataArray);
//   }, {});
// }
// export function parseBody(req, dataBuffer) {
//   if (req.headers.hasOwnProperty("content-length")) {
//   } else if (req.headers["transfer-encoding"].includes("chunked")) {
//     // const data = dataArray.shift();
//     const dataLength = dataBuffer.subarray(0, dataBuffer.indexOf("\r"));
//     Buffer.concat(req.body, data.subarray(data.indexOf("\r")));
//   }
// }

export function parseTransferEncodeChunked(req, dataBuffer) {
  const dataLength = Number(
    dataBuffer.subarray(0, dataBuffer.indexOf("\r")).toString()
  );
  const chunkedData = dataBuffer.subarray(dataBuffer.indexOf("\r"));
  Buffer.concat([req.body, chunkedData]);
  if (dataLength == 0) req.complete = true;

  if (chunkedData.length > dataLength) {
    //send 400 Bad Request
  }
}
