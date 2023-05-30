export function formatChunkedTE(content) {
  console.log(content.length.toString(16) + "\r\n" + content + "\r\n");
  return content.length.toString(16) + "\r\n" + content + "\r\n";
}
