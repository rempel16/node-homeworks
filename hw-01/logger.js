const fs = require("fs");

function logMessage(message) {
  const logLine = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFile("log.txt", logLine, (err) => {
    if (err) {
      console.error("Error writing log:", err);
    } else {
      console.log("Log recorded:", message);
    }
  });
}

module.exports = logMessage;
