import net from "net";

const sampleRequst =
  "GET / HTTP/1.1\r\nContent-Type: text/plain\r\nContent-Length: 3\r\nTransfer-Encoding: chunked\r\n\r\n3\rhey\r\n\r\n0\r\n\r\n";

const client = net.createConnection({ port: 8080, host: "localhost" }, () => {
  client.write(sampleRequst);
});
client.on("data", (data) => {
  console.log(data.toString());
});
