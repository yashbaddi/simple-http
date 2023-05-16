import { parseHeadersOnce } from "./req-utils.js";

export default class Request {
  constructor(input) {
    Object.assign(this, parseHeadersOnce(input));
  }
}
