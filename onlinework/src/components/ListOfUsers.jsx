import React from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
function ListOfUsers() {
    const [data, setData] = useState([]);

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
    <div>
      <Table striped bordered hover variant="light">
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
                return <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                </tr>})
        }
        
      </tbody>
    </Table>
    </div>
  )
}

export default ListOfUsers
