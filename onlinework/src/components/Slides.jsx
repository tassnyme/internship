import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Calendar.module.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import clas from '../styles/SignAndLog.module.css';

function Slides({user }) {
  

const daysOfWeek =['Monday' , 'Tuedays' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']

  const week1 = ['1','2','3','4','5','6','7']
  const week2 = ['8','9','10','11','12','13','14']
  const week3 = ['15','16','17','18','19','20','21']
  const week4 = ['22','23','24','25','26','27','28']
  const week5 = ['29','30','31']
  

const [position, setPosition] = useState(0);

const nextSlide = () => {
  let newPos
  newPos = position - 50;

  setPosition(newPos);
  console.log('next',newPos)
};

const prevSlide = () => {
  let newPos 
  newPos = position + 50;

  setPosition(newPos);
  console.log('prev',newPos)

};

const email=user[0]
const username=user[1]
const id = user[2]
const checkedDays=user[3]
const canceledDays = user[4]
console.log('dddddddddddays',canceledDays,canceledDays.length)

  return (
    <div className='' >
      <div className='bg-whitegreen z-0 relative m-10 left-4  w-[52vw] h-[150px] grid grid-cols-6 items-center px-4 overflow-hidden text-pistache ' > 
      
      <div className='flex justify-between bg-transparent border-whitegreen border-2 -mx-12 w-[55vw] z-50 '>
        <div className=' w-[100px] h-[100px]  z-100 flex items-center justify-center '><button><FaLongArrowAltLeft onClick={prevSlide} size={32}/></button></div>
        <div className=' w-[100px] h-[100px]  left-[500px] flex items-center justify-center '><button><FaLongArrowAltRight onClick={nextSlide} size={32}/></button></div>
      </div>

      
        
      <div className='bg-whitegreen border-1 -ml-1 w-[302vw] h-[120px] absolute z-10 m-[24px]  items-center gap-4 grid grid-cols-6'
      style={{ transform: `translateX(${position}vw)`, transition : '1s ease-in-out' }}>

       {/* Dark blue div  */}
        <div className='bg bg-whitegreen  h-[11vh]  flex flex-col gap-y-4 justify-center items-center py-2'>
              <div className='w-full  flex justify-center '><h1>{username}</h1></div>
              <div className="w-full flex justify-center">
              <div className="hover:underline">
                <button className="text-white rounded-lg bg-green p-2 ">See calendar</button>
              </div>
    </div>       </div>
            
       {/* div week 1  */}
            
        <div className='bg bg-whitegreen  h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                <div className='text-center '>Meets by Week </div>
                <div className='flex  justify-between px-4 bg-whitegreen w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center justify-between px-5 bg-whitegreen w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-7'>  
                {week1.map((day, index) => (<div key={index} className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 
                ${styles.dayy} text-lg  rounded-full text-white font-extrabold flex items-center justify-center`}>{day}</div>))}
               </div>
        </div>

        {/* div week 2  */}
            
        <div className='bg bg-whitegreen  h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                <div className='text-center '>Meets by Week </div>
                <div className='flex  justify-between px-4 bg-whitegreen w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center justify-between px-5 bg-whitegreen w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-7'>  
                {week2.map((day, index) => (<div key={index} className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 

                ${styles.dayy} text-lg  rounded-full text-white font-extrabold flex items-center justify-center`}>{day}</div>))}
               </div>
        </div>

        {/* div week 3  */}
            
        <div className='bg bg-whitegreen  h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                <div className='text-center '>Meets by Week </div>
                <div className='flex  justify-between px-4 bg-whitegreen w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center justify-between px-5 bg-whitegreen w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-7'>  
                {week3.map((day, index) => (<div key={index} className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 

                ${styles.dayy} text-lg  rounded-full text-white font-extrabold flex items-center justify-center`}>{day}</div>))}
               </div>
        </div>

        {/* div week 4  */}
            
        <div className='bg bg-whitegreen  h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                <div className='text-center '>Meets by Week </div>
                <div className='flex  justify-between px-4 bg-whitegreen w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center justify-between px-5 bg-whitegreen w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-7'>  
                {week4.map((day, index) => (<div key={index} className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'} 
                                ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 

                ${styles.dayy} text-lg  rounded-full text-white font-extrabold flex items-center justify-center`}>{day}</div>))}
               </div>
        </div>

        {/* div week 5  */}
            
        <div className='bg bg-whitegreen  h-[11vh] flex flex-col gap-y-1 justify-center items-center '>
                <div className='text-center '>Meets by Week </div>
                <div className='flex  justify-between px-4 bg-whitegreen w-full '> {daysOfWeek.map((el) => (<div key={el}>{el}</div>))} </div>
                <div className=' flex items-center justify-between px-5 bg-whitegreen w-full md:font-sans lg:py-2 md:py-1 grid grid-cols-7'>  
                {week5.map((day, index) => (<div key={index} className={` ${checkedDays.includes(parseInt(day)) && 'bg-checked'}                 ${canceledDays.includes(parseInt(day)) && 'bg-canceled'} 
 ${styles.dayy} text-lg  rounded-full text-white font-extrabold flex items-center justify-center`}>{day}</div>))}
               </div>
        </div>





      </div>

      
      
      </div>

      
    </div>
  );
}

export default Slides;
