import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const { email, setEmail } = useState('');
    const { username, SetUserName } = useState('');
    const { pass, SetPass } = useState('');
    const navigate = useNavigate();

    // const sumbitted = () => {
    //     e.preventDefault()
    // }

    const BASE_URL = "http:/localhost:4000"



    
        const handleLogIn = async () => {
      
            try {
              const response = await fetch(`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'superman27',
                    password: 'krypt0n0rbust'
                })
              });
              const result = await response.json();
              console.log(result);
              navigate('/user')
              return result
              
            } catch (err) {
              console.error(err);
            }
        }
        handleLogIn()
    

    return(
        <div className='auth-container'>
            <h2>Login</h2>
        <form className='login-form'>
            <label htmlFor='email'>Email</label>
            <input value={email} type="email" placeholder="example@gmail.com" id='email' name='email'></input>
            <label htmlFor='username'>Username</label>
            <input value={username} type="username" placeholder='Username' id='username' name='username'></input>
            <label htmlFor='password'>Password</label>
            <input value={pass} type="password" placeholder="*******" id='password' name='password'></input>
            <button type='submit' onClick={handleLogIn}>Log in</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch("Login")}>Oops! Don't have an account? Register Now!</button>
        </div>
    )
}

