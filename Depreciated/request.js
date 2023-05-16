const req = {};
const headers = {};

export function request(input) {
  console.log("data inside req:", input);

  //Slice the header
  console.log("Input Split", typeof input);

  const headerString = input.slice(0, input.indexOf("\r\n\r\n")).toString();
  if (headers["transfer-coding"] === "chunked") {
    req.body = Buffer.concat([
      req.body || Buffer.from(""),
      input.slice(input.indexOf(",")),
    ]);
    return req;
  }
  req.body = input.slice(input.indexOf("\r\n\r\n"));

  const lines = headerString.split("\r\n");
  const [method, path, version] = lines.shift().split(" ");
  req.method = method;
  req.path = path;
  req.version = version;

  for (const line of lines) {
    const [key, value] = line.split(":");
    headers[key] = value.trim();
  }
  req.headers = headers;

  return req;
}
