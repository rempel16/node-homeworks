const fs = require("fs");

fs.mkdir("myFolder", (err) => {
  if (err) {
    console.error("Error:", err);
    return;
  }

  console.log("Success");

  fs.rmdir("myFolder", (err) => {
    if (err) {
      console.error("Error while deleting:", err);
      return;
    }

    console.log("Successfully deleted");
  });
});
