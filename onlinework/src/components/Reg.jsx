import React from 'react'
import ph from '../assets/ph2.png'
import styles from '../styles/SignAndLog.module.css' 
import { Link } from 'react-router-dom'
function Reg() {
  return (
    <div className='relative'> 
        <div>
            <img src={ph} alt="" className={styles.image}/>
        </div>
        <div className={styles.absolu}>
            <Link to='/login' className={styles.btn2}>  Login!!
            </Link>
        </div>
    </div>
  )
}

export default Reg
