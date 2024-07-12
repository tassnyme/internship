import React, { useState  , useEffect} from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import bgg from '../assets/bg.jpg'
import axios from 'axios';
import '../index.css'
function TodoList({id}) {
  const [arrayOfTasks, setArray] = useState([]);
  const [task, setTask] = useState('');
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/display/${id}`);
        setArray(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

   const addHandler = async (task) => {
    try {

      await axios.post(`http://localhost:3001/add/${id}`, {
        description: task,
      });
      console.log('Task added successfully!');
      window.location.reload(); // Or redirect to another route using window.location.href

    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const handleDeleteTask = async (updatedValues) => {
    try {
      
      const response = await fetch(`http://localhost:3001/delete/${updatedValues}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Task deleted successfully');
        window.location.reload(); // Or use other methods to refresh the list
      } else {
        console.log('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };
  

  const concatFunction = (taskk) =>{
    const updatedValues = `${id},${taskk}`;

    handleDeleteTask(updatedValues)

  }


  const checkFunction = (taskk) =>{
    const newValue = `${id},${taskk}`;
    checkHandler(newValue)

  }

  const checkHandler = async (newValue) => {
    try {
      console.log(newValue,"neeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      const response = await fetch(`http://localhost:3001/check/${newValue}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
  
      const data = await response.json();
      console.log('Task status updated successfully:', data);
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
<div
      className='rounded-lg flex flex-col justify-start py-12 px-8 text-green gap-3 bg-white border-2 border-green'
      // style={{
      //   backgroundImage: `url(${bgg})`, 
      //   backgroundSize: 'cover', 
      //   backgroundPosition: 'center', 
      // }}
    >      
      <div >
        <h1 className='bg-green py-3 text-center text-white font-bold tracking-wide text-2xl rounded-tr-lg rounded-tl-lg'>Tasks</h1>
      </div>
      
      <div  className='  rounded-br-lg rounded-bl-lg py-4 px-8 '>

   
       {arrayOfTasks && arrayOfTasks.map((items)=>{return(
        <div className="flex items-center  pt-4 gap-6" key={items._id} i> 
            <div className='flex  gap-2  items-center w-full  justify-start '>
                <div className='flex place-items-center '>{items.completed===false ? 
                  <input type="checkbox" className='checkbox:bg-green-400 w-5 h-5 place-items-center border-2 border-green'  onClick={()=>checkFunction(items._id)} /> 
                  :<FaCheck />}</div>           
                <div className=' border-b-2 border-green w-full flex items-center' >
                    <div className=' h-fit text-sm'>{items.description}</div>
                    {console.log('type',typeof(items._id))}

                </div>
            </div>
        
            <div className='flex items-end pt-2'>
                <button  role="button" onClick={()=>concatFunction(items._id)} ><RiDeleteBinLine /></button>
            </div>
      </div>
         
       )})}
      <div className={` flex  gap-4 pt-4 border-green border-b-2 pb-2`}>

        <div className='flex pt-3  items-center w-full  justify-start '>

          <input
            type="text"
            placeholder="Add a task..."
            className={` bg-transparent focus:outline-none focus:placehoder:text-white pl-6 flex place-items-center  w-full placeholder:text-green focus:animate-pulse`}
            onChange={(e)=>setTask(e.target.value)}
          />
          
        </div>
        <div className='flex items-end'>
            <button className=" px-8 h-40px" role="button" onClick={() => addHandler(task)}><IoMdAdd />
            </button>
        </div>
      </div>
      
    </div>
    </div>

  );
  
}

export default TodoList;

