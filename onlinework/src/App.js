import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import ListOfUsers from './components/ListOfUsers';
import TodoList from './components/TodoList';
 
function App() {



  
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>

          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:useId"r element={<UserProfile/>}  />
          <Route path="/admin/:useId"r element={<Admin/>}  />

          <Route path="/admin/settings" element={<UserProfile/>}></Route>
          <Route path="/admin/help" element={<UserProfile/>}></Route>
          <Route path="/admin/profile" element={<UserProfile/>}></Route>
          <Route path="/Header" element={<Header/>}/>
          <Route path ="/admin/users" element={<ListOfUsers/>}></Route>
          <Route path="/tasks" element={<TodoList />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}




export default App;
