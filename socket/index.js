const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

console.log("hey");

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log('a user connected', socket.id);

  let onlineUsers = [];

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id
      });
    }
    console.log(onlineUsers,'onlineusers'); // Log the online users to verify the addition

    io.emit("getOnlineUsers", onlineUsers)
  });})

  

io.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});
