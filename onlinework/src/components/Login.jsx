import styles from '../styles/SignAndLog.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import photo from '../assets/photo.jpg'; 
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import bgg from '../assets/bg.jpg'

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  const formik = useFormik({
    initialValues: {
      password:'',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    
    onSubmit: async (values) => {
      try {
        console.log(values)
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        
        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        if (data.success && !data.admin) {
          console.log('Login successful as user');
          
          navigate(`/user/${data.userId.Id}`, { state: { userId: data.userId, name:data.name , admin:false } });

        } else if (data.success && data.admin) {
          console.log('Login successful as admin');
          navigate(`/admin/${data.userId.Id}`, { state: { userId: data.userId, name:data.name , admin:true} });
        } else if (data.message === 'Invalid credentials') {
          setErrorMessage('Email or password incorrect');
        } else {
          setErrorMessage(data.error || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });
  return (
    <div className={styles.wrapper}>
      
    <div className='flex items-center justify-center  m-12 
     -py-1
     lg:flex-row
     xs:flex-col
    rounded-md
    border-4
    bg-green
    
    ' >
      <div className={styles.divv}>
      <>
        <h1 className='py-8 text-center text-2xl tracking-wider font-semibold pb-20'>Login User</h1>
        <form onSubmit={formik.handleSubmit} >
          
          <div className='flex flex-col pb-16 px-12 gap-8 items-start'>
           
          <div className=' flex flex-col items-start'>
            <label htmlFor="email" >Email Address : </label>

            <div className=' flex items-center border-b py-2 '> 
              <AiOutlineMail className='mr-4' />
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

                value={formik.values.email}
                placeholder='enter email...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-white ml-4 "

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
                onBlur={formik.handleBlur}

                value={formik.values.password}
                placeholder='enter password...'
                className="border-none outline-none bg-transparent focus:border-blue-500 placeholder-white ml-4 focus:placeholder:opacity-8 "
              />
              {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            </div>

            </div>

            
            <div className='flex gap-x-8 w-full  justify-between'>
              
              <div >
                <input type="checkbox" />
                <label htmlFor="">Remember me!</label>
              </div>

              <div >
                <Link to="/register" className='hover:underline text-white no-underline' >create account?</Link>
              </div>
              
            </div>
            
           
          <div className=''>
            <button className={styles.btn} type='submit'>Login</button>
          </div>
          <div>
            {errorMessage &&<p className='font-bold  animate-pulse'>{errorMessage}</p>}
          </div>
        
        </div> 
        </form>
    </>
      </div>
      <div className='w-1/2 h-full '>
        <img src={photo} alt="Description of the photo" className='h-[600px]'/>

      </div>
    </div>
    </div>
  );
}

export default Login;
