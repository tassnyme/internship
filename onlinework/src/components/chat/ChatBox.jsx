import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputEmoji from 'react-input-emoji';
import { format, parseISO } from 'date-fns'; // Import functions from date-fns

function ChatBox({ userChats }) {
  const [messages, setMessages] = useState([]);
  const [msgSent, setMsgSent] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (userChats.length > 0) {
        const chatId = userChats[0]._id;
        console.log(chatId, 'chatIddddd');
        try {
          const response = await axios.get(`http://localhost:3001/getMessages/${chatId}`);
          setMessages(response.data);
          console.log('messages data is ', response.data);
          formatDate(response.data); // Call formatDate after setting messages
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMessages();
  }, [userChats]);

  const senderId = userChats[0]?.members[0] !== "6697f8541598a9048c0a53c9" ? userChats[0]?.members[0] : userChats[0]?.members[1];

  console.log(senderId, 'sendddddddddddddddr');

  const handleSend = async () => {
    setClicked(true);
    console.log('Message sent:', msgSent);

    try {
      const response = await axios.post('http://localhost:3001/createMessage', {
        chatId: userChats[0]._id,
        senderId: senderId,
        text: msgSent
      });

      console.log('Message sent response:', response.data);
      // Optionally update local state with the new message
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Function to format and log message dates
  const formatDate = (messages) => {
    messages.forEach((item) => {
      const formattedDate = format(parseISO(item.createdAt), 'MMM dd, yyyy hh:mm a');
      console.log('Formatted Date:', formattedDate);
    });
  };

  return (
    <div className='flex flex-col justify-between h-[70vh]'>
      <div className='bg-red-200 h-[90%] overflow-scroll flex flex-col px-2'>
        {messages.map((message, index) => (
          <div key={index} className={`flex flex-col items-${message.senderId === senderId ? 'end' : 'start'} p-2`}>
            <div className={`bg-${message.senderId === senderId ? 'yellowgreen' : 'slate-400'} p-2 rounded-lg`}>
              {message.text} 
              <p className='text-slate-600'>{format(parseISO(message.createdAt), ' hh:mm a')}</p> {/* Display formatted date */}
            </div>
          </div>
        ))}
      </div>
      <div className='flex absolute z-100 top-[90%] w-[60%]'>
        <InputEmoji value={msgSent} onChange={setMsgSent} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
