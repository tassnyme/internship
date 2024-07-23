import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserChat from '../components/chat/UserChat';
import styles from '../styles/Chat.module.css';

function Chat({ user }) {
  console.log(user, "User received in Chat component");

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chats/${user._id}`); // Use actual userId
        console.log("Chats response here", response.data);
        await setChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [user._id]); // Fetch chats whenever user._id changes

  console.log(chats, "Chats are here");

  return (
    <div>
      {chats.length < 1 ? null : (
        <div className={`flex gap-4 bg-red-400 w-[90vw] ${styles.chatContainer}`}>
          <div>
            <h1>List</h1>
            {chats.map((chat, index) => (
              <div key={index}>
                <UserChat chat={chat} />
              </div>
            ))}
          </div>
          <div>ChatBox</div>
        </div>
      )}
    </div>
  );
}

export default Chat;
