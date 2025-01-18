import multer from 'multer';
import path from 'path';
import V2 from "cloudinary"
import "dotenv/config"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});




export { upload };
