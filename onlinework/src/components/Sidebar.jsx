import React from 'react';
import bgg from '../assets/green-bg.jpg'
import { Link } from 'react-router-dom';
import styles from '../styles/Bar.module.css'
import { FaCircleUser } from "react-icons/fa6";


function Sidebar({arr , ph, state }) {
  console.log(state)
  const {name,userId,admin}=state
  console.log(name, 'naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame')
  const {username}=name  
  const {id}=userId
  const urlVar = (admin) ? 'admin' : 'user' ; 
  console.log('is it admin ', urlVar )
console.log('table is ' ,arr)
console.log(urlVar,'/',arr[3].name,'/',id)
  console.log("im side bar and state is " , state )
  return (
    <div className=''>
    <div className={styles.navigation}
    // style={{
    //     backgroundImage: `url(${bgg})`, // Use template literals to insert the image URL
    //     backgroundSize: 'cover', // Adjust as per your design needs
    //     backgroundPosition: 'center', // Adjust as per your design needs
    //   }}
      >
        <div className=' h-1/4 flex flex-col justify-center items-center ' >
        <div className='pt-4 w-[40%] h-2/3 flex justify-center items-center rounded-[50%] relative overflow-hidden'> <FaCircleUser className={styles.iconnn}/> </div>
        <div className='  w-full h-1/3 text-center text-[16px]  text-white'><h1 className='text-[16px]'></h1>{username}</div>
        </div>
        <div>
        <ul className='bg-red'> 
        {arr.map(({name,Icon}, index) => (
          <div key={index} className={styles.divv}>
          <li  className={styles.active}>
            <Link to={`/${urlVar}/${name}/${id}`} className={styles.link} state={state}>
              <span className={styles.icon}>
                <Icon className={styles.ion} /> 
              </span>
              <span className={styles.title}>
                {name}
              </span>
            </Link>
          </li>
          </div>
        ))}
      </ul>
        </div>
      
    </div></div>
  );
}

export default Sidebar;
