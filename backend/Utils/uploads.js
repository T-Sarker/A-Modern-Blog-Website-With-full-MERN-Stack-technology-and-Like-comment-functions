const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var filename = Date.now()+'-'+file.originalname.split('.')[0]+'.'+file.originalname.split('.')[1]
      console.log(filename);
      cb(null,filename)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload