const http = require("http");

const server = http.createServer((req, res) => {
  const authHeader = req.headers["authorization"];

  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (!authHeader) {
    res.statusCode = 401;
    res.end("Unauthorized");
    return;
  }

  res.statusCode = 200;
  res.end("Authorization header received");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
