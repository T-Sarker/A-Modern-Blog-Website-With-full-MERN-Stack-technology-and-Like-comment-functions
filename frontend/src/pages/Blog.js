import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
const Blog = () => {
    const [allBlogs, setallBlogs] = useState([])

    const getBlogs = async () => {
        try {
            const blogs = await axios.get('/api/v1/blog/allblog')
            setallBlogs(blogs.data.allBlogs)
            console.log(blogs.data.allBlogs);
        } catch (error) {
            toast.error('Something Went Wrong')
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])

    return (
        <>
            <div className="blogArea container mx-auto max-w-[80%] mb-8">
                <p className='text-center font-extrabold text-xl my-8 uppercase'>Blogs</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        allBlogs.length > 0 ? allBlogs.map((blogs) => {
                            const date = new Date(blogs.createdAt);

                            return (<><div className="singleBlog p-2 border rounded-md hover:shadow-md">
                                <div className="">
                                    <img className='' src={'public/uploads/' + blogs.image} alt="" />

                                    <p className='font-bold text-2xl hover:text-blue-500 md:h-[70px]'><NavLink to={`/blog/single/${blogs.slug}`}>{blogs.title}</NavLink></p>

                                    <div className="my-2">
                                        <p className='my-2'>{blogs.details.substring(0, 100) + '...'}</p>
                                        <div className="flex uppercase my-3 text-xs font-semibold justify-between items-center">
                                            <p className='flex items-center'><FaUserEdit className='mx-1' /> Author:<span>{blogs.author.username}</span></p>
                                            <p>{date.toDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div></>)
                        }) : <h3>No Blogs yet</h3>

                    }

                </div>
            </div>
        </>
    )
}

export default Blog
