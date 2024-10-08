const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const taskSchema = require('../models/Task');
const calendarSchema = require('../models/calendarModel')
const { createCalendar } = require('../controllers/calendarController');
const { getArrays } = require('../controllers/calendarController');
const Chat = require("../models/chatModel")
const {getChatsss} = require('./chatController')
const { createChat } = require('../controllers/chatController');

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

      const adminId = await User.findOne({ email: 'tassnymelaroussy@gmail.com' }).select('_id').exec();
      

      await createCalendar(userId)
      await createChat(user._id.toString() ,adminId._id.toString() )
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
        const id2 = user._id
        const id = user.uuid;
        const username = user.username;
        const isAdmin = email === 'tassnymelaroussy@gmail.com';
        return res.json({success: true, message: 'Login successful',admin: isAdmin, userId: { id }, defaultId :{id2} , name: { username }});
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
      ).select('email uuid username _id');
        
      res.json(users);
    console.log(users)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


const usersAndChats = async (req, res) => {
  try {
    // Fetch users excluding the specified email and select specific fields
    const users = await User.find({ email: { $ne: 'tassnymelaroussy@gmail.com' } })
      .select('email uuid username _id');

      const combinedData = [];

    // Loop through users and fetch their chats concurrently using Promise.all
    const chatPromises = users.map(async (user) => {
      const userId = user._id.toString();
      const chats = await Chat.find({ members: { $in: [userId] } });
      return chats || []; // Return empty array if no chats found
    });

    const resolvedChats = await Promise.all(chatPromises);

    // Combine users and flattened chats into a single array
    combinedData.push(...users);
    combinedData.push(...resolvedChats.flat());

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching users and their chats:', error);
    res.status(500).json({ error: 'Failed to fetch users and their chats' });
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

  const getName = async (req, res) => {
    const { userChats } = req.body;
  
    try {
      console.log("I'm in the getName function");
      console.log(userChats);
  
      // Use map to create an array of promises
      const promises = userChats.map(async (item) => {
        const userId = item.members[0] !== "6696ba45d44d36924a5ff12e" ? item.members[0] : item.members[1];
        const user = await User.findById(userId).select('username _id ');
         console.log(user,'userrrrr')

        return {idChat:item._id,user};
      });

      // Wait for all promises to resolve
      const newArray = await Promise.all(promises);
      console.log(newArray,'userrrrr')

      res.json(newArray);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Server error');
    }
  };
  
  
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


  const getInfoAboutUser = async (req, res) => {
    console.log("im useEffect2")
    const { id } = req.params;
  console.log(id)
    try {
      console.log("in getUser function");
      const user = await User.findOne({ uuid: id }).select('email username _id githubUrl createdAt');
      console.log(user)

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log(user);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  

module.exports = {
    registerUser,
    loginUser,
    listUsers,
    getUserById,
    getArray,
    usersAndChats,
    getName ,
    getInfoAboutUser
    
  };