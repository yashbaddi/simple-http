import Header from "./header.js";

export default class Request {
  constructor() {
    this.complete = false;
    this.body = Buffer.from("");
  }
  parseHeader(dataBuffer) {
    Object.assign(this, new Header(dataBuffer));
  }
  parseTransferEncodedChunks(dataBuffer) {
    const dataLength = Number(
      dataBuffer.subarray(0, dataBuffer.indexOf("\r")).toString()
    );
    const chunkedData = dataBuffer.subarray(dataBuffer.indexOf("\r"));
    Buffer.concat([this.body, chunkedData]);
    if (dataLength == 0) this.complete = true;

    if (chunkedData.length > dataLength) {
      //send 400 Bad Request
    }
  }
}
