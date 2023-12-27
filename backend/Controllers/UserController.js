const userModel = require('../Models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = process.env.salt||10;
//get all user method
exports.getAllUser = async (req,res)=>{
    try {
        const alluser = await userModel.find({}).select('-password')

        if (!alluser) {
            return res.status(500).jaon({message:"No User Yet"})
        } else {
            
            return res.status(200).json({alluser,message:"SUccessfull"})
        }
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong"})
    }
}


//user register method
exports.userRegister = async (req,res)=>{
    
    try {
        let {username,email,password} = req.body
       
        password = bcrypt.hashSync(password,10)
        if (!username|| !email || !password ) {
            return res.status(400).send({
                success:false,
                message:"All fields are required"
            })
        } else {
            const checkExists = await userModel.findOne({username,email})

            if (checkExists) {
                return res.status(400).json({
                    message:"User already exists"
                })
            }
            
            const user = await userModel.create({username,email,password})
            
            const token = jwt.sign({email:user.email,username:user.username},'shhhhh')
            
            return res.status(201).json({user,token})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"registration failed! callback issue"+error})
    }
}


//user login method
exports.userLogin = async (req,res)=>{

    const {email,password} = req.body

    try {
        if (!email || !password) {

            return res.status(400).json({message:"All fields are required"})

        } else {

            const user = await userModel.findOne({email})

            if (!user) {
                return res.status(400).json({message:"User credentials Invalid!"})
            } else {
                const match = await bcrypt.compare(password, user.password);
                
                if(!match){

                    return res.status(400).json({message:"Invalid credentials"})
                }
                const token = jwt.sign({email:user.email,username:user.username},'shhhhh')
                return res.status(201).send({user,token})
                
            }
            
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Invalid credentials P"})
    }
}