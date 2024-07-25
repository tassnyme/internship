//createchat 
const Chat = require("../models/chatModel")

const createChat = async (req,res) => {
    const {firstId , secondId } = req.body 
    console.log("im in chat creation  function ")

    try{
       const chat = await Chat.findOne({
        members : {$all : [firstId , secondId]}
       })
       
       if(chat) {       
         console.log("exists")

        return res.status(200).json(chat) 
      }
       else {
        const newChat = new  Chat({members : [firstId , secondId]})
        const response = await newChat.save()
        console.log("chat created ")
        res.status(200).json(response)
       }
        
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const createChatAndMessage = async (req,res) => {
  const {firstId , secondId } = req.body 
  console.log("im in chat creation  function ")

  try{
     const chat = await Chat.findOne({
      members : {$all : [firstId , secondId]}
     })
     
     if(chat) {       
       console.log("exists")

      return res.status(200).json(chat) 
    }
     else {
      const newChat = new  Chat({members : [firstId , secondId]})
      const response = await newChat.save()
      console.log("chat created ")
      
      const message = new messageModel({chatId , senderId , text})
      console.log("created message")
      await message.save()
    res.status(200).json(message);
     }
      
  }catch(error){
      console.log(error)
      res.status(500).json(error)
  }
}


//getUserChat
const findUserChats = async(req, res) => {
  const { userId } = req.params;
  try {
      const chats = await Chat.find({
          members: { $in: [userId] }
      });
      console.log(chats);
      if (chats.length===0) {
          console.log("mish mawjouda");
          res.status(200).json("no chats");
      } else {
          console.log("mawjouda");
          res.status(200).json(chats);
          console.log(chats.length,"lengthhhhh is")
      }
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
}

const getChatsss = async (userId) => {
  try {
  
    console.log('getchassss and userId is ' , userId)
    const userIdString = userId.toString();

    console.log(userIdString , "trah shouf result")
    const chats = await Chat.find({ members: { $in: [userIdString] } });
    return chats;
  } catch (error) {
    console.log(error);
  }
};


//findChat
const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    console.log(`Received firstId: ${firstId}, secondId: ${secondId}`);
    console.log(typeof(firstId));

    console.log(typeof(firstId));

    try {
      const chat = await Chat.findOne({
        members : {$all : [firstId , secondId]}
       })
       if (chat ){
        console.log("Chat found:", chat);
        res.status(200).json(chat);

       }
       else {
        console.log("Chat not found");
        res.status(404).json({ message: "Chat not found" });
       }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };

module.exports={
    createChat,
    findUserChats,
    findChat,
    getChatsss,
    createChatAndMessage
}