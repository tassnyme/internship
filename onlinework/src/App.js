import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';
import ListOfUsers from './components/ListOfUsers';
import UserTasks from './components/UserTasks';
import Cal from './components/Cal';
import AdminCHECK from './components/AdminCHECK';
import History from './components/History';
// import { ChatContextProvider } from './context/ChatContext';
import Chat from './pages/Chat';
import Calendrier from './components/Calendrier';
import TodoList from './components/TodoList';
import UserInfo from './components/UserInfo';
import Progress from './components/Progress';
import CircularProg from './components/CircularProg';


function App() {



  
  return (
    <div className="App"> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:useId" element={<UserProfile/>}  />
          <Route path="/user/profile/:useId" element={<UserProfile/>}  />
          <Route path="/user/tasks/:useId" element={<UserTasks/>}  />
          <Route path="/user/messages/:useId" element={<Chat/>}  />
          <Route path="/admin/messages/:useId" element={<Chat/>}  />

          <Route path="/user/meets/:useId" element={<Cal/>}  />
          <Route path ="/admin/users/:useId" element={<ListOfUsers/>}></Route>
          <Route path="/admin/meets/:useId" element={<AdminCHECK/>}  />
          <Route path="/admin/profile/:useId" element={<Admin/>}  />
          <Route path="/admin/history/:useId" element={<History/>}  />
          <Route path="/admin/settings" element={<UserProfile/>}></Route>
          <Route path="/admin/help" element={<UserProfile/>}></Route>
          <Route path="/admin/profile" element={<UserProfile/>}></Route>
          <Route path="/chat" element={<Chat />} />
          <Route  path='*' element={<Navigate to="/" />} />

          <Route path="/cercle" element={<CircularProg></CircularProg>}></Route>















          <Route path='/progress'  element={<Progress></Progress>}></Route>

          <Route  path ="/calendrier"  element={<Calendrier></Calendrier>}></Route>
          <Route  path ="/TodoList"  element={<TodoList></TodoList>}></Route>
          <Route  path ="/UserInfo"  element={<UserInfo></UserInfo>}></Route>


        </Routes>
    </div>
  );
}




export default App;
