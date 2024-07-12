import React from 'react';
import bgg from '../assets/green-bg.jpg'
import { Link } from 'react-router-dom';
import styles from '../styles/Bar.module.css'


function Sidebar({arr}) {
  console.log(arr)
  return (
    <div className=''>
    <div className={styles.navigation}style={{
        backgroundImage: `url(${bgg})`, // Use template literals to insert the image URL
        backgroundSize: 'cover', // Adjust as per your design needs
        backgroundPosition: 'center', // Adjust as per your design needs
      }}>
        <div>
          
        </div>
      <ul className='bg-red'> 
        {arr.map(({name,Icon}, index) => (
          <div key={index} className={styles.divv}>
          <li  className={styles.active}>
            <Link to={`/admin/${name}`} className={styles.link}>
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
    </div></div>
  );
}

export default Sidebar;
