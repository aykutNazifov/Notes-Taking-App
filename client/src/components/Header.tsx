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
            <div className='container px-2 mx-auto h-14 flex items-center justify-between'>
                <Logo />
                {user && (
                    <button onClick={handleLogout} className='hover:underline transition-all duration-300'><LogoutIcon fontSize="small" /> Log out</button>
                )}
            </div>
        </div>
    )
}

export default Header