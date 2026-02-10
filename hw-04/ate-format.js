const moment = require("moment");

const now = moment();

console.log("Format DD-MM-YYYY:", now.format("DD-MM-YYYY"));
console.log("Format MMM Do YY:", now.format("MMM Do YY"));
console.log("Day of week:", now.format("dddd"));
