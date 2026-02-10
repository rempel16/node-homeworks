const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Static files (public/index.html + assets)
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server and bind Socket.io to it
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('chat_message', (message) => {
    console.log(`Message from ${socket.id}: ${message}`);

    // Send confirmation back to the same client
    socket.emit('message_received', {
      ok: true,
      text: message,
      at: new Date().toISOString(),
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
