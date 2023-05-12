const req = {};

export function request(input) {
  console.log("data inside req:", input);

  //Slice the header
  console.log("Input Split", typeof input);

  const headerString = input.slice(0, input.indexOf("\r\n\r\n")).toString();
  req.body = input.slice(input.indexOf("\r\n\r\n"));

  const lines = headerString.split("\r\n");
  const [method, path, version] = lines.shift().split(" ");
  req.method = method;
  req.path = path;
  req.version = version;

  const headers = {};
  for (const line of lines) {
    const [key, value] = line.split(":");
    headers[key] = value.trim();
  }
  req.headers = headers;

  return req;
}
