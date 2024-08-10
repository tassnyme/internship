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

function UserInfo({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const Id = id.useId;
      console.log(Id, "id isttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");

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
  let formattedDate = null
  if (user) {
    const formatDate = (createdAt) => {
      return format(parseISO(createdAt), 'MMM dd, yyyy ');
    };
  
     formattedDate = formatDate(user.createdAt);
    console.log(formattedDate); // This will print the formatted date
  }
  
  console.log("data isssss", user);
  
  return (
    <div className='absolute'>
      <div className={styles.grid}>
        <div className={styles.name}>
          <h1>{user ? user.username : "Loading..."}</h1>
          <p>joined since {formattedDate}</p>
        </div>
        <div className={styles.github}>
  {user ? (
    <>
      <div className='flex items-center justify-center gap-2'>
        <div><PiGithubLogoDuotone /></div>
        <div> <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="link-btn">GitHub Link </a></div>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <div><AiTwotoneMail /></div>
        <div><a href={`mailto:${user.email}`} className="link-btn"> Email Link</a></div>
      </div>
    </>
  ) : (
    "Loading..."
  )}
</div>

        <div className={styles.email}>Working on project "hdbchbdchb"</div>
        <div className={styles.tasks}><TodoList id1={id.useId} /></div>
        <div className={styles.progress}>
          <div className='flex justify-around'>
            <div>completed</div>
            <div>uncompleted</div>
          </div>
        </div>
        <div className={styles.calendar}><Calendrier id1={id.useId} /></div>
        <div className={styles.slide}>
          <div className='px-[2%] mb-[3%] text-white text-xl'><h1>project progress</h1></div>
          <div><Progress /></div>
          <div><Slides id1={id.useId} /></div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
