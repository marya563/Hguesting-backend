import express from "express";
const router = express.Router();
//import multer from '../middleware/multer.mjs';
import multer, {diskStorage} from "multer";
import fs from 'fs';
import path from 'path';
import User from '../models/user.js';

import { signin,deleteUser,signup,getUsers, updateUser, addUserr, getByIdUserrrr , uploadImage,getImage, forgotPassword, verifyResetCode , resetPassword   } from "../controllers/user.js";


router.post("/signin", signin);
router.post("/signup", signup);
//router.put("/updateUserss/:id", updateUser);
router.post("/addUserr",multer, addUserr);
router.get("/getUsers", getUsers);
router.delete("/deleteUser/:id", deleteUser);
//router.put("/updateUserrById/:id",multer, updateUserrById);
router.put("/updateUser/:id", updateUser);
//router.put("/updateUserrById/:id",multer, updateUserrById);
//router.post('/activateac©count',activateAccount)
//router.post('/updateProfile',updateProfile)
router.post("/forgotPassword", forgotPassword);
router.get('/getByIdUserrrr/:id',getByIdUserrrr) ;
router.post("/verifyResetCode", verifyResetCode ) ;
router.post("/resetPassword", resetPassword) ;





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
  
      const uploadDir = "./uploads/";
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    /*   let filetype = "";
      let fileExtension = "";
      if (file.mimetype === "image/gif") {
        filetype = "image-";
        fileExtension = "gif";
      }
      if (file.mimetype === "image/png") {
        filetype = "image-";
        fileExtension = "png";
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "image-";
        fileExtension = "jpeg";
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf-";
        fileExtension = "pdf";
      }
    
      cb(null, filetype + Date.now() + "." + fileExtension);
      h = cb;
    */
    
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb({ message: "Unsupported File Format" }, false);
      }
    };
    
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 },
      fileFilter: fileFilter,
    });

    
router.put("/upload/:userId", upload.single("file"), uploadImage);
router.get("/image/:imageName", getImage);

 

export default router;