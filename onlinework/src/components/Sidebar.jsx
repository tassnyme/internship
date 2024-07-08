import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import { FiSettings } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiVideo } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";

import { Link } from 'react-router-dom';
import styles from '../styles/Bar.module.css'
const sideBar = [
  { name: 'sessions', Icon: FiVideo   },
  { name: 'profile', Icon:FaRegUser },
  { name: "notifications" , Icon:IoNotificationsOutline},
  { name: 'users', Icon: LiaUsersSolid },
  { name: 'settings', Icon: FiSettings },
  { name: 'help', Icon: IoMdHelpCircleOutline },
];

function Sidebar() {
  return (
    <div className=''>
    <div className={styles.navigation}>
      <ul className='bg-red'> 
        {sideBar.map(({name,Icon}, index) => (
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
