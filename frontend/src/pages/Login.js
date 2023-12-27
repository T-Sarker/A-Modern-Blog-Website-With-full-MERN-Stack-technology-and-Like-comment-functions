import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaGit, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, error, success, user } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setFormData((prev) => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData))
    }

    useEffect(() => {

        if (error) {
            toast.error(error)
            navigate('/login')
            dispatch(reset())
            setFormData({ email: '', password: '' })
        }
        if (success) {
            toast.success("Login Successfull")
            navigate('/')
        }
    }, [error, success, user])


    return (
        <>
            <section className="h-screen">
                <div className="h-full">

                    <div
                        className="g-6 flex h-full flex-wrap items-center justify-center">
                        <div
                            className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <img src="https://static.vecteezy.com/system/resources/previews/001/991/652/original/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg" className="w-3/4"
                                alt="Sample" />
                        </div>


                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/11 xl:w-5/12">
                            <div className="flex items-left ">
                                <p className="mb-0 mr-4 text-lg">Sign in with</p>
                                <FaFacebookF className='text-blue-600 text-3xl mx-2 bg-white-400 border shadow-sm p-1 rounded-2xl' />
                                <FaGit className='text-black text-3xl mx-2 bg-white-400 border shadow-sm p-1 rounded-2xl' />
                                <FaGoogle className='text-yellow-600 text-3xl mx-2 bg-white-400 border shadow-sm p-1 rounded-2xl' />

                            </div>
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                    className="mx-4 mb-0 text-center font-semibold dark:text-white">
                                    Or
                                </p>
                            </div>
                            <form className='w-80%' onSubmit={handleFormSubmit}>
                                <div className="relative mb-6" data-te-input-wrapper-init>
                                    <label htmlFor="email" className="pointer-events-none  left-3 top-0 mb-0 max-w-[60%] ">
                                        Email
                                    </label>
                                    <input type="text" className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-1 leading-[2.15] outline-none" placeholder="Email" name="email" value={formData.email} id="email" onChange={handleChange} />
                                </div>
                                <div className="relative mb-6" data-te-input-wrapper-init>
                                    <label htmlFor="password" className="pointer-events-none left-3 top-0 mb-0 max-w-[60%]">
                                        Password
                                    </label>
                                    <input type="password" className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200  px-3 py-1 leading-[2.15] outline-none " id="password" value={formData.password} name="password" placeholder="Password" onChange={handleChange} />
                                </div>

                                <div className="mb-6 block items-center justify-between">

                                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className="relative border shadow-lg float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] "
                                            type="checkbox"
                                            value=""
                                            id="exampleCheck2" />
                                        <label
                                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="exampleCheck2">
                                            Remember me
                                        </label>
                                    </div>

                                    <NavLink className="text-sm text-blue-400" to="#!">Forgot password?</NavLink>
                                </div>

                                <div className="text-center lg:text-left">
                                    <button
                                        type="submit"
                                        className="inline-block border shadow-lg rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        Login
                                    </button>


                                </div>
                            </form>
                            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                Don't have an account?
                                <NavLink
                                    to="/register"
                                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                >Register</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
