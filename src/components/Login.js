import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [ showLoginButton, setShowLoginButton ] = useState(false)
    const { username, SetUserName } = useState('');
    const { pass, SetPass } = useState('');
    const navigate = useNavigate();

    
        const handleLogIn = async () => {
            try {
              const response = await fetch(`/api/users/login`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: pass
                })
              });
              const result = await response.json();
              console.log(result);
              window.localStorage.setItem('token', result.data.token)
              props.setIsLoggedIn(true)
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

export default Login