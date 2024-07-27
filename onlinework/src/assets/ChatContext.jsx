// context/ChatContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [userChats, setUserChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [id2, setId2] = useState(''); // Replace with appropriate state if needed

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chats/${id2}`);
        setUserChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id2) { // Make sure id2 is defined before fetching
      fetchUserChats();
    }
  }, [id2]);

  return (
    <ChatContext.Provider value={{ userChats, setUserChats, chatId, setChatId, setId2 }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
