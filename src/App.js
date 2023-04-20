import React, {useState } from 'react';
// import { Router, routes } from 'react-router-dom'
import { Header, Login, Home, Register } from './compenents';
import './App.css';

const App = () => {
    const {currentForm , setCurrentForm } = useState('login')

    const toggleForm = (formName) => {
        setCurrentForm(formName) 
    }
    return(
        <>
        <div>
            <Header />
            {
                currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
            }
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/home' element={<Home />}></Route>
            </Routes>
        </div>
        </>
    )
}
export default App