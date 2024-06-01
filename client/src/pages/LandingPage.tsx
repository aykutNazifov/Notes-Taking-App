import { Link } from "react-router-dom"

//image
import noteImage from "../assets/notes3.avif"

const LandingPage = () => {
    return (
        <div>
            <div className='container mx-auto px-2'>
                <div className="flex flex-col items-center justify-center min-h-screen py-5">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Notes App</h1>
                    <p className="text-lg text-gray-600 mb-2">Store and organize your notes seamlessly with our app.</p>
                    <p className="text-lg text-gray-600 mb-8">With our app, you don't need paper notes anymore, and you won't make a mess in your room.</p>

                    <div className="flex space-x-4">
                        <Link to={"/login"} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">Login</Link>
                        <Link to={"/register"} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300">Register</Link>
                    </div>
                    <img src={noteImage} alt="Notes Image" className="mt-8 w-full h-[300px] md:h-[400px] lg:h-[600px] object-cover rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage