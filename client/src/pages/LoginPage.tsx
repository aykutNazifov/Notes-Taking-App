import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import noteImage from "../assets/notes1.avif"
import { useState } from "react"
import apiClient from "../utils/apiClient"
import { toast } from "react-toastify"
import { useAuth } from "../hooks/useAuth"
import AutorenewIcon from '@mui/icons-material/Autorenew';

const schema = yup
    .object({
        email: yup.string().required("Email is required.").email(),
        password: yup.string().required("Password is required."),
    })
    .required()

const LoginPage = () => {
    const { setUser } = useAuth()
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            const res = await apiClient.post("/auth/login", { ...data })
            if (res.data.success) {
                toast.success('You logged in successfully!');
                setUser(res.data.user)
            }
        } catch (error: any) {
            setLoading(false)
            if (error.response.data.message) {
                setErrorMessage(error.response.data.message)
            }
        }
    }


    return (
        <div className="h-[calc(100vh-3.6rem)] py-5">
            <div className='container mx-auto flex justify-center items-center h-full px-2 lg:px-20'>
                <div className='w-full flex border border-solid border-gray-300 rounded-lg overflow-hidden'>
                    <div className='flex-1 p-4 lg:p-10 flex flex-col items-center'>
                        <h1 className='text-3xl font-medium text-center mb-4'>Login</h1>
                        <p className='text-center mb-4'>Welcome back! Please login to your account to manage your notes.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className='lg:w-2/3 flex flex-col gap-4'>
                            <TextField error={errors.email?.message ? true : false} helperText={errors.email?.message} className='w-full mb-4' id="email" label="Email" variant="outlined" {...register("email")} />
                            <TextField error={errors.password?.message ? true : false} helperText={errors.password?.message} className='w-full' id="password" type="password" label="Password" variant="outlined" {...register("password")} />
                            <p className="text-red-400 text-right">{errorMessage}</p>
                            <button className='flex mx-auto py-2 px-6 border border-solid border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white font-medium transition-all duration-300 disabled:cursor-not-allowed' disabled={loading}>{loading ? <AutorenewIcon className="animate-spin" /> : "Login"}</button>
                            <Link className='mt-6 flex justify-end text-sm hover:underline duration-300 transition-all' to={"/register"}>Don't have an account? Register</Link>
                        </form>
                    </div>
                    <div className='hidden md:block flex-1'>
                        <img src={noteImage} className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage