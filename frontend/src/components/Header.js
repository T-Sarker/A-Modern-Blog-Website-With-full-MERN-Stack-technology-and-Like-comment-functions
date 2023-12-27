import React, { useState } from 'react'
import { FaBars, FaRegWindowClose, FaUserLock, FaUserPlus, FaUserTimes, FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = () => {
    console.log("loaded")

    const { user } = useSelector((state) => (state.auth))
    const [isMenuStatus, setMenuStatus] = useState(false)
    console.log(user + ' is user');

    const changeMenueState = () => {
        setMenuStatus(!isMenuStatus)
    }
    return (
        <>
            <div className="top-0 bg-white shadow-lg w-full py-3 px-3 sticky z-10">
                {/* creating the main menu */}

                <div className="mainmenu md:flex hidden items-center justify-between">
                    <p className='lg:text-3xl font-extrabold text-blue-500'>MY BLOG</p>
                    <div className="pagesLink flex justify-between items-center mx-3 gap-4">
                        <NavLink to='/' className="">Home</NavLink>
                        <NavLink to='/contact' className="">Contact</NavLink>
                        <NavLink to='/my-blogs' className="">My Blogs</NavLink>
                        <div className="search flex relative items-center">
                            <input className='max-w-[300px] border rounded-xl' type='text' name="search" ></input>
                            <i className='absolute left-[88%] text-slate-300'><FaSearch /></i>
                        </div>

                    </div>
                    <div className=" flex justify-between items-center mx-3 gap-3 text-md">
                        {user == null ? <><NavLink to="/login" className="flex items-center justify-center"><i className="font-1xl mr-2 text-gray-500"><FaUserLock /></i> Login</NavLink> / <NavLink to="/register" className="flex items-center justify-center "><i className="font-1xl mr-2 text-gray-500"><FaUserPlus /></i>Register</NavLink></> : <NavLink to="/logout" className="flex items-center justify-center"><i className="font-1xl mr-2 text-gray-500"><FaUserTimes /></i>Logout</NavLink>
                        }

                    </div>
                </div>

                <div className="mobilemenue md:hidden">
                    <div className="flex items-center justify-between  px-3">
                        <p className='text-2xl font-extrabold text-blue-500'>MY BLOG</p>
                        <p className='text-2xl font-extrabold cursor-pointer' onClick={changeMenueState}>
                            {
                                !isMenuStatus ? <FaBars /> : <FaRegWindowClose />

                            }
                        </p>
                    </div>
                    <ul className={`w-full pagesLink text-lg bg-gray-300 m-0 mt-3 absolute  transition-all ease-in-out ${isMenuStatus ? 'left-[0px] opacity-1' : 'left-[-900px] opacity-0'}`}>
                        <li className="px-4 py-3 hover:bg-blue-400"><NavLink to="/">Home</NavLink></li>
                        <li className="px-4 py-3 hover:bg-blue-400"><NavLink to="/contact">Contact</NavLink></li>
                        <li className="px-4 py-3 hover:bg-blue-400"><NavLink to="/my-blogs">My Blogs</NavLink></li>
                        <div className="px-4 py-3 search flex relative items-center">
                            <input className='w-full border ' type='text' name="search" ></input>
                            <i className='absolute inline-block border right-[20px]'><FaSearch /></i>
                        </div>
                        <li className="px-4 py-3 hover:bg-blue-400"><NavLink className="flex items-center " to="/login"><i className='font-1xl mr-2'><FaUserLock /></i>Login</NavLink></li>
                        <li className="px-4 py-3 hover:bg-blue-400"><NavLink className="flex items-center " to="/register"><i className='font-1xl mr-2'><FaUserPlus /></i>Register</NavLink></li>
                        <li className="px-4 py-3 hover:bg-blue-400"><NavLink className="flex items-center " to="/logout"><i className='font-1xl mr-2'><FaUserTimes /></i>Logout</NavLink></li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default Header
