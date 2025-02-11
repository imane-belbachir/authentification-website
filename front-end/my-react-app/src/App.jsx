import React, { useState } from 'react';
import './App.css'
import LoginRegister from './LoginRegister/LoginRegister.jsx'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import ResetPassword from './LoginRegister/ResetPassword.jsx'
import Home from './LoginRegister/Home.jsx'
import Questions from './LoginRegister/Questions.jsx'
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
     <Routes>
    <Route path="/" element={<LoginRegister setUser={setUser}/>} />
    <Route path="/resetpassword/:token" element={<ResetPassword />} />
    <Route path="/Home" element={<Home user={user}/>} />
    <Route path="/questions/:category" element={<Questions />} />
  </Routes>
  </BrowserRouter>
   
  );
};

export default App
