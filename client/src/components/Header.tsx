import React from 'react'
import Logo from './Logo'
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    return (
        <div className='border-b border-b-solid border-b-gray-200 shadow-sm mb-5'>
            <div className='container mx-auto h-14 flex items-center justify-between'>
                <Logo />
                <button className='hover:underline transition-all duration-300'><LogoutIcon fontSize="small" /> Log out</button>
            </div>
        </div>
    )
}

export default Header