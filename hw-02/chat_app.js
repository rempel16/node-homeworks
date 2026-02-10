const EventEmitter = require("events");
const chatEmitter = new EventEmitter();

chatEmitter.on("message", (user, message) => {
  console.log(`${user}: ${message}`);
});

function sendMessage(user, message, emitter) {
  emitter.emit("message", user, message);
}

sendMessage("Tom", "Hello everyone!", chatEmitter);
sendMessage("Djerry", "Hi Tom!", chatEmitter);
sendMessage("Molly", "HI", chatEmitter);