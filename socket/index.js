const { Server } = require('socket.io');
const messageController = require('../server/controllers/messageController')
const axios = require('axios');


const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

console.log("Server started");
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id
      });
    }
    console.log("Online users:", onlineUsers); // Log the online users to verify the addition

    io.emit("getOnlineUsers", onlineUsers);

    socket.on("disconnect", () => {
      // Remove user from onlineUsers array
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
      io.emit("userDisconnected", userId); // Send the userId of the disconnected user
      console.log("User disconnected", userId);
      console.log("Updated online users:", onlineUsers);
    });

    socket.on('sendMessage', (message) => {
      const user = onlineUsers.find(user => user.userId === message.recipientId);
      if (user) {
        io.to(user.socketId).emit('getMessage', message);
      }
    });
    
  });
});

io.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});

