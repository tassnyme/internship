import React, { useState, useEffect ,useRef} from 'react';
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
import ph from '../assets/profile.png'
function Chat() {
 
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
  const [newMessage,setNewMessage]= useState([])
  const [messages, setMessages] = useState([]);
  const [msgSent, setMsgSent] = useState('');
  const formattedToday = format(new Date(), 'MMM dd, yyyy');
  const sideBar = admin ? 
  [
    { name: 'profile', Icon: FaRegUser },
    { name: 'Users', Icon: MdOutlineFormatListBulleted },
    { name: "history", Icon: FaRegBell },
    { name: 'messages', Icon: FiSettings },
  ] : 
  [
    { name: 'profile', Icon:FaRegUser },
    { name: 'Tasks', Icon: MdOutlineFormatListBulleted   },
    { name: "meets" , Icon:FaRegBell},
    { name: 'messages', Icon: FiSettings },
  ];



  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.emit("addNewUser", id2);
    newSocket.on("getOnlineUsers", (users) => {
      const filteredUsers = users.filter(user => user.userId !== id2);
      if (admin) {
        setOnlineUsers(filteredUsers.filter(user => user.userId !== id2));
      } else {
        setOnlineUsers(filteredUsers.filter(user => user.userId === '66a59411f2abb871f948492f'));
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
  const handleSend = async (idd) => {
    
    try {
      let response;
      if (effectiveChatId) {
        response = await axios.post('http://localhost:3001/createMessage', {
          chatId:effectiveChatId,
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

  console.log(allUsers,"alllllllllllllllllllwu")
  
  const [recipientId , setRecipientId]=useState('66b772adeafce5c1d4be79dd')
  
  const handleChatIdClick = (idd) => {

    if (admin===false){console.log("im in admin"); setRecipientId("66b772adeafce5c1d4be79dd")}
    else  {const newChatId = idd;
      console.log("aniiiiiiiiiiiiiiiiiiiiii lnnn")
      setChatId(newChatId);
      const recipient = allUsers.find(item => item.idChat === newChatId);
        if (recipient) {
        setRecipientId(recipient.user._id);
      } else {
        console.log('Recipient not found');
      }}

      if (msgSent){handleSend(idd)}
 
    
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const chatContainerRef = useRef(null);
  const latestMessageRef = useRef(null);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  const userIds = onlineUsers.map(item => item.userId);  
  const idOfChat = userChats.length > 0 ? userChats[0]._id : null; 
  const effectiveChatId = admin ? chatId : idOfChat;

  // Ensure socket is not null before using it
useEffect(() => {
  if (!socket) return;

  socket.emit("sendMessage", { msgSent, recipientId , id2});
}, [msgSent, recipientId, socket]); // Include socket in dependency array to avoid potential issues




useEffect(() => {
  if (!socket) return;

  const handleGetMessage = (res) => {
    
    // if (chatId !== res.chatId) {return}
    console.log("les messages")
    console.log(res.msgSent)

    // setMessages((prev) => [...prev, res]);
  };

  socket.on("getMessage", handleGetMessage);

  // Cleanup function to remove the listener when the component unmounts or dependencies change
  return () => {
    socket.off("getMessage", handleGetMessage);
  };
}, [chatId, socket]); // Include chatId and socket in dependency array



const [clicked, setClicked] = useState(false)

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
        console.log('im in getMessage')
        const response = await axios.get(`http://localhost:3001/getMessages/${effectiveChatId}`);
        const formattedMessages = formatDate(response.data);
        setMessages(formattedMessages);
        console.log('Messages data:', response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };fetchMessages();
  }, [effectiveChatId, newMessage]);




  console.log("recipient is", recipientId)
  console.log("chatid", chatId)
  console.log("effectivechatid", effectiveChatId)


  return (
    <div className={styles.backgr}>
      <div className={styles.grid}>
        <div className={styles.sidd}>
          <Sidebar arr={sideBar} state={state} />
        </div>
        <div className={`${styles.liss} -my-40 `} >
          <div className="flex w-[60vw] h-[90vh] overflow-hidden bg-whitegreen relative ">
            <div className="bg-greeClaire text-pistache p-10 w-1/3 h-full absolute top-0 left-0 px-4 border-r-2  border-slate-100">
              <div className="flex gap-[40vw]">
                <div>chatWith:</div>
              </div>
              <div className="flex gap-[5vw]">
                <div>
                <div className='px-3 py-2 flex flex-col gap-2'>
  {admin ? (
    allUsers.map((item) =>
      item.user.username !== 'tassnymelaroussy' && (
        <div
          key={item.user._id}
          className={`flex items-center justify-between px-4 gap-8 rounded-md w-[18vw] p-2 ${
            effectiveChatId === item.idChat && recipientId ? 'bg-sidebar' : 'bg-transparent'
          }`}
        >
          <div className='flex gap-2'>
            <div>
              <img src={ph} alt='' />
            </div>
            <button onClick={() => handleChatIdClick(item.idChat)}>
              {item.user.username}
            </button>
          </div>
          <div
            className={`w-2 h-2 ${
              userIds.includes(item.user._id) ? 'bg-checked' : 'bg-transparent'
            } rounded-[50%]`}
          ></div>
        </div>
      )
    )
  ) : (
    <div className='flex items-center gap-4'>
      {userChats?.map((item) => (
        <div key={item._id}>
          admin
        </div>
      ))}
      <div
        className={`w-2 h-2 ${
          onlineUsers.length === 1 ? 'bg-checked' : 'bg-transparent'
        } rounded-[50%]`}
      ></div>
    </div>
  )}
</div>

                </div>
                {/* <div className='py-2'>{formattedToday}</div> */}
              </div>
            </div>
            <div className="bg-whitegreen w-2/3 px-2 absolute h-[90%] top-0 left-[33.33%]">
              <div className='py-4 text-pistache text-lg'>chatBox</div>
              <div className="h-full">
                <div className=" w-full relative">
                  {/* {chatId && <p>{chatId}</p>} */}
                  <div className='flex flex-col gap-4 h-[70vh]'>
                    <div className='h-full overflow-y-scroll flex flex-col px-2'>
                    {messages.length > 0 ? (
                      messages.map((messageee, index) => {
                        const messageDate = parseISO(messageee.createdAt);
                        return (
                          <div key={index} ref={chatContainerRef} 
                            className={`flex flex-col items-${messageee.senderId === id2 ? 'end' : 'start'} p-2 px-4 rounded-lg`}>
                            <div ref={index === messages.length - 1 ? latestMessageRef : null} 
                              className={`bg-${messageee.senderId === id2 ? 'checked' : 'white'} p-2 rounded-lg`}>
                              {messageee.text}
                              <p className='text-slate-600 text-sm'>
                                {isToday(messageDate) ? `Today ${format(messageDate, 'hh:mm a')}` : format(messageDate, 'MMM dd hh:mm a')}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-fit  text-2xl animate-pulse'>No messages yet!</div>
                    )}

                    </div>
                    <div className="flex absolute z-100 top-[103%] w-[39vw] items-center">
  <InputEmoji
    value={msgSent}
    onChange={setMsgSent}
    onKeyDown={handleKeyDown}
    placeholder="Type a message..."
  />
  <div>
    <button
      onClick={() => handleChatIdClick(effectiveChatId)}
      className="hover:bg-green-500 hover:rounded-lg hover:px-2 py-1"
    >
      Send
    </button>
  </div>
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