import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setUserName] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: passInput
          }
        })
      });
      const result = await response.json();
console.log("RESULT",result);
      if (result.error) {

        setErrorMessage(result.message)
      } else {

        window.localStorage.setItem('token', result.token)
        props.setIsLoggedIn(true)
        navigate('/home')
      }

    } catch (err) {
      console.error(err);
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('token');
    props.setIsLoggedIn(false);
    navigate('/home');
  }
  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassInput(event.target.value);
  }

  return (
    <div className='auth-container'>

      {props.isLoggedIn ? <button type='submit' onClick={handleLogOut}>Log Out</button> :
        <>
          <h2>Login</h2>
          <form className='login-form'>
            <label htmlFor='username'>Username</label>
            <input value={username} type="text" placeholder='Username' id='username' name='username' onChange={handleUsernameChange}></input>
            <label htmlFor='password'>Password</label>
            <input value={passInput} type="password" placeholder="*******" id='password' name='password' onChange={handlePasswordChange}></input>
            <button type='submit' onClick={handleLogin}>Log in</button>
          </form>
          {
            errorMessage
          }
        </>
      }
    </div>
  )
}

export default Login