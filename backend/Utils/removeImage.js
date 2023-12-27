const fs = require('fs')

exports.RemoveImage = (imgName)=>{
    console.log("----------------"+imgName);
    fs.unlink(process.env.imgPath+imgName,err=>{console.log(err);})
    
}