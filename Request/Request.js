import { parseBody, parseHeadersOnce } from "./req-utils";

class Request {
  constructor(dataArray) {
    this.complete = false;
    parseHeadersOnce(this, dataArray);
    dataArray.forEach((dataChunk) => {
      parseBody(this, dataChunk);
    });
  }
}
