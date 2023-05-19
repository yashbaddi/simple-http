export default class Request {
  constructor() {
    this.complete = false;
    this.body = Buffer.from("");
    this.headers = {};
  }
}
