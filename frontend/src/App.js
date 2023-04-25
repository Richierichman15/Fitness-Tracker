import React from 'react'
import './App.css';
import {Routes, Route, useState} from 'react-router-dom'
import  Home, {Header, Login, Register, User} from "./compenentes/"


const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'))
  return (
    <>
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
      <Route path="/" elemment={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
      <Route path="/login" elemment={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="/register" elemment={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="/user" elemment={<User isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
    </Routes>
    </>

  );
}

export default App;
