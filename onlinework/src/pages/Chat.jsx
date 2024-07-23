import axios from 'axios';
import React, { useState , useEffect } from 'react'
import ChatMessages from './ChatMessages';
function Chat() {
console.log('im in chat compo')

    const [users,setUsers]= useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/getUser');
            await setUsers(response.data);
            console.log('data is ', response.data); // Log the fetched data       
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
      console.log(users[2],'userrrre')
const user=users[2]
  return (
    <div>
    {users.length > 2 && <ChatMessages user={user} />}
  </div>
  )
}

export default Chat
