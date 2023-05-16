function bodyParser(body, contentType) {
  const obj = {
    "application/json": () => {
      return JSON.parse(body.toString("utf-8"));
    },
    "text/plain": () => {
      return body.toString("utf-8");
    },
  };
  return obj[contentType]();
}
