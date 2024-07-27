import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/chat/ChatBox';
import styles from '../styles/Bar.module.css';
import { FaRegUser, FaRegBell } from "react-icons/fa";
import { FiSettings, FiVideo } from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { io } from 'socket.io-client';
import InputEmoji from 'react-input-emoji';
import { format, parseISO, isToday } from 'date-fns';

function Chat() {
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

  const [userChats, setUserChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [newMessage,setNewMessage]= useState('')
  const [messages, setMessages] = useState([]);
  const [msgSent, setMsgSent] = useState('');
  const formattedToday = format(new Date(), 'MMM dd, yyyy');



  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.emit("addNewUser", id2);
    newSocket.on("getOnlineUsers", (users) => {
      const filteredUsers = users.filter(user => user.userId !== id2);
      if (admin) {
        setOnlineUsers(filteredUsers.filter(user => user.userId !== id2));
      } else {
        setOnlineUsers(filteredUsers.filter(user => user.userId === '6696ba45d44d36924a5ff12e'));
      }
    });
    newSocket.on("userDisconnected", (userId) => {
      setOnlineUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
    });

    newSocket.on("getMessage", (data) => {
      setNewMessage(prevMessages => [...prevMessages, data]);
    });
      return () => {
      newSocket.off("getOnlineUsers");
      newSocket.off("userDisconnected");
      newSocket.off("getMessage");
      newSocket.disconnect();
    };
  }, [id2, admin]);
  



 
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
  

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chats/${id2}`);
        setUserChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id2]);

  
  
  
  useEffect(() => {
    const getArray = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/getName`, { userChats });
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };if (userChats.length > 0) { 
      getArray();
    }
  }, [userChats]);

console.log("allsuuuuu",allUsers)

  
  const [recipientId , setRecipientId]=useState('')
  
  const handleChatIdClick = (id) => {
    const newChatId = id;
    console.log('newChatId',newChatId)
    setChatId(newChatId);
    const recipient = allUsers.find(item => item.idChat === newChatId);
      if (recipient) {
      setRecipientId(recipient.user._id);
    } else {
      console.log('Recipient not found');
    }
    
  };

  console.log(recipientId,"haaaaaaaaaaaaya")

  console.log("chatId",chatId)
  const userIds = onlineUsers.map(item => item.userId);  
  const idOfChat = userChats.length > 0 ? userChats[0]._id : null; 
  const effectiveChatId = admin ? chatId : idOfChat;

  
  useEffect(()=>{
    if (socket===null) return;
    socket.emit("sendMessage",{msgSent , recipientId})
},[msgSent,recipientId])


useEffect(()=>{
  if (socket===null) return;
  socket.on("getMessage", res=>{
      if(chatId !== res.chatId) return

      setMessages((prev)=>[...prev,res])
  })
},[newMessage])



  // Format messages with dates
  const formatDate = (messages) => {
    return messages.map((item) => ({
      ...item,
      formattedDate: format(parseISO(item.createdAt), 'MMM dd, yyyy hh:mm a'),
    }));
  };




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
    };fetchMessages();
  }, [effectiveChatId]);



  console.log(messages,"messssssages")

  
  return (
    <div className={styles.backgr}>
      <div className={styles.grid}>
        <div className={styles.sidd}>
          <Sidebar arr={sideBar} state={state} />
        </div>
        <div className={styles.liss}>
          <div className="flex w-[60vw] h-[90vh] overflow-hidden bg-black mt-10">
            <div className="bg-red-400 p-4 w-1/3">
              <div className="flex gap-[40vw]">
                <div>chatWith:</div>
              </div>
              <div className="flex gap-[5vw]">
                <div>
                  <div className='px-3 py-2 flex flex-col gap-2' >
                    {admin ? (
                      allUsers.map((item) => (
                        <div key={item.user._id} className=' flex items-center justify-between gap-2'>
                          <button onClick={() => handleChatIdClick(item.idChat)}>
                            {item.user.username}
                          </button>
                          <div className={`w-2 h-2 bg-${userIds.includes(item.user._id)?  'checked' : ''} rounded-[50%]`}></div>
                        </div>
                      ))
                    ) : (
                      <div className='flex  items-center  gap-2'><div>admin</div> <div className={`w-2 h-2 bg-${onlineUsers.length===1?  'checked' : ''} rounded-[50%]`}></div></div>
                    )}
                  </div>
                </div>
                <div className='py-2'>{formattedToday}</div>
              </div>
            </div>
            <div className="bg-blue-400 w-2/3 px-2">
              <div className='py-4'>chatBox</div>
              <div className="h-full">
                <div className="bg-red-200 w-full">
                  {chatId && <p>{chatId}</p>}
                  <div className='flex flex-col gap-4 h-[70vh]'>
                    <div className='h-full overflow-y-scroll flex flex-col px-2'>
                      {messages.map((messageee, index) => {
                        const messageDate = parseISO(messageee.createdAt);
                        return (
                          <div key={index} className={`flex flex-col items-${messageee.senderId === id2 ? 'end' : 'start'} p-2 rounded-lg`}>
                            <div className={`bg-${messageee.senderId === id2 ? 'checked' : 'white'} p-2 rounded-lg`}>
                              {messageee.text}
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