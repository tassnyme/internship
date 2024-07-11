import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import ListOfUsers from './ListOfUsers'
import styles from '../styles/Bar.module.css'
function Admin() {
  return (
    <div className={styles.grid}>
    <div className={styles.navv}><Header /></div>
    <div className={styles.sidd}>    <Sidebar/></div>
    <div className={styles.liss}>    <ListOfUsers/></div>
    </div>
  )
}

export default Admin
