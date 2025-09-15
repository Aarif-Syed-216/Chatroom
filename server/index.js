const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://aarif-chatroom-frontend.onrender.com',
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    socket.username = username;
    socket.broadcast.emit("receive_message", {
      id: Date.now(),
      text: `${username} has entered the chat`,
      sender: "System",
      color: "#888888",
    });
  });

  socket.on("send_message", (message) => {
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("receive_message", {
        id: Date.now(),
        text: `${socket.username} has left the chat`,
        sender: "System",
        color: "#888888",
      });
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
