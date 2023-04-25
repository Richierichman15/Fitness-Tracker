import React, { useState } from "react"

 export const Register = (props) => {
    const { email, setEmail } = useState('');
    const { password, SetPassword } = useState('');
    const { name, setName } = useState('');
    const { username, setUsername } = useState('');

    // const sumbitted = () => {
    //     e.preventDefault()
    // }

    return(
        <div className="auth-container">
            <h2>Register</h2>
         <form className="register-form">
            <label htmlFor='name'>Full Name</label>
            <input value={name} name='name' placeholder="Full Name" id="name"></input>
            <label htmlFor='email'>Email</label>
            <input value={email} type="email" placeholder="example@gmail.com" id='email' name='email'></input>
            <label htmlFor='username'>Username</label>
            <input value={username} type="username" placeholder="username" id='username' name='username'></input>
            <label htmlFor='password'>Password</label>
            <input value={password} type="password" placeholder="*******" id='password' name='password'></input>
            <button type='submit'>Log in</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('Register')}>Oops! Already have an Account? Login Now!!</button>
        </div>
    )
}

