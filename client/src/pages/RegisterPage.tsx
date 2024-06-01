import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"
import { TextField } from '@mui/material'
import apiClient from "../utils/apiClient"
import { useState } from "react"

//image
import noteImage from "../assets/notes2.avif"

//icons
import AutorenewIcon from '@mui/icons-material/Autorenew';

const schema = yup.object({
    name: yup
        .string()
        .required("Name is required.")
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required."),
    password: yup
        .string()
        .required("Password is required.")
        .min(6, "Must be 6 characters or more")
        .max(15, "Must be 15 characters or less"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterPage = () => {
    const navigate = useNavigate();
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
            const res = await apiClient.post("/auth/register", { ...data })
            if (res.data.success) {
                toast.success('User registered successfully! Redirecting to login...', { autoClose: 2000 });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error: any) {
            setLoading(false)
            if (error.response.data.message) {
                setErrorMessage(error.response.data.message)
            }
        }
    }

    return (
        <div className="h-[calc(100vh-3.6rem)]">
            <div className='container mx-auto flex justify-center items-center px-2 lg:px-20 h-full'>
                <div className='w-full flex border border-solid border-gray-300 rounded-lg overflow-hidden'>
                    <div className='flex-1 p-4 lg:p-10 flex flex-col items-center'>
                        <h1 className='text-3xl font-medium text-center mb-4'>Register</h1>
                        <p className='text-center mb-4'>Create an account to start managing your notes.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className='lg:w-2/3 flex flex-col gap-4'>
                            <TextField error={errors.name?.message ? true : false} helperText={errors.name?.message} className='w-full mb-4' id="name" label="Name" variant="outlined" {...register("name")} />
                            <TextField error={errors.email?.message ? true : false} helperText={errors.email?.message} className='w-full mb-4' id="email" label="Email" variant="outlined" {...register("email")} />
                            <TextField error={errors.password?.message ? true : false} helperText={errors.password?.message} className='w-full' id="password" label="Password" type="password" variant="outlined" {...register("password")} />
                            <TextField error={errors.confirmPassword?.message ? true : false} helperText={errors.confirmPassword?.message} className='w-full' id="confirmPassword" label="Confirm Password" type="password" variant="outlined" {...register("confirmPassword")} />
                            <p className="text-red-400 text-right">{errorMessage}</p>
                            <button className='flex mx-auto py-2 px-6 border border-solid border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white font-medium transition-all duration-300 disabled:cursor-not-allowed' disabled={loading}>{loading ? <AutorenewIcon className="animate-spin" /> : "Register"}</button>
                            <Link className='mt-6 flex justify-end text-sm hover:underline duration-300 transition-all' to={"/login"}>Already have account? Login</Link>
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

export default RegisterPage