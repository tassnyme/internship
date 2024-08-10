import { useLocation, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Calendar.module.css';
import UserInfo from './UserInfo';

import Sidebar from './Sidebar';
import { FaRegUser, FaRegBell } from "react-icons/fa";
import { FiSettings, FiVideo } from "react-icons/fi";
import { IoMdHelp, IoMdAdd } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import classes from '../styles/Bar.module.css';
import axios from 'axios';
import clas from '../styles/SignAndLog.module.css';

function AdminCHECK() {

    const sideBar = [
        { name: 'profile', Icon:FaRegUser },
        { name: 'Users', Icon: MdOutlineFormatListBulleted   },
        { name: 'meets', Icon: FiVideo   },
        { name: "history" , Icon:FaRegBell},
        { name: 'messages', Icon: FiSettings },
        { name: 'help', Icon: IoMdHelp },
      ];   


    const location = useLocation();
    const state = location.state;
    const { name, userId } = state;
    const { username } = name;
 
    const id = useParams()
console.log(id.useId, "in admincheck (meets) compo")
    console.log("staaaaaaaaaaaaaaaae" ,state)
  

    const days = [];
    for (let day = 1; day <= 31; day++) {
        days.push(day);
    }

    
    const [varr, setVar] = useState(false);
    const [day, setDay] = useState("");

    

    // const updateState = (day) => {
    //     setDay(day);
    //     setVar(pendingDays.includes(day));
    // };

    // const stateHandler = async (state) => {
    //     console.log(day, state);
    //     checkHandler(day, state);
    // };

    // const checkHandler = async (day, response) => {
    //     window.location.reload()

        
    //     try {
    //         const Id = id.useId
    //         console.log(response,day,Id)
    //         const respon = await axios.post(`http://localhost:3001/seeResponse/${response}/${day}/${Id}`);
    //         console.log(respon)
    //         if (respon.status === 202) {
    //             console.log('Request successful');
    //         } else {
    //             console.log('Request failed');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };    const daysOfWeek =['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']


    return (
        <div className={classes.backgr}>
            <div className={classes.grid}>
            <div className={classes.sidd}><Sidebar state={state} arr={sideBar} /></div>

                
                    <div className=''><UserInfo id={id} ></UserInfo> </div>
            
            </div>

           
        </div>
    );
}

export default AdminCHECK;
