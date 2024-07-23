import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Chat.module.css';
import ChatBox from '../components/chat/ChatBox';

function ChatMessages({ user, value }) {
  console.log(value, "value");
  console.log('im in chatmessages');
  console.log(user);
  const userId = user._id;
  console.log(userId);

  const [userChats, setUserChats] = useState([]);

  // First useEffect to fetch user chats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chats/${userId}`);
        setUserChats(response.data);
        console.log('data is ', response.data); // Log the fetched data       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  console.log('come on', userChats);

  


  return (

    <div className='flex w-[90vw] h-[90%] overflow-hidden'>
        <div className='bg-red-400 w-1/3'>
        <div className='flex gap-[40vw] '>
            <div>chatWith</div> 
        </div>
        <div className='flex gap-[5vw]'>
            <div>
            <div>admin</div> 
            </div>
            <div className={styles.date}> 23/07/2024</div>
        </div>
        
        </div>

        <div className='bg-blue-400 w-2/3'>
            <div>chatBox</div>
            <div className='bg-yellow-400 h-full'> <div> {userChats.length>0 &&  <ChatBox userChats={userChats} />  }   </div></div>
        </div>
    </div>

  );
}

export default ChatMessages;
