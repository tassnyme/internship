import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Reg from './components/Reg';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';

 
function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegSucc" element={<Reg />} />
          <Route path="/Admin" element={<Admin></Admin>}></Route>
          <Route path="User" element={<UserProfile/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
