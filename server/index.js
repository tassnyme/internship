const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const Task = require('./models/Task');

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
  const { username, email, password } = req.body;

  try {
    console.log("passw is ", password)
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
      console.log("exists")
    }
    else {
      const xxx = 10 
      const hashedPassword = await bcrypt.hash(password , xxx)
      user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully'});
      console.log("doesnt exist")
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
        if (email==='tassnymelaroussy@gmail.com'){
          const adminPassword = await bcrypt.compare(password, user.password);
          if (adminPassword) {
            console.log("d5alna")   
            return res.json({ success: true, message: 'Login successful', admin: true });
          } else {
            console.log("password ghlaet")
            return res.json({ message: 'Invalid credentials' });
           }

        }
        else {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          console.log("d5alna")   
          return res.json({ success: true, message: 'Login successful' , admin:false });
        } else {
          console.log("password ghlaet")
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
app.get('/tasks/list', async (req, res) => {
  Task.find()
  .then(task => res.json(task))
  .catch(err => res.json(err))
});




//Route to add tasks
app.post('/tasks', async (req, res) => {
  const { description } = req.body;

  try {
    const existingTask = await Task.findOne({ description });
    if (existingTask) {
      console.log('task mawjouda')
      return res.status(400).json({ message: 'Task already exists' });
    }

    const newTask = new Task({ description });
    await newTask.save();
    console.log('task tzeeedit')

    res.status(200).json({ message: 'Task added successfully' }); // Or 201 if appropriate
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});





// Start server
app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});

