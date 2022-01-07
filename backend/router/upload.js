import express from "express";
import multer from "multer";
import path from "path";

const routerUpload = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  const checkFileType = (file, cb)=>{
      const fileType = /jpg|jpeg|png/
      const checkType = fileType.test(path.extname(file.originalname).toLowerCase())
      const checkMimeType = fileType.test(file.mimetype)

      if (checkType && checkMimeType) {
          return cb(null, true)
      } else {
          cb('image only!')
      }

  }
  
  const upload = multer({ storage,  limits: {fileSize: 200000},fileFilter: (req, file, cb)=>{
        checkFileType(file, cb)
  }
})


routerUpload.route('/').post(upload.single('image'), (req, res)=>{
    const filePath = req.file.path
    
    res.send(`/${filePath}`)
})


  export default routerUpload