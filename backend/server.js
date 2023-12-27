const express = require('express')
var bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const db = require('./DB/dbconfig')


//calling the app
const app = express()

//use of middleware
app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))
app.use(`/public`, express.static(`public`));

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

db()

// importing the routes
const userRoutes = require('./Routes/User')
const blogRoute = require('./Routes/Blog')

//basic routing
app.get('/',(req,res)=>{
    console.log('inside');
   res.send('hello world') 
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/blog',blogRoute)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('Connection failed');
    } else {
        console.log(process.env.PORT);
        console.log('Connection Stablished');

    }
})
