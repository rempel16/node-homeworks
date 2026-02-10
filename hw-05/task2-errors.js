const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  try {
    throw new Error("Test server error");
  } catch (err) {
    const message = `[${new Date().toISOString()}] ${err.stack || err.message}\n`;

    fs.appendFile("errors.log", message, "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Failed to write to errors.log:", writeErr);
      }
    });

    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
