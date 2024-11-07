
import styles from '../styles/SignAndLog.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import photo from '../assets/photo.jpg'; 
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

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
          
          navigate(`/user/profile/${data.userId.id}`, { state: {defaultId : data.defaultId ,  userId: data.userId, name:data.name , admin:false } });

        } else if (data.success && data.admin) {
          console.log('Login successful as admin');
          navigate(`/admin/profile/${data.userId.id}`, { state: {defaultId : data.defaultId ,  userId: data.userId, name:data.name , admin:true} });
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
      <div className='w-[50%] h-[700px] py-32  px-14 text-pistache'>
      <>
        <h1 className='py-8 pb-16 text-3xl text-center tracking-wider font-semibold'>Login User </h1>
         <form onSubmit={formik.handleSubmit} >
          
          <div className='flex flex-col px-12 gap-8 items-start'>
           
          <div className=' flex flex-col items-start'>
            <label htmlFor="email" >Username: </label>

            <div className=' flex items-center border-b py-2 border-whiteGrey '> 
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

                value={formik.values.email}
                placeholder='enter email...'
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
                <Link to="/register" className='hover:underline text-pistache no-underline'>Create account?</Link>
              </div>
              
            </div>
            
           
            <div className=''>
            <button className={styles.btn} type='submit'>login</button>
          </div>
{errorMessage && <p className='font-bold  animate-pulse'>{errorMessage}</p>}
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

export default Login;
