import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='flex place-content-around'>
            <div className=''>Header</div>

            <div className=''>
                <Link to={'/'}>Home</Link>
                <Link to={'/courses'}>Courses</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/account'}>Account</Link>
            </div>
        </header>
    )
}

export default Header;