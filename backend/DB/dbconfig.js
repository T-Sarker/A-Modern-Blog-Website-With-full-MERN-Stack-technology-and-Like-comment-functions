const mongoose = require('mongoose');


//creating db object
const db = async ()=>{
    
    try {
        await mongoose.connect(process.env.DBURL);
        console.log('database connected')
    } catch (error) {
        console.log(error)    }
}

module.exports = db
