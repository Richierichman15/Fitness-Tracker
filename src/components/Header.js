import React from 'react';
import { Link } from "react-router-dom"

 const Header = () => {//ctrl - z
    return(
        <nav className='navbar'>
            <a href='/' className='site-link'>Fitness Tracker</a>
            <Link to="/home" className='header'>Home</Link>
            <Link to="/login" className='header'>Login</Link>
            <Link to="/Register" className='header'>Register</Link>
            <Link to="/user" className='header'>User</Link>
            <Link to="/activities" classname='activities'>Activities</Link>
            <Link to="/routines" classname='routines'>Routines</Link>
        </nav>
    )
}


export default Header;