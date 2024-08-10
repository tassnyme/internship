import React from 'react'
import styles from '../styles/Progress.module.css'
function CircularProg() {
  return (
    <div>
      <div className={styles.skill}>
        <div className={styles.outer}>
            <div className={styles.inner}>
                <div id="number">
                    65%
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CircularProg
