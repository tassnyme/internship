import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Calendar.module.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Slides from './Slides';
import { FaRegUser , FaRegBell } from "react-icons/fa";
import { FiSettings , FiVideo} from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

function History() {

  const [data, setData] = useState([]);
    const location = useLocation();
    const { state } = location;
    const {name,userId,admin}=state
    const {username}=name  
    const {id}=userId
    console.log(admin)
    console.log(state)
    const sideBar = [
      { name: 'profile', Icon:FaRegUser },
      { name: 'Users', Icon: MdOutlineFormatListBulleted   },
      { name: "history" , Icon:FaRegBell},
      { name: 'messages', Icon: FiSettings },
    ]; 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/getArray');
            console.log('repoooooooooooooooooooonse',response.data)
            await setData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    const user1 = data[0]
    console.log('user1',user1)
    
    console.log(data,'dataaaaaaaaaaa')

  return (
    <div>
      <div className={styles.backgr}>
      <div className={styles.grid}>
      <div className={styles.sidd}> <Sidebar arr={sideBar} state={state} /> </div>
      <div className={styles.liss}>
      <div className=' flex flex-col gap-y-0 fixed left-[38vw] top-[10vw]   '
    style={{ overflowY: 'scroll' , maxHeight : '450px'}}
    >
      <div className="bg-whitegreen px-12">  {/* Add a class for styling */}
        {data.map((user, index) => (
          <div key={index} className=""> {/* Add a class for styling */}
            <Slides id1={user[2]} name={user[1]} />
          </div>
        ))}
      </div>
      </div>
      
      
      </div>
      </div>
      </div>
    </div>
  )
}

export default History
