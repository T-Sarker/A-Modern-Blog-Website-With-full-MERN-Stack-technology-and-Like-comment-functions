const express = require('express')
const { createBlog, editBlog, deleteBlog, singleBlog, singleBlogComment, singleBlogCommentDelete, singleBlogLikeAndDislike, getAllBlog, myBlogs } = require('../Controllers/BlogController')
const uploads = require('../Utils/uploads')

const router = express.Router()

router.get('/allblog',getAllBlog)
router.get('/myallblog/:id',myBlogs)
router.post('/add',uploads.single('image'),createBlog)
router.post('/update',uploads.single('image'),editBlog)
router.post('/single/comment',singleBlogComment)
router.get('/single/comment/delete/:blogid/:id',singleBlogCommentDelete)
router.get('/delete/:uid/:id',deleteBlog)
router.get('/show/:slug',singleBlog)
router.get('/single/likedislike/:blogId/:liker',singleBlogLikeAndDislike)

module.exports = router