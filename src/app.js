import React, { useState } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import  Home from "./components/Home";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { User } from "./components/User";

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'))
  return (
    <>
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
      <Route path="/home" elemment={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
      <Route path="/login" elemment={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="/register" elemment={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="/user" elemment={<User isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
    </Routes>
    </>

  );
}

export default App;