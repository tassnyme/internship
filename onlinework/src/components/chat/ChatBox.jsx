import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputEmoji from 'react-input-emoji';
import { format, parseISO, isToday } from 'date-fns';

function ChatBox({ userChats, id }) {
  const [messages, setMessages] = useState([]);
  const [msgSent, setMsgSent] = useState('');
  const [clicked, setClicked] = useState(false);
  
  console.log("userChats is", userChats);

  const formatDate = (messages) => {
    return messages.map((item) => ({
      ...item,
      formattedDate: format(parseISO(item.createdAt), 'MMM dd, yyyy hh:mm a'),
    }));
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (userChats.length === 1) {
        const chatId = userChats[0]._id;
        console.log(chatId, 'chatId');
        try {
          const response = await axios.get(`http://localhost:3001/getMessages/${chatId}`);
          const formattedMessages = formatDate(response.data);
          setMessages(formattedMessages);
          console.log('Messages data:', response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("No messages found");
      }
    };

    fetchMessages();
  }, [userChats]);

  console.log(id, 'send sender id');
  console.log("Messages are", messages);

  const handleSend = async () => {
    setClicked(true);
    console.log('Message sent:', msgSent);
    try {
      let response;
      if (userChats.length === 1) {
        response = await axios.post('http://localhost:3001/createMessage', {
          chatId: userChats[0]._id,
          senderId: id,
          text: msgSent,
        });
      } else {
        response = await axios.post('http://localhost:3001/createChatAndMessage', {
          firstId: '6696ba45d44d36924a5ff12e',
          secondId: id,
          senderId: id,
          text: msgSent,
        });
      }
      setMessages([...messages, response.data]);
      console.log('Message sent response:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='flex flex-col gap-4 h-[70vh] '>
      <div className='h-full overflow-y-scroll flex flex-col px-2 '>
        {messages.map((message, index) => {
          const messageDate = parseISO(message.createdAt);
          return (
            <div key={index} className={`flex flex-col items-${message.senderId === id ? 'end' : 'start'} p-2
              p-2 rounded-lg  `}>
               <div className={`bg-${message.senderId === id ? 'black' : 'white'} p-2 rounded-lg`}>{message.text}<p className='text-slate-600 text-sm'>
                {isToday(messageDate) ? `Today ${format(messageDate, 'hh:mm a')}` : format(messageDate, 'MMM dd hh:mm a')}
                </p></div> 
                
              
            </div>
          );
        })}
      </div>
      <div className='flex absolute z-100 top-[90%] w-[39vw] bg-slate-300'>
        <InputEmoji value={msgSent} onChange={setMsgSent} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
