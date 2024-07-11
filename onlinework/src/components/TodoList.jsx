import React, { useState  , useEffect} from 'react';
import axios from 'axios';
import '../index.css'
function TodoList() {
  const [arrayOfTasks, setArray] = useState([]);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tasks/list');
        setArray(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

 
 


  const addHandler = async (task) => {
    try {
      await axios.post('http://localhost:3001/tasks', {
        description: task,
      });
      console.log('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  


  

  

  return (
    <div className=' rounded-lg flex flex-col justify-start py-12 px-8 text-white bg-black gap-3'>
      
      <div >
        <h1 className='bg-violette py-3 text-center text-white font-bold tracking-wide text-2xl rounded-tr-lg rounded-tl-lg'>Tasks</h1>
      </div>
      
      <div  className='bg-yellowgreen rounded-br-lg rounded-bl-lg '>

   
       {arrayOfTasks && arrayOfTasks.map((items)=>{return(
        <div className="flex items-center  pt-4 gap-6" key={task._id} i> 
            <div className='flex  gap-2  items-center w-full  justify-start '>
                <div className='flex place-items-center '><input type="checkbox" className='checkbox:bg-green-400 w-6 h-6 place-items-center' /></div>           
                <div className=' border-b-2 border-white w-full flex items-center' >
                    <div className=' h-fit text-sm'>{items.description}</div>
                </div>
            </div>
        
            <div className='flex items-end'>
                <button className="button-30" role="button" >delete</button>
            </div>
      </div>
         
       )})}
      <div className={` flex  gap-4 py-4 `}>
        <div className='flex pt-3  items-center w-full bg-blue-400 justify-start '>

          <input
            type="text"
            placeholder="Add a task..."
            className={` bg-transparent focus:outline-none focus:placehoder:text-white pl-6 flex place-items-center border-b-2 border-white w-full`}
            onChange={(e)=>setTask(e.target.value)}
          />
          
        </div>
        <div className='flex items-end'>
            <button className=" button-30 px-8 h-40px" role="button" onClick={() => addHandler(task)}>Add</button>
        </div>
      </div>
      
    </div>
    </div>

  );
  
}

export default TodoList;

