import { Readable } from "stream";

// Create a readable stream to simulate a large amount of data
const data = new Readable({
  read() {
    this.push("chunk 1");
    this.push("chunk 2");
    this.push("chunk 3");
    this.push(null); // signal end of data
  },
});

// Send the data in chunks via Fetch
fetch("localhost:8080", {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
    "Transfer-Encoding": "chunked",
  },
  body: data,
})
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
