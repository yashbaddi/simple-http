import { once } from "../utils.js";

function parseHeaders(req, input) {
  const lines = input.split("\r\n");
  [req.method, req.path, req.version] = lines.shift().split(" ");

  const headers = {};
  for (const line of lines) {
    const [key, value] = line.split(":");
    headers[key] = value.trim();
  }
  req.headers = headers;

  return req;
}

export const parseHeadersOnce = once((req) => {}, {});

export function parseBody() {}
