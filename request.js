export function request(input) {
  console.log("data inside req:", input);
  const req = {};

  const [headerString, body] = input.split("\r\n\r\n");
  req.body = body;

  const lines = headerString.split("\r\n");
  const [method, path, version] = lines.shift().split(" ");
  req.method = method;
  req.path = path;
  req.version = version;

  const headers = {};
  for (const line of lines) {
    const [key, value] = line.split(": ");
    headers[key] = value;
  }
  req.headers = headers;

  return req;
}
