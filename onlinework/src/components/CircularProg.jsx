import React, { useState, useEffect } from 'react';
import styles from '../styles/Progress.module.css';

function CircularProg({ prog }) {
    const roundedNumber = Math.round(prog);
    const [width, setWidth] = useState(0);
console.log(prog,"proooog")
    useEffect(() => {
        const interval = setInterval(() => {
            setWidth((prevWidth) => {
                if (prevWidth < roundedNumber) {
                    return Math.min(prevWidth + 1, roundedNumber); 
                } else {
                    clearInterval(interval);
                    return prevWidth
                }
            });
        }, 30); 

        return () => clearInterval(interval);
    }, [roundedNumber]); 
console.log(roundedNumber,"roundedddd")
console.log(width,"widhhhhh")

    return (
        <div >
            <div className={styles.skill} >
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div id="number">
                        {width}%
                        </div>
                    </div>
                </div>
                <div className={styles.container} style={{ '--progress-percentage': `${width}` }} >
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                    <defs>
                        <linearGradient id="GradientColor">
                            <stop offset="0%" stopColor="#FF69B4"/>
                            <stop offset="100%" stopColor="#FF69B4"/>
                        </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" strokeLinecap="round" strokeWidth="10" fill="none" stroke="url(#GradientColor)"   />
                </svg>
                </div>
                
            </div>
        </div>
    );
}

export default CircularProg;
