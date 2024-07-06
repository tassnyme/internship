import React, { useState } from 'react';
import '../index.css'; // Ensure this path is correct
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import photo from '../assets/photo.jpg'; // Importing image
import { Link } from 'react-router-dom';
import axios from 'axios'
function Signup() {
  const [message,setMessage]=useState('')
  const formik = useFormik({
    initialValues: {
      username:'',
      password:'',
      password2:'',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required'),
      password2: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async ({ username, password, email }) => {
      try {
        const response = await axios.post('http://localhost:3001/register', {
          username,
          password,
          email,
        });

        // Set message state based on response
        setMessage(response.data.message);
        if (response.data.message==="User registered successfully"){setTimeout(() => {
          window.location.href = '/RegSucc';
        }, 1000);}
        // Clear form values
        formik.resetForm();
      } catch (error) {
        setMessage(error.response.data.error || 'mail Already in use');
      }
    },
    
  });
  
  return (
    <div className='wrapper '>
      
    <div className='flex items-start justify-center bg-white  m-4 
     -py-1
     lg:flex-row
     xs:flex-col
    rounded-md
    border-4
    divv
    ' >
      <div className='w-[50%] h-full py-4 px-14 '>
      <>
        <h1 className='py-8 text-2xl tracking-wider font-semibold'>SignUp </h1>
         <form onSubmit={formik.handleSubmit} >
          
          <div className='flex flex-col px-12 gap-8 items-start'>
           
          <div className=' flex flex-col items-start'>
            <label htmlFor="email" >Username: </label>

            <div className=' flex items-center border-b py-2 '> 
              <FaRegUser className='mr-4' />
              <input
                id="username"
                name="username"
                type="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder='enter username...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-gray-50 ml-4 "

              />
              {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
              ) : null}
            </div> 
          
          </div>

          <div className=' flex flex-col items-start'>
            <label htmlFor="email" >Email Address : </label>

            <div className=' flex items-center border-b py-2 '> 
              <AiOutlineMail className='mr-4' />
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder='enter email...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-gray-50 ml-4 "

              />
              {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
              ) : null}
            </div> 
          
          </div>
          
          

          <div className=' flex flex-col items-start'>
            <label htmlFor="password">Password :</label>
          
            <div className=' flex items-center border-b py-2  '>
            <RiLockPasswordLine  className='mr-4'/>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder='enter password...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-gray-50 ml-4 focus:placeholder:opacity-8 "
              />
              {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            </div>

            </div>

            <div className=' flex flex-col items-start'>
            <label htmlFor="password"> Confirm Password :</label>
          
            <div className=' flex items-center border-b py-2  '>
            <RiLockPasswordLine  className='mr-4'/>
              <input
                id="password2"
                name="password2"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password2}
                placeholder='confirm password...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-gray-50 ml-4 focus:placeholder:opacity-8 "
              />
              {formik.touched.password2 && formik.errors.password2 ? (
              <div>{formik.errors.password2}</div>
            ) : null}
            </div>

            </div>

            
            <div className='flex gap-x-8 w-full  justify-between items-end'>

              <div >
                <Link to="/login" className='hover:underline '>Already have an account?</Link>
              </div>
              
            </div>
            
           
            <div className=''>
            <button className="btn" type='submit'>Signup</button>
          </div>
          <div className='border-white border-2'>{message && <p className='font-bold border-white py-2 animate-pulse'>{message}</p>}</div>
          </div> 
        </form>
    </>
      </div>
      <div className='w-1/2 h-full bg-black '>
        <img src={photo} alt="Description of the photo" className='h-[600px]' />
      </div>
    </div>
    </div>
  );
}

export default Signup;
