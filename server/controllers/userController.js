const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const taskSchema = require('../models/Task');
const calendarSchema = require('../models/calendarModel')
const { createCalendar } = require('../controllers/calendarController');
const { getArrays } = require('../controllers/calendarController');

const registerUser = async (req, res) => {
  const { username, email, password, githubUrl } = req.body;
   
  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("mafamesh")

      return res.status(400).json({ message: 'User already exists' });
    }
    else {
      console.log("fama")

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ username, email, password: hashedPassword, githubUrl });
      await user.save();
      console.log("user saved ")

      const userId = user.uuid;
      const collectionName = `tasks_${userId}`;
      mongoose.model(collectionName, taskSchema);

      const calendarColl = `calendar_${userId}` ; 
      mongoose.model(calendarColl, calendarSchema);

      await createCalendar(userId)

      return res.status(201).json({ message: 'User registered successfully' });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }
    else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const id = user.uuid;
        const username = user.username;
        const isAdmin = email === 'tassnymelaroussy@gmail.com';
        return res.json({success: true, message: 'Login successful',admin: isAdmin, userId: { id },name: { username }});
      } else {
        return res.status(404).json({ message: 'Invalid credentials' });
      }
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const listUsers = async (req, res) => {
  try {
    console.log("in getUser function ")
    const users = await User.find(
      { email: { $ne: 'tassnymelaroussy@gmail.com' } }
      ).select('email uuid username -_id');
        
      res.json(users);
    console.log(users)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


const getUserById = async (req, res) => {
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
  }}



  const getArray = async (req, res) => {
    try {
      console.log("in getUser function ")
      const users = await User.find(
        { email: { $ne: 'tassnymelaroussy@gmail.com' } }
        ).select('email uuid username -_id');
          
        getArrays(users , res)
      console.log(users)
    } catch (err) {
      console.error(err);
    }
  };

module.exports = {
    registerUser,
    loginUser,
    listUsers,
    getUserById,
    getArray
    
  };