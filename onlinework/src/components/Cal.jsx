import { useLocation } from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import styles from '../styles/Calendar.module.css';
import Sidebar from './Sidebar';
import { FaRegUser, FaRegBell } from "react-icons/fa";
import { FiSettings, FiVideo } from "react-icons/fi";
import { IoMdHelp, IoMdAdd } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import classes from '../styles/Bar.module.css';
import axios from 'axios';

function Cal() {
    const sideBar = [
        { name: 'profile', Icon: FaRegUser },
        { name: 'Tasks', Icon: MdOutlineFormatListBulleted },
        { name: "meets", Icon: FaRegBell },
        { name: 'messages', Icon: FiSettings },
    ];

    const location = useLocation();
    const state = location.state;
    const { name, userId } = state;
    const { username } = name;
    const { id } = userId;

    

    const days = [];
days.unshift('' , '' , ''); // Add a space at the beginning

for (let day = 1; day <= 31; day++) {
    days.push(day);
}



    const [pendingDays, setPendingDays] = useState([]);
    const [checkedDays, setCheckedDays] = useState([]);
    const [canceledDays, setCanceledDays] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getPending/${id}`);
      const { data } = response;
      console.log(data)
      await setPendingDays(data.pending); // Assuming the API returns an array of pending days
      await setCheckedDays(data.checked); // Assuming the API returns an array of pending days
      await setCanceledDays(data.canceled); // Assuming the API returns an array of pending days

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, [id]);
console.log(id,"idddddddddddd")
    const daysOfWeek =['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']
    

    const checkHandler = async (day) => {
        console.log(id,day)
        window.location.reload()
        try {
            const response = await axios.post(`http://localhost:3001/pending/${day}/${id}`);
            if (response.status === 202) {
                console.log('Request successful');
            } else {
                console.log('Request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    console.log('checked',checkedDays)
    console.log('pending',pendingDays)
    console.log('canceled',canceledDays)


    return (
        <div className={classes.backgr}>
            <div className={classes.grid}>
                <div className={classes.sidd}><Sidebar state={state} arr={sideBar} /></div>
                <div className={classes.liss}>
                    <div className=' absolute top-15 left-[4vw] text-pistache pt-2 relative  bg-whitegreen  w-[60vw] h-[50vh] justify-center items-center p-8   pt-4'>
                        <div>
                            <h1 className='text-center tracking-widest font-bold'> August </h1>
                        </div>
                        <div className=' absolute top-20 left-0 w-full grid grid-cols-7 text-center py-1  '>
                            
                           {daysOfWeek.map((item,index)=>{ return <div key={index}> {item} </div> }) } 

                        </div>
                        <div className='bg-transparent w-[90%] h-[70%] grid grid-cols-7 absolute left-14 gap-x-28 top-[122px] '>

                            {days.map((day) => (
                            <div
                            key={day}
                            className={`${styles.day} ${checkedDays.includes(day) && 'bg-checked'} ${canceledDays.includes(day) && 'bg-canceled'} 
                            ${pendingDays.includes(day)  && !checkedDays.includes(day)  && !canceledDays.includes(day) ? 'bg-pending' : ''} 
                            rounded-full text-white font-extrabold flex items-center justify-center `}
                            >
                            {/* Conditionally render the button only if day is present in pendingDays */}
                             
                                <button className='text-lg text-bold ' onClick={() => checkHandler(day)}>
                                {day}
                                </button>
                             
                            </div>
                        ))}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cal;
