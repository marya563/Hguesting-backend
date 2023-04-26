import express from 'express';
const router = express.Router();
import Hotel from '../models/hotel.js';

import multer3 from '../middleware/multer3.js';

import { getHotel, getHotelById,getNewHotel, updateHotel, addHotel, deleteHotel, getimage } from "../controllers/hotel.js";


//router.get("/uploads/:image_name", getimage);
router.get("/getHotel", getHotel);
router.get("/getNewHotel", getNewHotel);
router.get("/getHotelById/:id", getHotelById);
router.put("/updateHotel/:id", multer3, updateHotel);
router.post("/addHotel", multer3, addHotel);
router.delete("/deleteHotel/:id", deleteHotel);


export default router;