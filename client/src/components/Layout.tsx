import { Outlet } from 'react-router-dom'
import Header from "./Header"

const Layout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <header>
                <Header />
            </header>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout