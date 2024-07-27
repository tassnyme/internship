import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputEmoji from 'react-input-emoji';
import { format, parseISO, isToday } from 'date-fns';

function ChatBox({ effectiveChatId, id2 }) {
  const [messages, setMessages] = useState([]);
  const [msgSent, setMsgSent] = useState('');
  
  // Format messages with dates
  const formatDate = (messages) => {
    return messages.map((item) => ({
      ...item,
      formattedDate: format(parseISO(item.createdAt), 'MMM dd, yyyy hh:mm a'),
    }));
  };

  // Fetch messages when effectiveChatId changes
  useEffect(() => {
    if (!effectiveChatId) return; // Early return if effectiveChatId is not available

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getMessages/${effectiveChatId}`);
        const formattedMessages = formatDate(response.data);
        setMessages(formattedMessages);
        console.log('Messages data:', response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [effectiveChatId]);



  

  // Handle sending message
  const handleSend = async () => {
    
    try {
      let response;
      if (effectiveChatId) {
        response = await axios.post('http://localhost:3001/createMessage', {
          effectiveChatId,
          senderId: id2,
          text: msgSent,
        });
      } else {
        console.error('No effectiveChatId provided for sending message');
        return;
      }
      setMessages([...messages, response.data]);
      setMsgSent(''); // Clear input after sending
      console.log('Message sent response:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents a newline being entered in the textarea
      handleSend();
    }
  };
  return (
    <div className='flex flex-col gap-4 h-[70vh]'>
      <div className='h-full overflow-y-scroll flex flex-col px-2'>
        {messages.map((message, index) => {
          const messageDate = parseISO(message.createdAt);
          return (
            <div key={index} className={`flex flex-col items-${message.senderId === id2? 'end' : 'start'} p-2 rounded-lg`}>
              <div className={`bg-${message.senderId === id2 ? 'checked' : 'white'} p-2 rounded-lg`}>
                {message.text}
                <p className='text-slate-600 text-sm'>
                  {isToday(messageDate) ? `Today ${format(messageDate, 'hh:mm a')}` : format(messageDate, 'MMM dd hh:mm a')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex absolute z-100 top-[90%] w-[39vw] bg-slate-300'>
        <InputEmoji value={msgSent} onChange={setMsgSent} onKeyDown={handleKeyDown } />
        <button onClick={handleSend} >Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
