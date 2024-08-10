import React , {useState , useEffect} from 'react'
import styles from '../styles/UserInfo.module.css'
import Calendrier from './Calendrier'
import TodoList from './TodoList'
import Slides from './Slides'
import axios from 'axios'
import Progress from './Progress'
function UserInfo({id}) {
  console.log(id,"idddddddddddddd")
const [data , setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
        const Id = id.useId
        console.log(Id,"id isttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")

        try {
            const response = await axios.get(`http://localhost:3001/getInfoAboutUser/${Id}`);
            const { data } = response;
            console.log("data", data);
            await setData(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);


console.log("data isssss", data)
  return (
    <div className='absolute   '>
      

      <div className={styles.grid}>
        <div className={styles.name}>
          <h1></h1>
          <p>joined since datee</p>
        </div>
        <div className={styles.github}></div>
        <div className={styles.email}></div>
        <div className={styles.tasks}><TodoList id1={id.useId} /></div>
        <div className={styles.progress}>
          
          <div className='flex justify-around '>
            <div>completed</div>
            <div>uncompleted</div>
          </div>
          
         
          
           </div>
        <div className={styles.calendar}> <Calendrier id1={id.useId} /> </div>
        <div className={styles.slide}>  <div><Progress></Progress></div> <Slides id1={id.useId}/> </div>

        

      </div>



    </div>
  )
}

export default UserInfo
