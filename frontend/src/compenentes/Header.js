import React from 'react';
import { Link } from "react-router-dom"

export const Header = () => {
    return(
        <nav className='navbar'>
            <a href='/' className='site-link'>Fitness Tracker</a>
            <Link to="/home" className='header'>Home</Link>
            <Link to="/login" className='header'>Login</Link>
            <Link to="/Register" className='header'>Register</Link>
            <Link to="/user" className='header'>User</Link>

        </nav>
    )
}


export default Header;