import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      });
      console.log('RES', response);
      const result = await response.json();
      console.log("RESULT..........", result);
      window.localStorage.setItem('token', result.token)
      navigate('/login')
      return result
    } catch (err) {
      console.error(err);
    }

  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="register-form">
        <label htmlFor='name'>Full Name</label>
        <input value={name} name='name' placeholder="Full Name" id="name" onChange={handleNameChange}></input>
        <label htmlFor='username'>Username</label>
        <input value={username} type="username" placeholder="username" id='username' name='username' onChange={handleUsernameChange}></input>
        <label htmlFor='password'>Password</label>
        <input value={password} type="password" placeholder="*******" id='password' name='password' onChange={handlePasswordChange}></input>
        <button type='submit' onClick={handleRegister}>Register</button>
      </form>
      <button className="link-btn" onClick={handleRegister}>Oops! Already have an Account? Login Now!!</button>
    </div>
  )
}

export default Register;