import React, { useState, useEffect } from 'react';
import styles from '../styles/Progress.module.css'
function Progress() {

  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Gradually update the width
    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth < 200) {
          return prevWidth + 2; // Increase the width by 2px
        } else {
          clearInterval(interval);
          return 200;
        }
      });
    }, 20); // Update every 20ms

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);
  return (
    <div>
      <div className='flex items-center justify-center gap-[4%]'>
        <div className='relative bg-black w-full rounded-full h-[20px] overflow-hidden '>
        <div className={styles.expanding} style={{ width: `${width}px` }} />        </div>

        <p className='text-white text-sm'>{width}px</p>

      </div>
    </div>
  )
}

export default Progress
