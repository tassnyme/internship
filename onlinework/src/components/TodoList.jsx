import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { IoIosCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function TodoList({ id1, onProgressChange }) {
  const [array, setArray] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/display/${id1}`);
        setArray(response.data);
        console.log(response.data, "heyyyyyyyyyyyyyyy in todo");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [array]);

  const addHandler = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/add/${id1}`, {
        description: task,
      });
      console.log('Task added successfully!', response.data);
      setArray((prevArray) => [...prevArray, response.data]);
      setTask(''); 
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
        setArray((prevArray) => prevArray.filter(task => task._id !== updatedValues.split(',')[1]));
      } else {
        console.log('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const concatFunction = (taskk) => {
    const updatedValues = `${id1},${taskk}`;
    handleDeleteTask(updatedValues);
  };

  const checkHandler = async (newValue) => {
    try {
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
      setArray((prevArray) => prevArray.map(item => item._id === newValue.split(',')[1] ? { ...item, completed: !item.completed } : item));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const completedTasks = array.filter(task => task.completed).length;
  const totalTasks = array.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
console.log(completedTasks,"completedTasks",totalTasks,"totalTasks",progress,"progress")
  useEffect(() => {
    if (totalTasks > 0) {
      onProgressChange(progress);
    }
  }, [completedTasks, totalTasks, onProgressChange, progress]);

  return (
    <div className='flex flex-col justify-start  px-8 gap-3  border-2 text-whiteBlue w-[100%] h-[35vh] overflow-hidden bg-whitegreen'>
      <div>
        <h1 className=' py-2 text-center text-pistache font-bold tracking-wide text-xl rounded-tr-lg rounded-tl-lg'>Tasks</h1>
      </div>

      <div className={`flex justify-around border-green border-b-1 bg-white`}>
        <div className='flex items-center w-full justify-start'>
          <input
            type="text"
            placeholder="Click to add tasks..."
            className='bg-transparent focus:outline-none pl-6 w-full placeholder:text-whiteGrey animate-pulse '
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </div>
        <div className='flex items-end absolute left-[90%]'>
          <button className="px-8" role="button" onClick={addHandler}>
            <IoMdAdd className='text-whiteGrey' size={24} />
          </button>
        </div>
      </div>

      <div className='rounded-br-lg rounded-bl-lg px-8 overflow-y-scroll overflow-hidden bg-whitegreen h-full'>
        {array && array.map((item) => (
          <div className="flex items-center pt-4 gap-6 relative" key={item._id}>
            <div className="flex gap-2 items-center w-full justify-start relative">
              {item.completed ? (
                <div className="flex place-items-center absolute top-[4%]">
                  <IoIosCheckmark   size={24} />
                </div>
              ) : (
                <div className="flex place-items-center absolute top-[4%]">
                  <RxCross2 />
                </div>
              )}

              <div className="border-b-2 border-green w-full flex items-center pl-[5%]">
                <div className="h-fit text-md">{item.description}</div>
              </div>
            </div>

            <div className="flex items-end pt-2 absolute left-[100%]">
              <button role="button" onClick={() => concatFunction(item._id)}>
               <div className='absolute '><RiDeleteBinLine size={16}/></div> 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
