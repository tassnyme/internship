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
import TodoList from './TodoList';
const UserProfile = () => {

  const sideBar = [
    { name: 'profile', Icon:FaRegUser },
    { name: 'Tasks', Icon: MdOutlineFormatListBulleted   },
    { name: 'sessions', Icon: FiVideo   },
    { name: "notifications" , Icon:FaRegBell},
    { name: 'settings', Icon: FiSettings },
    { name: 'help', Icon: IoMdHelp },
  ];



  const location = useLocation();
  const { state } = location;
  const {name,userId}=state
  const {username}=name  
  const {Id}=userId
  console.log(Id,"hey",username)
  return (
    <div className={styles.grid}>
    <div className={styles.navv}><Header name={username}  /></div>
    <div className={styles.sidd}>    <Sidebar arr={sideBar} /></div>
    <div className={styles.liss}>    <TodoList id ={Id}/></div>


    </div>
  );
};

export default UserProfile;
