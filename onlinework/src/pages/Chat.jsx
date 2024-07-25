import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import styles from '../styles/Bar.module.css'
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";
import { FiVideo } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";

import ChatBox from '../components/chat/ChatBox';
function Chat() {
console.log('im in chat compo')
const sideBar = [
    { name: 'profile', Icon:FaRegUser },
    { name: 'Tasks', Icon: MdOutlineFormatListBulleted   },
    { name: 'sessions', Icon: FiVideo   },
    { name: "meets" , Icon:FaRegBell},
    { name: 'messages', Icon: FiSettings },
    { name: 'help', Icon: IoMdHelp },
  ];


  const location = useLocation();
  const { state } = location;
  const {name,userId,admin,defaultId}=state
  const {username}=name  
  const {id}=userId 
  const {id2}= defaultId
  console.log(admin)
  console.log(state , "hetha shtate")
  console.log("real id is " , id2)
  console.log("username is " , username)
  const [userChats, setUserChats] = useState([]);

  console.log('come on', userChats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chats/${id2}`);
        setUserChats(response.data);
        console.log('data is ', response.data); // Log the fetched data       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id2]);

  return (
    <div className={styles.backgr}>
      <div className={styles.grid}>
        <div className={styles.sidd}>    <Sidebar arr={sideBar} state={state} /></div>
        <div className={styles.liss}>

            <div className='flex w-[60vw] h-[90%] overflow-hidden'>
            <div className='bg-red-400 w-1/3'>
            <div className='flex gap-[40vw] '>
                <div>chatWith</div> 
            </div>
            <div className='flex gap-[5vw]'>
                <div>
                <div>admin</div> 
                </div>
                <div > 23/07/2024</div>
            </div>
            
            </div>

            <div className='bg-blue-400 w-2/3'>
                <div>chatBox</div>
                <div className='bg-yellow-400 h-full'> <div> {  <ChatBox userChats={userChats} id={id2}/>  }   </div></div>
            </div>
        </div>

        </div>

      </div>
    </div>
  )
}

export default Chat
