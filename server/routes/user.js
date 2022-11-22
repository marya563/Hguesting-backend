import express from "express";
const router = express.Router();
import User from '../models/user.js';

import { signin,deleteUser,signup, upload,uploadImage,updateProfile,getUsers, updateUserById, updateUser, addUserr, getByIdUserrrr } from "../controllers/user.js";


router.post("/signin", signin);
router.post("/signup", signup);
router.put("/updateUserss/:id", updateUser);
router.post("/addUserr", addUserr);
router.get("/getUsers", getUsers);
router.delete("/deleteUser/:id", deleteUser);
router.post("/updateUser/:id", updateUserById);

router.post('/uploadProfileImg',uploadImage,upload)
//router.post('/activateaccount',activateAccount)
router.post('/updateProfile',updateProfile)

router.get('/getByIdUserrrr/:id',getByIdUserrrr)






 

export default router;