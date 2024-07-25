import React from 'react';
import styles from '../styles/Calendar.module.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaRegUser , FaCheck ,FaRegBell } from "react-icons/fa";
import { FiSettings , FiVideo } from "react-icons/fi";
import { IoMdHelp , IoMdAdd } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { RiDeleteBinLine ,  } from "react-icons/ri";

function Calendar() {

    const sideBar = [
        { name: 'profile', Icon:FaRegUser },
        { name: 'Tasks', Icon: MdOutlineFormatListBulleted   },
        { name: 'sessions', Icon: FiVideo   },
        { name: "meets" , Icon:FaRegBell},
        { name: 'messages', Icon: FiSettings },
        { name: 'help', Icon: IoMdHelp },  

    ]
    const location = useLocation; 
    const state = location.state; 
    const {name,userId}=state
    const {username}=name  
    const {id}=userId
    console.log("state is ",state )
    const days = [];
    for (let day = 1; day <= 31; day++) {
        days.push(day);
    }


   

    return (
        <div className={styles.backgr}>
    <div className={styles.grid}>
    <div className={styles.sidd}>    <Sidebar state={state} arr={sideBar} /></div>
    <div className={styles.liss}>    
        <div className='bg-blue grid grid-cols-7 w-[60vw] h-[50vh] justify-center items-center py-4 gap-4'>
            { 
                days.map((day) => (
                    <div key={day} className={`${styles.day} w-10 h-10 mx-auto rounded-full flex items-center justify-center ` }>
                       <button className={styles.button} role="button"><span className={styles.text}>{day}</span></button>
                    </div>
                ))
                
            }
        </div> </div> </div> </div>
    );
}

export default Calendar;
