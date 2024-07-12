const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const taskSchema = require ('./models/Task')
const Task = mongoose.model('Task', taskSchema);


const app = express();
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// Route to handle user registration
app.post('/register', async (req, res) => {
  const { username, email, password, githubUrl } = req.body;

  try {
    console.log("passw is ", password)
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    else {
      const xxx = 10 
      const hashedPassword = await bcrypt.hash(password , xxx)
      user = new User({ username, email, password: hashedPassword , githubUrl});
      await user.save();
      const userId = user.uuid
      const collectionName = `tasks_${userId}`;
      mongoose.model(collectionName, taskSchema);
      console.log("doesnt exist")
      res.status(201).json({ message: 'User registered successfully'});
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


 // Route to login in 
 app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
     console.log("function mshet")
    if (!user) {
      console("user not foound")
      return res.json({ message: 'Invalid credentials' });
    }
    else {
      
        const Id=user.uuid
        const username = user.username
        console.log(Id)
        if (email==='tassnymelaroussy@gmail.com'){
          const adminPassword = await bcrypt.compare(password, user.password);
          if (adminPassword) {
            console.log("d5alna")   
            return res.json({ success: true, message: 'Login successful', admin: true, userId: {Id}, name:{username} });
          } else {
            console.log("password ghlaet")
            return res.json({ message: 'Invalid credentials' });
           }

        }
        else {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          console.log("d5alna")   
          return res.json({ success: true, message: 'Login successful' , admin:false, userId: {Id}, name:{username} });
        } else {
          console.log("password ghalet")
          return res.json({ message: 'Invalid credentials' });
        
          
        }}}
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




// Route to display all users in admin account
app.get('/admin/list', async (req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))
});



// Route to display all tasks
app.get('/display/:id', async (req, res) => {
  const {id} = req.params
  try{
  const collectionName = `tasks_${id}`;
  const TaskModel = mongoose.model(collectionName, taskSchema);

    const tasks = await TaskModel.find();
    console.log('tasks',tasks)
  res.json(tasks);
  }
  catch(err) {
    console.error('errrr', err);
  }
});




//Route to add tasks
app.post('/add/:id', async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  try {
    const collectionName = `tasks_${id}`;
    const TaskModel = mongoose.model(collectionName, taskSchema);

    const existingTask = await TaskModel.findOne({ description });
    if (existingTask) {
      return res.status(400).json({ message: 'Task already exists' });
    }

    const newTask = new TaskModel({ description });
    await newTask.save();

    res.status(201).json({ message: 'Task added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



// Example backend API route for deleting a task by ID
app.delete('/delete/:updatedValues', async (req, res) => {
  const { updatedValues } = req.params;
  const [id, taskId] = updatedValues.split(','); 

  console.log('updatedValues',updatedValues)
  console.log('ID:', id, 'Task ID:', taskId);
  console.log("ena tawa f deleteeeeeeeee")

  try {
    const collectionName = `tasks_${id}`;
    const TaskModel = mongoose.model(collectionName, taskSchema);
    await TaskModel.findByIdAndDelete(taskId);
    console.log("tfass5et")
      res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Server error' });
}
});




// GET endpoint to fetch user by userId
app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//Route te update state check
app.put('/check/:newValue', async (req, res) => {
  const { newValue } = req.params;
  const [id, taskId] = newValue.split(','); 
  const collectionName = `tasks_${id}`;
  const TaskModel = mongoose.model(collectionName, taskSchema);

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, { $set: { completed: true } }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: `Task with ID ${taskId} not found` });
    }
    console.log("hihihihihihih")
    res.status(200).json({ message: 'Task status updated successfully', task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Start server
app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});

