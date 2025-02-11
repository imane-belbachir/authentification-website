import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import axios from 'axios'
import './LoginRegister.css'
function ResetPassword() {
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const { token } = useParams();
  const hundleresetpassword = async(e) => {
    e.preventDefault();
    if(password != confirmPassword){alert("password wrong");}
    const userpsswrd = {
      password: password
    }
    try {
      const res = await axios.post(`http://localhost:5000/users/resetpassword/${token}`,userpsswrd,{
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(res.data);
    alert("password reset seccesfully");  
  } catch(error){
    console.log(error);
        alert(error.response.data);
    }


  }
  return (
    <div className="wrapper"> 
    <div className='form-box login'>
     <form action=""> 
         <h1>Reset password</h1>
         <div className='input-box'>
             <input type="password" name="password" placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} required/>
             <FaLock className='icon'/>
         </div>

         <div className='input-box'>
             <input type="password" name="password" placeholder='confirm password'  value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} required/>
             <FaLock className='icon'/>
         </div>
        
         <button type='submit' onClick={hundleresetpassword}>Confirm</button>
     </form>
    </div>
    </div>
  )
}

export default ResetPassword