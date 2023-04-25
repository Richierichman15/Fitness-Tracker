import React, { useState } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import  Home from "./compenentes/Home";
import { Header } from "./compenentes/Header";
import { Login } from "./compenentes/Login";
import { Register } from "./compenentes/Register";
import { User } from "./compenentes/User";

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
