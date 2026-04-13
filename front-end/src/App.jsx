import { useEffect, useState } from 'react'
import { Routes,Route, Navigate} from 'react-router-dom'
import { SignupPage } from './pages/auth/signup/SignupPage'
import {LoginPage} from './pages/auth/login/LoginPage';
import { HomePage } from './pages/Home/HomePage';
import { authStore } from './store/authStotre';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { SideBar } from './components/common/SideBar';
import { Alumin } from './pages/Alumin/Alumin';
import {Message} from './pages/Message/Message';
import {Campus} from './pages/Campus/Campus';
import { campusStore } from './store/campuStore';
import { messageStore } from './store/messageStore';
import { Header } from './components/common/Header';
import { CreateAlumin } from './pages/Alumin/CreateAlumin';
import Oldalumin from './pages/Alumin/Oldalumin';
import { ProfileAlumin } from './pages/Alumin/ProfileAlumin';
import { RegisterForm } from './pages/Campus/RegisterForm';

function App() {
  const {
    userAuth,
    check,
    isCheking,
    logout,
    onlineUsers,
    socket
  } = authStore();
   
  const {
    selectedUser,
    Friends,
    myFriends,
    setSelectedUser,
    theme
   } = campusStore();

    const {
      messages,
      createMessage
    } = messageStore();

    const [sidebarWidth, setSidebarWidth] = useState(300);

  useEffect(()=>{
      check();
    },[check]);

    useEffect(()=>{
      myFriends();
    },[userAuth,myFriends]);

    
useEffect(()=>{

  if(!userAuth) return;

  socket.on("OnlineUsers",(online)=>{
    authStore.setState(()=>({
      onlineUsers:online
    }))
  })

  socket.on("newMessage", (newMessage) => {
  messageStore.setState((state) => ({
    messages: [...state.messages, newMessage]
  }));
});


  return ()=>{
    socket.off("OnlineUsers"),
    socket.off("newMessage")
  }
},[userAuth,socket]);



    

    if(isCheking){
      return <div className='min-h-screen w-full bg-black/85 flex items-center justify-center'>
          <Loader className="size-10 animate-spin text-white" />
      </div>
    }
    


  
  

  return (
    <>
      <div className='w-full min-h-screen transition-all ' data-theme={theme}>
        {userAuth && 
         <SideBar 
         userAuth={userAuth} 
         logout={logout}
         sidebarWidth={sidebarWidth}
         setSidebarWidth={setSidebarWidth}
         />}
         <div
            className="relative p-3 transition-all duration-300"
            style={{
              marginLeft: `${sidebarWidth}px`,
              width: `calc(100% - ${sidebarWidth ?? 80}px)`
            }}
          >
            {userAuth && <Header />}
          <Routes>
            <Route path='/' element={userAuth ? <HomePage user={userAuth} /> : <Navigate to={'/login'} />} />
            <Route path='/login' element={!userAuth ? <LoginPage /> : <Navigate to={'/'} />} />
            <Route path='/campus' element={userAuth ? <Campus user={userAuth} /> : <Navigate to={'/login'} />} />
            <Route path='/message' element={userAuth ? <Message userAuth={userAuth} createMessage={createMessage} setSelectedUser={setSelectedUser} onlineUsers={onlineUsers} Friends={Friends} selectedUser={selectedUser} /> : <Navigate to={'/login'} />} />
            <Route path='/alumin' element={userAuth ? <Alumin /> : <Navigate to={'/login'} />} />
            <Route path='/createAlumin' element={userAuth ? <CreateAlumin /> : <Navigate to={'/login'} />} />
            <Route path='/oldAlumin' element={userAuth ? <Oldalumin /> : <Navigate to="/login" />} />
            <Route path='/createUser' element={userAuth && userAuth.email === "alphonse@gmail.com" ? <RegisterForm /> : <Navigate to={'/login'} />} />
            <Route path='/alumin/profile/:id' element={userAuth ?  <ProfileAlumin /> : <Navigate to='/login' />} />
          </Routes>
         </div>
        <Toaster />
      </div>
    </>
  )
}

export default App
