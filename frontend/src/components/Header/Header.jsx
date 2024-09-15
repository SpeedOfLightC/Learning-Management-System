import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='flex justify-between items-center p-5 bg-white shadow-md relative'>
            <div className='text-xl font-semibold text-purple-600 md:text-lg'>Header</div>

            <div className='flex gap-8 md:gap-2'>
                <Link to={'/'} className='no-underline duration-300 hover:text-orange-400'>Home</Link>
                <Link to={'/courses'} className='no-underline duration-300 hover:text-orange-400'>Courses</Link>
                <Link to={'/about'} className='no-underline duration-300 hover:text-orange-400'>About</Link>
                <Link to={'/account'} className='no-underline duration-300 hover:text-orange-400'>Account</Link>
            </div>
        </header>
    )
}

export default Header;