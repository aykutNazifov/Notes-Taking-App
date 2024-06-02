import Logo from './Logo'
import { useAuth } from '../hooks/useAuth';
import apiClient from '../utils/apiClient';

//icons
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    const { user, setUser } = useAuth()

    const handleLogout = async () => {
        await apiClient("/auth/logout")
        setUser(null)
    }

    return (
        <div className='border-b border-b-solid border-b-gray-200 shadow-sm'>
            <div className='container px-2 md:px-10 lg:px-16 mx-auto h-14 flex items-center gap-2 justify-between'>
                <Logo />
                {user && (
                    <div className='flex items-center gap-4'>
                        <div className='text-base lg:text-xl'>{user?.name}</div>
                        <button onClick={handleLogout} className='hover:underline transition-all duration-300'><LogoutIcon fontSize="small" /> Log out</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header