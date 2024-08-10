

const taskController = require('./controllers/taskController');
const userController = require('./controllers/userController');
const calendarController = require ('./controllers/calendarController')
const chatController = require ('./controllers/chatController')
const messageController = require('./controllers/messageController')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// Routes
app.get('/display/:id', taskController.listTasks);
app.post('/add/:id', taskController.addTask);
app.delete('/delete/:updatedValues', taskController.deleteTask);
app.put('/check/:newValue', taskController.updateTaskState);

app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/admin/list', userController.listUsers);
app.get('/users/:userId', userController.getUserById);
app.get('/getInfoAboutUser/:id' , userController.getInfoAboutUser)

app.post("/pending/:day/:id" , calendarController.pendingCalendar)
app.get("/getPending/:id" , calendarController.getPending)
app.post("/seeResponse/:response/:day/:Id" , calendarController.Response)


app.get('/getUser' , userController.listUsers)
app.get('/getIdEmNa' , userController.listUsers)
app.post('/getName' , userController.getName)
// app.get("/verify/:day/:id" , calendarController.verify)

app.get('/getArray' , userController.getArray )

app.post('/createChat' , chatController.createChat)
app.get('/chats/:userId' , chatController.findUserChats)
app.get('/find/:firstId/:secondId' , chatController.findChat)

app.post('/createMessage' , messageController.createMessage)
app.get('/getMessages/:chatId' , messageController.getMessages)
app.get('/usersAndChats' , userController.usersAndChats)

app.post('/createChatAndMessage' , chatController.createChatAndMessage)
// Start server
app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});