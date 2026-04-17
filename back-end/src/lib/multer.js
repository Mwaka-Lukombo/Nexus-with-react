import multer from "multer";
import path from "path";



export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/files"); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  }
});