import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import styles from '../styles/Bar.module.css'
import { useLocation } from 'react-router-dom';
import { FaRegUser , FaRegBell } from "react-icons/fa";
import { FiSettings , FiVideo} from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
function Admin() {

  const sideBar = [
    { name: 'profile', Icon:FaRegUser },
    { name: 'Users', Icon: MdOutlineFormatListBulleted   },
    { name: 'meets', Icon: FiVideo   },
    { name: "history" , Icon:FaRegBell},
    { name: 'messages', Icon: FiSettings },
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
    <div className={styles.navv}><Header name={username} /></div>
    <div className={styles.sidd}>    <Sidebar arr={sideBar} state={state} /></div>
    </div></div>
  )
}

export default Admin
