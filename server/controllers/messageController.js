const messageModel = require ('../models/messageModel')


//createMessage 
const createMessage = async (req, res) => {
const {chatId , senderId , text} = req.body
console.log("im in createmessage")
try {
    const message = new messageModel({chatId , senderId , text})
    console.log("created message")
    await message.save()
    
    res.status(200).json(message);
    
}
catch(error){
    console.log("errruuuuuuuuuuuuuuue")
    res.status(500).json({error: error.message})

}
}

//getMessage 

const getMessages = async(req,res)=>{
    const {chatId} =  req.params

    try{
        console.log('chatId',chatId)
        const messages = await messageModel.find({chatId})
        res.status(200).json(messages)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports={
    createMessage,
    getMessages
}