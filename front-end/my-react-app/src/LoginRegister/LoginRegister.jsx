import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginRegister = ({ setUser }) => {
    const [action, setAction] = useState('');
    const [action2, setAction2] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();         

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            if (token) {
                const decoded = jwtDecode(token);
                setname(decoded.name);
                setemail(decoded.password);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setShowChangePassword(true);
        setAction2(' active2 ');
    };

    const registerLink = () => {
        setAction(' active ');
    };

    const loginLink = () => {
        setAction('');
    };


    const hundlesignup = async (e) => { 
        e.preventDefault();
        const user = { name, email, password };
        try {
            const res = await axios.post('http://localhost:5000/users/signup', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('User created successfully');
            setUser(res.data); // Set the user data
            navigate('/Home'); // Navigate to the Home page
        } catch (error) {
            console.error(error);
            alert(error.response.data);
        }
    };
    

    const hundlelogin = async (e) => {
        e.preventDefault();
        const user = {
            name,
            password
        };
        try {
            const res = await axios.post('http://localhost:5000/users/login', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res.data);
            setUser(res.data); // Set the user data
            alert("Logged in successfully");
            navigate("/Home"); // Navigate to the Home page
        } catch (error) {
            console.error(error);
            alert(error.response.data);
        }
    };
    

    const hundlesendemail = async (e) => {
        e.preventDefault();
        const user = {
            email
        };
        try {
            const res = await axios.post('http://localhost:5000/chakib/forgetpassword', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
            alert(error.response.data);
        }
    };

    return (
        <div className="App">
            {!showChangePassword ? (
                <div className={`wrapper${action}`}>
                    <div className='form-box login'>
                        <form>
                            <h1>Login</h1>
                            <div className='input-box'>
                                <input type="text" name="username" placeholder="Username" value={name} onChange={(e) => setname(e.target.value)} required />
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type="password" name="password" placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} required />
                                <FaLock className='icon' />
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" />Remember me</label>
                                <a href="#" onClick={handleForgotPassword}>Forgot password</a>
                            </div>
                            <button type='submit' onClick={hundlelogin}>Login</button>
                            <div className="register-link">
                                <p> Don't have an account?<a href="#" onClick={registerLink}>Register</a></p>
                            </div>
                        </form>
                    </div>
                    <div className='form-box register'>
                        <form>
                            <h1>Registration</h1>
                            <div className='input-box'>
                                <input type="text" name="username" placeholder="Username" value={name} onChange={(e) => setname(e.target.value)} required />
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
                                <FaEnvelope className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type="password" name="password" placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} required />
                                <FaLock className='icon' />
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" />I agree to the terms and conditions</label>
                            </div>
                            <button type='submit' onClick={hundlesignup}>Sign Up</button>
                           
                            <div className="register-link">
                                <p> I have an account?<a href="#" onClick={loginLink}>Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className={`wrapper${action2}`}>
                    <div className="form-box change-password">
                        <form>
                            <h1>Change Password</h1>
                            <div className='input-box'>
                                <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setemail(e.target.value)} required />
                                <FaUser className='icon' />
                            </div>
                            <button type='submit' onClick={hundlesendemail}>Send email</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginRegister;
