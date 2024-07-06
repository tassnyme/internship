import React from 'react';
import '../index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import photo from '../assets/photo.jpg'; 

function Login() {
  const formik = useFormik({
    initialValues: {
      password:'',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), 
        });

        if (email==='tassnymelaroussy@gmail.com' && password==="tasstass"){
          window.location.href = '/admin';
    
        }
        const data = await response.json();
        if (data.success) {
            window.location.href = data.redirect || '/user';
          } else {
            console.error('Login failed:', data.message || 'Unknown error'); 
          }
        } catch (error) {
          console.error('Login error:', error); 
      }
    },

  });
  return (
    <div className='wrapper '>
      
    <div className='flex items-center justify-center bg-white  m-12 
     -py-1
     lg:flex-row
     xs:flex-col
    rounded-md
    border-4
    divv
    ' >
      <div className='w-1/2 h-full py-8 px-8'>
      <>
        <h1 className='py-8 text-2xl tracking-wider font-semibold pb-20'>Login   User</h1>
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
                <Link to="/signup" className='hover:underline '>create account?</Link>
              </div>
              
            </div>
            
           
          <div className=''>
            <button className="btn">Login</button>
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
