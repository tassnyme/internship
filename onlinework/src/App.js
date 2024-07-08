import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Reg from './components/Reg';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import ListOfUsers from './components/ListOfUsers';

 
function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegSucc" element={<Reg />} />
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route path="user" element={<UserProfile/>}></Route>
          <Route path="/admin/users" element={<UserProfile/>}></Route>
          <Route path="/admin/settings" element={<UserProfile/>}></Route>
          <Route path="/admin/help" element={<UserProfile/>}></Route>
          <Route path="/admin/profile" element={<UserProfile/>}></Route>
          <Route path="/Header" element={<Header/>}/>
          <Route path ="/admin/list" element={<ListOfUsers/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
