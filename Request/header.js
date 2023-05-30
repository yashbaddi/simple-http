export default class Header {
  constructor(dataBuffer) {
    const headerString = dataBuffer.toString();
    const lines = headerString.split("\r\n");
    this.parseRequestLine(lines.shift());
    this.headers = {};

    for (const line of lines) {
      this.parseHeaderLine(line);
    }
  }
  parseRequestLine(requestLineString) {
    [this.method, this.path, this.version] = requestLineString.split(" ");
  }
  parseHeaderLine(line) {
    const [key, value] = line.split(":");
    this.headers[key.toLowerCase()] = value.trim();
  }
}
