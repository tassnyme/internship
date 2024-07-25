import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Bar.module.css';
import { FaRegUser, FaRegBell } from "react-icons/fa";
import { FiSettings, FiVideo } from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import ChatBox from '../components/chat/ChatBox';
import { format } from 'date-fns';
import {io} from 'socket.io-client'
function Chat() {
  console.log('im in chat compo');

  


  const sideBar = [
    { name: 'profile', Icon: FaRegUser },
    { name: 'Tasks', Icon: MdOutlineFormatListBulleted },
    { name: 'sessions', Icon: FiVideo },
    { name: "meets", Icon: FaRegBell },
    { name: 'messages', Icon: FiSettings },
    { name: 'help', Icon: IoMdHelp },
  ];

  const { state } = useLocation();
  const { name, userId, admin, defaultId } = state;
  const { username } = name;
  const { id } = userId;
  const { id2 } = defaultId;

  console.log(admin);
  console.log(state, "hetha shtate");
  console.log("real id is ", id2);
  console.log("username is ", username);

  const [userChats, setUserChats] = useState([]);
  console.log('come on', userChats);

  const [socket, setSocket]= useState(null)
  useEffect(()=>{
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket)

    return ()=>{
      newSocket.disconnect()
    }
  },[id2])
const [onlineUsers,setOnlineUsers]=useState([])
useEffect(()=>{
  if (socket === null ) return ;
  socket.emit("addNewUser", id2)
  socket.on("getOnlineUsers", (res)=>{
    setOnlineUsers(res)
  })
},[socket])
console.log(onlineUsers,"onlineeeeeeeeee")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chats/${id2}`);
        setUserChats(response.data);
        console.log('data is ', response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id2]);

const formattedToday = format(new Date(), 'MMM dd, yyyy'); 

  return (
    <div className={styles.backgr}>
      <div className={styles.grid}>
        <div className={styles.sidd}>
          <Sidebar arr={sideBar} state={state} />
        </div>
        <div className={styles.liss}>
          
          <div className="flex w-[60vw] h-[90vh] overflow-hidden bg-black mt-10">
            <div className=" bg-red-400 p-4 w-1/3">
              <div className="flex gap-[40vw]">
                <div >chatWith:</div>
              </div>
              <div className="flex gap-[5vw]">
                <div>
                  <div className='px-3 py-2'>{admin ? <p>user</p> : <p>admin</p>}</div>
                </div>
                <div className='py-2'>{formattedToday}</div>
              </div>
            </div>
            
            <div className="bg-blue-400 w-2/3 px-2">
              <div className='py-4' >chatBox</div>
              <div className="h-full">
                <div className="bg-red-200 w-full">
                  <ChatBox userChats={userChats} id={id2} />
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
