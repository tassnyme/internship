import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

function TodoList({ id1 }) {
  const [array, setArray] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/display/${id1}`);
        setArray(response.data);
        console.log(response.data,"heyyyyyyyyyyyyyyy in todo");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id1]);

  const addHandler = async () => {
    try {
      await axios.post(`http://localhost:3001/add/${id1}`, {
        description: task,
      });
      console.log('Task added successfully!');
      window.location.reload();
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
        window.location.reload();
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
      window.location.reload();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

 

  return (
    <div className='flex flex-col justify-start py-[3%] px-8 gap-3 bg-blueDark border-2 text-whiteBlue w-[100%] h-[100%]'>
      <div>
        <h1 className='bg-blueDark py-2 text-center text-whiteBlue font-bold tracking-wide text-xl rounded-tr-lg rounded-tl-lg'>Tasks</h1>
      </div>

      <div className={`flex gap-4 border-green border-b-1`}>
        <div className='flex items-center w-full justify-start'>
          <input
            type="text"
            placeholder="Click to add tasks..."
            className='bg-transparent focus:outline-none pl-6 w-full placeholder:text-whiteGrey animate-pulse'
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </div>
        <div className='flex items-end'>
          <button className="px-8" role="button" onClick={addHandler}>
            <IoMdAdd className='text-whiteGrey' />
          </button>
        </div>
      </div>

      <div className='rounded-br-lg rounded-bl-lg px-8 overflow-y-scroll'>
      {array && array.map((item) => (
  <div className="flex items-center pt-4 gap-6" key={item._id}>
    <div className="flex gap-2 items-center w-full justify-start">
      {/* Conditional rendering of checkmark or cross icon */}
      {item.completed ? (
        <div className="flex place-items-center">
          <FaCheck />
        </div>
      ) : (
        <div className="flex place-items-center">
          <RxCross2 />
        </div>
      )}

      <div className="border-b-2 border-green w-full flex items-center pb-2">
        <div className="h-fit text-sm">{item.description}</div>
      </div>
    </div>

    <div className="flex items-end pt-2">
      <button
        role="button"
        onClick={() => concatFunction(item._id)} // Assuming concatFunction handles deletion
      >
        <RiDeleteBinLine />
      </button>
    </div>
  </div>
))}

      </div>
    </div>
  );
}

export default TodoList;
