const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },

    tags:{
        type:String
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:[],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment:{
                type:String,
            }
        }
    ]

},{
    timestamps:true
})

const blogModel = mongoose.model('Blog',BlogSchema)

module.exports = blogModel