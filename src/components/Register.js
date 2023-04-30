import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

  const Register = (props) => {
    const { password, SetPassword } = useState('');
    const { name, setName } = useState('');
    const { username, setUsername } = useState('');
    const navigate = useNavigate();
    
    const handleRegister = async() => {
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
              const result = await response.json();
              console.log(result);
              window.localStorage.setItem('token', result.data.token)
              navigate('/home')
              return result
            } catch (err) {
              console.error(err);
            }
          
    }
    console.log('HC', handleRegister());

    return(
        <div className="auth-container">
            <h2>Register</h2>
         <form className="register-form">
            <label htmlFor='name'>Full Name</label>
            <input value={name} name='name' placeholder="Full Name" id="name"></input>
            <label htmlFor='username'>Username</label>
            <input value={username} type="username" placeholder="username" id='username' name='username'></input>
            <label htmlFor='password'>Password</label>
            <input value={password} type="password" placeholder="*******" id='password' name='password'></input>
            <button type='submit'on onClick={handleRegister}>Log in</button>
        </form>
        <button className="link-btn">Oops! Already have an Account? Login Now!!</button>
        </div>
    )
}

export default Register;