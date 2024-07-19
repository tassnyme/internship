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
      { name: 'meets', Icon: FiVideo   },
      { name: "history" , Icon:FaRegBell},
      { name: 'settings', Icon: FiSettings },
      { name: 'help', Icon: IoMdHelp },
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
      <div className=' flex flex-col gap-y-0 fixed left-[25vw] top-[6vw] '
    style={{ overflowY: 'scroll', height: '600px' }}
    >
      <div className="">  {/* Add a class for styling */}
        {data.map((user, index) => (
          <div key={index} className=""> {/* Add a class for styling */}
            <Slides user={user} />
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
