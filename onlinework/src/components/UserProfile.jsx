import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'
import Header from './Header'
import styles from '../styles/Bar.module.css'
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";
import { FiVideo } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";
const UserProfile = () => {

  const sideBar = [
    { name: 'profile', Icon:FaRegUser },
    { name: 'Tasks', Icon: MdOutlineFormatListBulleted   },
    { name: 'sessions', Icon: FiVideo   },
    { name: "meets" , Icon:FaRegBell},
    { name: 'settings', Icon: FiSettings },
    { name: 'help', Icon: IoMdHelp },
  ];


  const location = useLocation();
  const { state } = location;
  const {name,userId,admin}=state
  const {username}=name  
  const {id}=userId
  console.log(admin)
  console.log(state)
console.log("heeeeeeeeeeeeeeeeey")
  console.log(id,"hey",username)
  return (
    <div className={styles.backgr}>
    <div className={styles.grid}>
    <div className={styles.sidd}>    <Sidebar arr={sideBar} state={state} /></div>


    </div></div>
  );
};

export default UserProfile;
