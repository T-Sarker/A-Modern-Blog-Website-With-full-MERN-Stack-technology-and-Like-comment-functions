const express = require('express')
const { getAllUser, userRegister, userLogin } = require('../Controllers/UserController')

//creating router object
const router = express.Router()

router.get('/alluser',getAllUser) //http://localhost:3000/api/v1/user/alluser


router.post('/register',userRegister)


router.post('/login',userLogin)

module.exports = router