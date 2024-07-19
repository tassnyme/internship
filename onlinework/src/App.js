import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import ListOfUsers from './components/ListOfUsers';
import UserTasks from './components/UserTasks';
import Cal from './components/Cal';
import AdminCHECK from './components/AdminCHECK';
import History from './components/History';
import Slides from './components/Slides';
 
function App() {



  
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:useId" element={<UserProfile/>}  />
          <Route path="/user/profile/:useId" element={<UserProfile/>}  />
          <Route path="/user/tasks/:useId" element={<UserTasks/>}  />
          <Route path="/user/meets/:useId" element={<Cal/>}  />
          <Route path ="/admin/users/:useId" element={<ListOfUsers/>}></Route>
          <Route path="/admin/meets/:useId" element={<AdminCHECK/>}  />
          <Route path="/admin/profile/:useId" element={<Admin/>}  />
          <Route path="/admin/history/:useId" element={<History/>}  />
          <Route path="/admin/settings" element={<UserProfile/>}></Route>
          <Route path="/admin/help" element={<UserProfile/>}></Route>
          <Route path="/admin/profile" element={<UserProfile/>}></Route>
          <Route path="/Header" element={<Header/>}/>
 
        </Routes>
      </BrowserRouter>
    </div>
  );
}




export default App;
