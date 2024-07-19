
import React, { useState } from 'react';
import styles from '../styles/SignAndLog.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";

import photo from '../assets/photo.jpg'; // Importing image
import { Link } from 'react-router-dom';
import axios from 'axios'
function Signup() {
  const [message,setMessage]=useState('')
  const githubUrlRegex = /^https:\/\/github\.com\/[A-Za-z0-9_-]+$/;

  const formik = useFormik({
    initialValues: {
      username:'',
      password:'',
      email: '',
      githubUrl : ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required'),
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      githubUrl: Yup.string().matches(githubUrlRegex, 'Invalid GitHub URL').required('Required'),

    }),
    onSubmit: async ({ username, password, email , githubUrl}) => {
      try {
        const response = await axios.post('http://localhost:3001/register', {
          username,
          password,
          email,
          githubUrl
        });

        setMessage(response.data.message);
        if (response.data.message==="User registered successfully")
          window.location.href = '/login';
      } catch (error) {
        setMessage(error.response.data.error || 'mail Already in use');
        formik.resetForm();

      }
    },
    
  });
  
  return (
    <div className={styles.backgr}>
    <div className={styles.wrapper}>
      
    <div className='flex items-start justify-center   m-12
     -py-1
     lg:flex-row
     xs:flex-col
    rounded-md
    border-2
    border-whitegreen
    bg-green
    items-center
    ' >
      <div className='w-[50%] h-[700px] pt-12 px-14 text-pistache'>
      <>
        <h1 className='py-8 text-3xl text-center tracking-wider font-semibold'>SignUp </h1>
         <form onSubmit={formik.handleSubmit} >
          
          <div className='flex flex-col px-12 gap-8 items-start'>
           
          <div className=' flex flex-col items-start'>
            <label htmlFor="email" >Username: </label>

            <div className=' flex items-center border-b border-whiteGrey py-2 '> 
              <FaRegUser className='mr-4' />
              <input
                id="username"
                name="username"
                type="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder='Enter username...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-whitegreen ml-4 active:bg-green"

              />
              {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
              ) : null}
            </div> 
          
          </div>


          <div className=' flex flex-col items-start'>
            <label htmlFor="github"> githubUrl :</label>
          
            <div className=' flex items-center border-b border-whiteGrey py-2  '>
            <FiGithub  className='mr-4'/>
              <input
                id="githubUrl"
                name="githubUrl"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.githubUrl}
                placeholder='Enter your github Link ...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-whitegreen ml-4 focus:placeholder:opacity-8 "
              />
              {formik.touched.githubUrl && formik.errors.githubUrl ? (
              <div>{formik.errors.githubUrl}</div>
            ) : null}
            </div>

            </div>

          <div className=' flex flex-col items-start'>
            <label htmlFor="email" >Email Address : </label>

            <div className=' flex items-center border-b border-whiteGrey py-2 '> 
              <AiOutlineMail className='mr-4' />
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder='Enter email...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-whitegreen ml-4 "

              />
              {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
              ) : null}
            </div> 
          
          </div>
          
          

          <div className=' flex flex-col items-start'>
            <label htmlFor="password">Password :</label>
          
            <div className=' flex items-center border-b border-whiteGrey py-2  '>
            <RiLockPasswordLine  className='mr-4'/>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder='Enter password...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-whitegreen ml-4 focus:placeholder:opacity-8 "
              />
              {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            </div>

            </div>

            
            <div className='flex gap-x-8 w-full  justify-between items-end'>

              <div >
                <Link to="/login" className='hover:underline text-pistache no-underline'>Already have an account?</Link>
              </div>
              
            </div>
            
           
            <div className=''>
            <button className={styles.btn} type='submit'>Signup</button>
          </div>
{message && <p className='font-bold  animate-pulse'>{message}</p>}
          </div>
        </form>
    </>
      </div>
      <div className='w-1/2 h-full '>
        <img src={photo} alt="Description of the photo" className='h-[700px]' />
      </div>
    </div>
    </div></div>
  );
}

export default Signup;
