import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/Bar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <div>
    <div className={styles.header}>
        
        <div className='flex  w-2/3 justify-center items-center text-center '>
         <div className='w-full '>
            <input type="search" placeholder='Search ...' className='bg-white rounded-xl px-4 py-2 focus:border-none w-4/5' />
         </div>
         <div>           
             <button type='submit' className="border-2 py-2 rounded-xl px-4 ">submit</button>
         </div>
        </div>
        
        <div className='flex gap-4 items-center w-1/3  justify-end'>
        <div className=' text-wide w-3/2 '>
          Tassnyme laroussy
        </div>
        <div className='w-1/3'>
        <Dropdown data-bs-theme="ligth">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="light">
          
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" active>Tassnyme laroussy</Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item href="#/action-2">settings & privacy</Dropdown.Item>
          <Dropdown.Item href="#/action-3">display & accessibility</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Give feedback</Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item href="#/action-4">Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
        </div>
        </div>
        </div>
    </div>
  );
}

export default Header;