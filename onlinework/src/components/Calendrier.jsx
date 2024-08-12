import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Calendar.module.css';
import clas from '../styles/SignAndLog.module.css';

function Calendrier({ id1 }) {
    const [pendingDays, setPendingDays] = useState([]);
    const [checkedDays, setCheckedDays] = useState([]);
    const [canceledDays, setCanceledDays] = useState([]);
    const [varr, setVar] = useState(false);
    const [day, setDay] = useState("");
    const [state, setState] = useState(""); 
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
console.log(days,'daysssss')
days.unshift('','','')
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/getPending/${id1}`);
            const { data } = response;
            console.log(data, "data");
            setPendingDays(data.pending); 
            setCheckedDays(data.checked); 
            setCanceledDays(data.canceled); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, [id1]);


    const updateState = (day) => {
        setDay(day);
        setVar(pendingDays.includes(day));
    };

    const stateHandler = async (state) => {
        setState(state); 
        try {
            const response = await axios.post(`http://localhost:3001/seeResponse/${state}/${day}/${id1}`);
            if (response.status === 202) {
                console.log('Request successful');
            } else {
                console.log('Request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (state) {
           
        }
    }, [state]);

    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div className='relative'>
            <div className='text-pistache pt-2 relative bg-whitegreen w-[100%] h-[31vh] justify-center items-center p-8'>
                <div>
                    <h1 className='text-center tracking-widest font-bold'> August </h1>
                </div>
                <div className='absolute top-[10%] left-0 w-full grid grid-cols-7 text-center py-1'>
                    {daysOfWeek.map((item, index) => <div key={index}>{item}</div>)}
                </div>
                <div className='bg-transparent w-[90%] h-[70%] grid grid-cols-7 absolute left-[4%] gap-x-4 top-[20%]'>
                    {days.map((day) => (
                        <div
                            key={day}
                            className={`${styles.day} ${checkedDays.includes(day) && 'bg-checked'} ${canceledDays.includes(day) && 'bg-canceled'} 
                            ${pendingDays.includes(day) && !checkedDays.includes(day) && !canceledDays.includes(day) ? 'bg-pending' : ''} 
                            rounded-full text-white font-extrabold flex items-center justify-center`}
                        >
                            <button onClick={() => updateState(day)}>
                                {day}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {varr && (
                <div className='absolute top-[85%]'>
                    <button className={clas.button7} onClick={() => stateHandler("confirm")}>Confirm</button>
                    <button className={clas.button7} onClick={() => stateHandler("cancel")}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Calendrier;
