const blogModel = require('../Models/BlogModel')
const slug = require('../Utils/slug')
const rmvImg = require('../Utils/removeImage')
const userModel = require('../Models/UserModel')

exports.getAllBlog = async (req,res)=>{

    try {
        const allBlogs = await blogModel.find({}).populate('author')
        return res.status(200).json({
            allBlogs
        })
    } catch (error) {
        return res.status(400).json({
            message:"No Blogs found"
        })
    }
    
}


exports.createBlog = async (req,res)=>{

    const {title,details,tags} = req.body
    let sluged = slug.MakeSlug(title)
    const image = req.file.filename
    let author = '656e2e6c1285c57b7c7bee87'

    try {
        if (!title||!tags||!details||!author) {
            rmvImg.RemoveImage(image)
            return res.status(401).send({
                success:false,
                message:"All fields are required",
            })
        } else {

            //check if the blog already exists
            const chckBlog = await blogModel.findOne({'slug':sluged})
            if (chckBlog) {
                rmvImg.RemoveImage(image)
                return res.status(401).send({
                    success:false,
                    message:"Blog already exists",
                })
            } else {
                const blog = await blogModel.create({title,slug:sluged,details,image,tags,author})
                const userUpdate = await userModel.findByIdAndUpdate(author,{$push:{blogs:blog._id}})
                
                if (blog && userUpdate) {
                    return res.status(201).send({
                        success:true,
                        message:`${blog.title} successfully created`
                    })
                }
            }   
        }
    } catch (error) {
        rmvImg.RemoveImage(image)
        return res.status(500).send({
            success:false,
            message:"Blog couldn't be created"+error,
        })
    }

}

exports.editBlog = async (req,res)=>{
    try {
        const {title,details,tags} = req.body
        let sluged = slug.MakeSlug(title)

        const blog = await blogModel.findById(req.body.id)

        console.log(blog);

        if(!blog || blog==null){
            return res.status(400).send({
                success:false,
                message:'no blog found'
            })
        }
       
        if (req.file!==undefined) {
            
            
            rmvImg.RemoveImage(blog.image)

            const updateBlog = await blogModel.findByIdAndUpdate(req.body.id,{$set:{title,details,slug:sluged,tags,image:req.file.filename}}, { new: true })

            console.log(updateBlog);

        }else{
            
            const updateBlog = await blogModel.findByIdAndUpdate(req.body.id,{$set:{title,details,slug:sluged,tags}}, { new: true })

        }

        return res.status(201).send({
            success:true,
            message:'successfully updated'
        })

    } catch (error) {
        
        return res.status(500).send({
            success:false,
            message:'Failed to update'+error
        })
    }
}

exports.deleteBlog = async (req,res)=>{
    try {
        console.log(req.params);
        const blog = await blogModel.findById(req.params.id)

        if(!blog || blog==null){
            return res.status(400).send({
                success:false,
                message:'no blog found'
            })
        }

        const result= await userModel.findByIdAndUpdate(req.params.uid,{$pull:{"blogs":req.params.id}})

        console.log(result)

        await blogModel.findByIdAndDelete(req.params.id)

        rmvImg.RemoveImage(blog.image)

        return res.status(201).send({
            success:true,
            message:'successfully Delete'
        })

    } catch (error) {

        return res.status(500).send({
            success:false,
            message:'Failed to Delete'+error
        })
    }
}

exports.myBlogs = async (req,res)=>{
    try {
        const blogs = await blogModel.find({author:req.params.id}).populate('author')
        
        return res.status(201).json({
            blogs
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Failed to Delete'+error
        })
    }
}

exports.singleBlog = async (req,res)=>{
    try {
        const blog = await blogModel.findOne({slug:req.params.slug}).populate(['author','comments.user'])
        return res.status(201).json({
            message:'successfully Done',
            blog
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Failed to Delete'+error
        })
    }
}

exports.singleBlogComment = async (req,res)=>{
    try {
        let author = req.body.author
        const blog = await blogModel.findById(req.body.id)
        
        if (!blog) {
            return res.status(403).json({
                success:false,
                message:'No blog found'
            })
        } else {
            const updatedBlog = await blogModel.findByIdAndUpdate(req.body.id,{$push:{"comments":{user:author,comment:req.body.comment}}})
            return res.status(201).json({
                success:true,
                message:'Comment successfully Done',
                updatedBlog
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Failed to Delete'+error
        })
    }
}

exports.singleBlogCommentDelete = async (req,res)=>{
    let liker = '656e2e6c1285c57b7c7bee87'
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogid,{$pull:{"comments":{_id:req.params.id}}})
            return res.status(201).json({
                success:true,
                message:'Comment successfully Done',
                updatedBlog
            })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Failed to Delete'+error
        })
    }
}

exports.singleBlogLikeAndDislike = async (req,res)=>{

    let liker = req.params.liker;
    try {
        const blog = await blogModel.findOne({_id:req.params.blogId,likes:{$elemMatch:{$eq:liker}}})
        console.log(blog);

        if (!blog) {
            const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogId,{$push:{likes:liker}})

            return res.status(201).json({
                success:true,
                message:'Blog Liked',
                likes:updatedBlog.likes
            })
        } else {
            const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogId,{$pull:{likes:liker}})

            return res.status(201).json({
                success:true,
                message:'Blog Not Liked',
                likes:updatedBlog.likes
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Something went wrong"+error
        })
    }
}
