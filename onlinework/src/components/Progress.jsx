import React, { useState, useEffect } from 'react';
import styles from '../styles/Progress.module.css';

function Progress({ prog }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth < prog) {
          return Math.min(prevWidth + 1, prog); 
        } else {
          clearInterval(interval);
          return prevWidth;
        }
      });
    }, 40); 

    return () => clearInterval(interval); 
  }, [prog]);
  const roundedWidth = Math.round(width);

  return (
    <div className='flex flex-col items-center justify-center gap-[1.5vh]'>
      <div>
        <h1>Project Progress</h1>
      </div>
      <div className='flex w-full justify-between gap-[4%]'>
        <div className={`flex bg-white w-full rounded-md overflow-hidden  ${styles.bar}`}>
          <div 
            className={`${styles.expanding} `} 
            style={{ width: `${width}%` }} 
          >
          </div>
        </div>
        <p className='text-black text-sm'>{roundedWidth}%</p>
      </div>
    </div>
  );
}

export default Progress;
