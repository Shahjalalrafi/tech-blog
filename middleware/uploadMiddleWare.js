const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|png|jpg|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mimetypes = types.test(file.mimetype)

        if(extName && mimetypes) {
            cb(null, true)
        }else {
            cb(new Error('Only support Images'))
        }
    }
})

module.exports = upload