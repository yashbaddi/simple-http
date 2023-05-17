### [01-05-2023]

- [x] Use Chunks as data instead of writing it directly
- [x] send data on the go with chunk length instead of sending it at the end
- [x] take input as buffer don't encode/decode with utf-8 because utf 8 is a text conversion
- [x] make use of the content-type header to determine what type it needs to be converted to
- [x] use the sockets only in index.js don't send it as params to response instead send request as params to response
- [x] make it such that it can also recieve data(and headers in chunks as well)
- [x] google "rfc http" for finding the offical docs on http implementation

# TO BE ADDED

- Compression Needed To be implemented
-

# NOT BE IMPLEMENTED

- Keep alive
- Chunk Extensions and chunk Trailers
