import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Calendar.module.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import clas from '../styles/SignAndLog.module.css';

function Slides({id1 }) {
  

const daysOfWeek =['Monday' , 'Tuedays' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']

  const week1 = ['','','','1','2','3','4']
  const week2 = ['5','6','7','18','9','10','11']
  const week3 = ['12','13','14','15','16','17','18']
  const week4 = ['19','20','21','22','23','24','25']
  const week5 = ['26','27','28','29','30','31']
  

const [position, setPosition] = useState(0);

const nextSlide = () => {
  let newPos
  newPos = position - 46;

  setPosition(newPos);
  console.log('next',newPos)
};

const prevSlide = () => {
  let newPos 
  newPos = position + 46;

  setPosition(newPos);
  console.log('prev',newPos)

};

const [pendingDays, setPendingDays] = useState([]);
const [checkedDays, setCheckedDays] = useState([]);
const [canceledDays, setCanceledDays] = useState([]);
const [varr, setVar] = useState(false);
const [day, setDay] = useState("");

console.log('id1',id1)


const days = [];
for (let day = 1; day <= 31; day++) {
    days.push(day);
}

useEffect(() => {
    const fetchData = async () => {

        try {
            const response = await axios.get(`http://localhost:3001/getPending/${id1}`);
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
}, []);


// const email=user[0]
// const username=user[1]
// const id = user[2]
// const checkedDays=user[3]
// const canceledDays = user[4]
// console.log('dddddddddddays',canceledDays,canceledDays.length)

  return (
    <div className='' >
      <div className=' z-0 relative  w-[44vw] h-[150px] grid grid-cols-6 items-center px-4  text-pistache  overflow-hidden' > 
      
      <div className='flex justify-between    -mx-12 w-[46vw] z-50  relative'>
        <div className=' w-[100px] h-[100px] left-[1.4vw]  z-100 flex items-center justify-center absolute'><button><FaLongArrowAltLeft onClick={prevSlide} size={32}/></button></div>
        <div className=' w-[100px] h-[100px]  left-[43vw] flex items-center justify-center absolute '><button><FaLongArrowAltRight onClick={nextSlide} size={32}/></button></div>
      </div>

      
        
      <div className='  -ml-1 w-[276vw] h-[120px] absolute z-10 m-[24px]  items-center gap-4 grid grid-cols-6 '
      style={{ transform: `translateX(${position}vw)`, transition : '1s ease-in-out' }}>

       {/* Dark blue div  */}
        <div className='bg  h-[11vh]  flex flex-col gap-y-4 justify-center items-center py-2 '>
              <div className='w-full  flex justify-center '><h1>See meets by week</h1></div>
              <div className="w-full flex justify-center"> </div>    
        </div>
            
       {/* div week 1  */}
            
        <div className='bg   h-[11vh] flex flex-col gap-y-1 justify-center items-center ml-3'>
                
                <div className='flex  justify-between  px-20 -ml-12  w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center  justify-between  w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-8'>  
                {week1.map((day, index) => (<div key={index} 
                className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 
                ${styles.dayy} 
                className='text-lg  rounded-full text-white font-extrabold flex items-center justify-center ml-14 '
                // `}
                >{day}</div>))}
               </div>
        </div>

        {/* div week 2  */}
            
        <div className='  h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                
        <div className='flex  justify-between  px-20 -ml-12  w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center  justify-between  w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-8'>  
                {week2.map((day, index) => (<div key={index} 
                className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 
                ${styles.dayy} 
                className='text-lg  rounded-full text-white font-extrabold flex items-center justify-center ml-14 '
                // `}
                >{day}</div>))}
               </div>
        </div>

        {/* div week 3  */}
            
        <div className='bg   h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                
        <div className='flex  justify-between  px-20 -ml-12  w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center  justify-between  w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-8'>  
                {week3.map((day, index) => (<div key={index} 
                className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 
                ${styles.dayy} 
                className='text-lg  rounded-full text-white font-extrabold flex items-center justify-center ml-14 '
                // `}
                >{day}</div>))}
               </div>
        </div>

        {/* div week 4  */}
            
        <div className='bg   h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                
        <div className='flex  justify-between  px-20 -ml-12  w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center  justify-between  w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-8'>  
                {week4.map((day, index) => (<div key={index} 
                className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 
                ${styles.dayy} 
                className='text-lg  rounded-full text-white font-extrabold flex items-center justify-center ml-14 '
                // `}
                >{day}</div>))}
               </div>
        </div>

        {/* div week 5  */}
            
        <div className='bg   h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                
        <div className='flex  justify-between  px-20 -ml-12  w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center  justify-between  w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-8'>  
                {week5.map((day, index) => (<div key={index} 
                className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 
                ${styles.dayy} 
                className='text-lg  rounded-full text-white font-extrabold flex items-center justify-center ml-14 '
                // `}
                >{day}</div>))}
               </div>
        </div>





      </div>

      
      
      </div>

      
    </div>
  );
}

export default Slides;
