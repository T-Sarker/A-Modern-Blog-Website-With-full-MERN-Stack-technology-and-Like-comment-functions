import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserEdit, FaComment, FaTrashAlt, FaHotjar, FaFacebookF, FaGit, FaGoogle, FaAmazon } from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
const Single = () => {


    const [blogData, setblogData] = useState()
    const [likes, setLikes] = useState(false)
    const [commentDone, setCommentDone] = useState(false)
    const [commentData, setCommentData] = useState()
    const params = useParams()
    const user = JSON.parse(localStorage.getItem('userData'))
    console.log(commentData)




    const getBlogData = async () => {

        try {

            const blog = await axios.get(`/api/v1/blog/show/${params.slug}`)

            setblogData(blog.data.blog)

        } catch (error) {

            toast.error('No data Found')
        }
    }

    const handleLikes = async () => {
        try {
            const likeDislike = await axios.get(`/api/v1/blog/single/likedislike/${blogData._id}/${user.user._id}`)
            toast.success(likeDislike.data.message)

            setLikes(!likes)
        } catch (error) {
            toast.error('Something went wrong' + error)
        }

    }



    //commenting on the post
    const handlBlogComment = async () => {
        try {
            const commenting = await axios.post('/api/v1/blog/single/comment', { comment: commentData, id: blogData._id, author: user.user._id })
            toast.success(commenting.data.message)
            setCommentDone(!commentDone)
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    //handling the comment delete option 
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.get('/api/v1/blog//single/comment/delete/' + blogData._id + '/' + commentId)
            toast.success('Comment Deleted')
            setCommentDone(!commentDone)
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {

        getBlogData()

    }, [likes, commentDone])

    console.log(blogData)

    return (
        <>
            <div className="container w-3/4 mx-auto items-center ">

                {

                    blogData !== undefined ? (<div className="singleBlog p-2 border rounded-md hover:shadow-md">
                        <p className='font-bold text-2xl md:text-4xl md:my-4 hover:text-blue-500'>{`${blogData.title}`}</p>
                        <p>
                            {
                                blogData.tags.split(',').map((tag) => {
                                    return <span className='text-blue-400 mx-4'>{"#" + tag}</span>
                                })
                            }
                        </p>
                    <div className="">

                            <img className='w-full' src={"/public/uploads/" + blogData.image} alt="" />
                        <div className="flex uppercase my-3 text-xs font-semibold justify-between items-center">
                            <div className="flex items-center">



                                    <p className='flex items-center cursor-pointer' onClick={handleLikes}>
                                        {
                                            user.user !== undefined && blogData.likes.includes(user.user._id) ? (<FaHotjar className='mx-1 text-2xl text-red-500' />) : (<FaHotjar className='mx-1 text-2xl text-ash-500' />)
                                        }

                                    </p>
                                    <span>({`${blogData.likes.length}`})</span>
                            </div>
                                <p className='hidden my-3 md:my-0 md:flex items-center'><FaUserEdit className='mx-1' /> Author:<span className='mx-2'>{`${blogData.author.username}`}</span></p>
                                <p className='hidden md:block'>
                                    {`${new Date(blogData.createdAt).toDateString()}`}
                                </p>
                            <div className="flex items-center">
                                share:
                                <FaFacebookF className='text-blue-600 text-1xl mx-2 bg-white-400 border shadow-sm' />
                                <FaGit className='text-black text-1xl mx-2 bg-white-400 border shadow-sm ' />
                                <FaGoogle className='text-yellow-600 text-1xl mx-2 bg-white-400 border shadow-sm ' />
                            </div>
                        </div>
                        <div className="my-2">
                                <p className='my-2'>{`${blogData.details}`}</p>
                        </div>

                        <div className="comments my-4">
                            <p className='flex items-center text-center justify-center md:text-3xl'><FaComment className='mx-3' />Comments</p>

                            <form>

                                    <input className='block my-4 border rounded-none w-2/3 p-3' type='text' name="comment" onChange={(e) => { setCommentData(e.target.value) }}></input>
                                    <button type='button' className='px-3 py-2 my-3 bg-gray-300 shadow-sm text-black' onClick={handlBlogComment}>COMMENT</button>
                            </form>

                                {blogData.comments.length > 0 ? blogData.comments.map((comment) => {
                                    return (<div className="commentList flex items-center px-4 w-full">
                                        {comment.user._id === user.user._id ? <span><FaTrashAlt onClick={() => { handleDeleteComment(comment._id) }} className='mx-3 text-lg text-red-400' /></span> : ''}
                                        <div className="comment w-1/2 my-3">
                                            <div className="heading flex items-center">
                                                <img className='w-[30px] h-[30px] mr-2' src="https://cdn.iconscout.com/icon/free/png-256/free-bot-151-902126.png?f=webp" alt="" />
                                                <p className='font-semibold'>{comment.user.username}</p>
                                            </div>
                                            <div className="body w-full bg-gray-100">
                                                <p className='text-sm p-3'>{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>)
                                }) : "No Comments"}
                            </div>
                        </div>
                    </div>) : ""

                }


            </div>
        </>
    )
}

export default Single
