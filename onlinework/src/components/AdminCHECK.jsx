import { useLocation, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Calendar.module.css';
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

    const [pendingDays, setPendingDays] = useState([]);
    const [checkedDays, setCheckedDays] = useState([]);
    const [canceledDays, setCanceledDays] = useState([]);
    const [varr, setVar] = useState(false);
    const [day, setDay] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const Id = id.useId
            console.log(Id,"id isttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")

            try {
                const response = await axios.get(`http://localhost:3001/getPending/${Id}`);
                const { data } = response;
                console.log("data", data);
                setPendingDays(data.pending);
                setCheckedDays(data.checked);
                setCanceledDays(data.canceled);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const updateState = (day) => {
        setDay(day);
        setVar(pendingDays.includes(day));
    };

    const stateHandler = async (state) => {
        console.log(day, state);
        checkHandler(day, state);
    };

    const checkHandler = async (day, response) => {
        window.location.reload()

        
        try {
            const Id = id.useId
            console.log(response,day,Id)
            const respon = await axios.post(`http://localhost:3001/seeResponse/${response}/${day}/${Id}`);
            console.log(respon)
            if (respon.status === 202) {
                console.log('Request successful');
            } else {
                console.log('Request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    const daysOfWeek =['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']


    return (
        <div className={classes.backgr}>
            <div className={classes.grid}>
            <div className={classes.sidd}><Sidebar state={state} arr={sideBar} /></div>

                <div className={classes.liss}>
                <div className=' absolute top-15 left-[4vw] text-pistache pt-2 relative  bg-whitegreen  w-[60vw] h-[50vh] justify-center items-center p-8   pt-4'>
                        <div>
                            <h1 className='text-center tracking-widest font-bold'> July </h1>
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
                                <button onClick={() => updateState(day)}>
                                    {day}
                                </button>
                            </div>
                        ))} </div>
                    </div>
                </div>
            </div>

            {varr && (
                <div className='flex gap-4 fixed top-[80vh]  left-[48vw]'>
                    <button className={clas.button7} onClick={() => stateHandler("confirm")}>Confirm</button>
                    <button className={clas.button7} onClick={() => stateHandler("cancel")}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AdminCHECK;
