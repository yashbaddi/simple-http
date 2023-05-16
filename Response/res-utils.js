export function formatChunkedTE(content) {
  return content.length + "\r" + content + "\r\n";
}
