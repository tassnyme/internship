import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{ useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from '../styles/Bar.module.css'
import { FaRegUser , FaRegBell } from "react-icons/fa";
import { FiSettings , FiVideo} from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import axios from 'axios';
import Sidebar from './Sidebar';
function ListOfUsers() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { state } = location;
    const {name,userId,admin}=state
    const {username}=name  
    const {id}=userId
    console.log(admin)
    console.log(state)
    const sideBar = [
      { name: 'profile', Icon:FaRegUser },
      { name: 'Users', Icon: MdOutlineFormatListBulleted   },
      { name: 'meets', Icon: FiVideo   },
      { name: "history" , Icon:FaRegBell},
      { name: 'messages', Icon: FiSettings },
      { name: 'help', Icon: IoMdHelp },
    ]; 
    const table =  {
      backgroundColor: '#181E36', // Light background color
      color: '#12acd6', // Dark text color
    } 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/admin/list');
          setData(response.data);
          console.log('data is ', response.data); // Log the fetched data       
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div className={styles.backgr}>
    <div className={styles.grid}>
    <div className={styles.sidd}>    <Sidebar arr={sideBar} state={state}  /></div>

    <div className={styles.liss}>
      <Table striped bordered hover style={table} >
      <thead>
        <tr>
            <th>Id</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((item,index) => {
                return  <tr key={item.uuid}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td> <Link to={`/admin/meets/${item.uuid}`} state={state} id={item.uuid} >
          See Calendar of Meets
        </Link> </td>
                </tr>})
        }
        
      </tbody>
    </Table>
    </div> </div> </div>
  )
}

export default ListOfUsers
