const fs = require("fs");

fs.writeFile("info.txt", "Node", "utf8", (err) => {
  if (err) {
    console.error("Error:", err);
    return;
  }

  console.log("File info.txt successfully created and filled.");

  fs.readFile("info.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    console.log("Content of the file:", data);
  });
});
