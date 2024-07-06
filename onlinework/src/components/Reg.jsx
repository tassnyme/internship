import React from 'react'
import ph from '../assets/ph2.png'
import '../index.css'
import { Link } from 'react-router-dom'
function Reg() {
  return (
    <div className='relative'> 
        <div>
            <img src={ph} alt="" className='image'/>
        </div>
        <div className='absolu '>
            <Link to='/login' className='btn2 rounded-2xl '>  Login!!
            </Link>
        </div>
    </div>
  )
}

export default Reg
