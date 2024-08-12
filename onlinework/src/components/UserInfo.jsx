import React, { useState, useEffect } from 'react';
import styles from '../styles/UserInfo.module.css';
import Calendrier from './Calendrier';
import TodoList from './TodoList';
import Slides from './Slides';
import axios from 'axios';
import Progress from './Progress';
import { format, parseISO, isToday } from 'date-fns';
import { AiTwotoneMail } from "react-icons/ai";
import { PiGithubLogoDuotone } from "react-icons/pi";
import CircularProg from './CircularProg';
import { Link } from 'react-router-dom';
function UserInfo({ id }) {
  const [user, setUser] = useState(null);
  const [progressCompleted, setProgressCompleted] = useState(0);
  const [progressUncompleted, setProgressUncompleted] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const Id = id.useId; 
      console.log(Id, "id is");

      try {
        const response = await axios.get(`http://localhost:3001/getInfoAboutUser/${Id}`);
        const { data } = response;
        console.log("data", data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]); 

  let formattedDate = null;
  if (user) {
    const formatDate = (createdAt) => {
      return format(parseISO(createdAt), 'MMM dd, yyyy');
    };
  
    formattedDate = formatDate(user.createdAt);
    console.log(formattedDate); 
  }

  console.log("data", user);
  console.log(progressCompleted, 'progressCompleted');
  console.log(progressUncompleted, 'progressUncompleted');

  return (
    <div className='absolute'>
      <div className={styles.grid}>
        <div className={styles.name}>
          <h1>{user ? user.username : "Loading..."}</h1>
          <p>joined since {formattedDate}</p>
        </div>
        <div className={styles.github}>
  {user ? (
    <div className='flex flex-col w-[50%]  items-center justify-center'>
      <div className=' flex relative flex-row items-center '>
        <div className='absolute -ml-[24%] -mt-[16%]'><PiGithubLogoDuotone/></div>
        <div className=''><Link to={user.githubUrl} blank='target'>github Link</Link></div>
      </div>
      <div className=' flex relative flex-row items-center  '>
        <div className='absolute -ml-[24%] -mt-[16%]'><AiTwotoneMail/></div>
        <div className=''><Link to='https://mail.google.com/mail/u/0/?login#inbox?compose=new'>{user.email}</Link></div>
      </div>
    </div>
  ) : (
    "Loading..."
  )}
</div>

        <div className={styles.email}>Working on project "hdbchbdchb"</div>
        <div className={styles.tasks}>
          <TodoList 
          id1={id.useId}
          onProgressChange={(progress) => {
            setProgressCompleted(progress);
            setProgressUncompleted(100 - progress);
          }}
          /></div>
        <div className={styles.progress}>
          
            <div className={styles.completed} >
              <div>completed</div>
              <div><CircularProg prog={progressCompleted} /></div>
            </div>
            <div className={styles.uncompleted}>
              <div>uncompleted</div>
              <div ><CircularProg prog={progressUncompleted} /></div>
            
          </div>
        </div>
        <div className={styles.calendar}><Calendrier id1={id.useId} /></div>
        
        <div className={styles.slide}>
          <div className={styles.progBar}>
            <Progress prog={progressCompleted} />
          </div>
          
          <div className={styles.perWeekSlide}>
          <Slides id1={id.useId}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
