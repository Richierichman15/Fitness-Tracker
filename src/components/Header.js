import React from 'react';
import { Link } from "react-router-dom"

 const Header = () => {
    return(
        <nav className='navbar'>
            <a href='/' className='site-link'> Fitness Tracker </a>
            <Link to="/home" className='header'> Home </Link>
            <Link to="/login" className='header'> Login/Log Out </Link>
            <Link to="/Register" className='header'> Register </Link>
            <Link to="/activities" classname='activities'> Activities </Link>
            <Link to="/routines" classname='routines'> Routines </Link>
            <Link to="/myroutines" classname='myroutines'> My Routines </Link>
            
        </nav>
    )
}


export default Header;